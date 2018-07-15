import React from "react";
import Navbar from './Navbar';
import Images from "./Images";
import axios from "axios/index";
import SearchBar from "./SearchBar";
import NotFound from "./NotFound";
import Logo from './Logo';
import {Redirect, Route} from 'react-router';
import Settings from "./Settings";
import toastr from 'toastr';

class Root extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            reddit : '',
            search : false,
            images : [],
            req_params : '',
            not_found : false,
            loading : false,
            nextPage : false,
        };
    }

    search(e){
        e.preventDefault();
        if(this.state.reddit.length){
            document.title = this.state.reddit + ' - ReIMG';
            this.setState({
                images : [],
                req_params : '',
                search : true,
                nextPage : false,
                loading: true,
            }, () => {
                this.getImages();
            });
        }else{
            alert('Provide Reddit Name');
        }
    }

    clearSearch(e = null){
        if(e){
            console.log('Prevent');
            e.preventDefault();
        }
        this.setState({
            reddit : '',
            search : false,
            images : [],
            req_params : '',
            not_found : false,
            loading : false,
            nextPage : false,
        });
        document.title = 'ReIMG';
    }

    getPathName(href) {
        let l = document.createElement("a");
        l.href = href;
        return l.pathname;
    };

    isImage(url) {
        return (url.match(/\.(jpeg|jpg|gif|png)$/) !== null);
    }

    stripAlbumID(url) {
        let path = this.getPathName(url),
            ids = path.split('/').filter(part => part !== "");
        return ids[ids.length - 1];
    }

    stripAlbumType(url) {
        if(url.indexOf('/a/') !== -1){
            return 'album';
        }else if(url.indexOf('/gallery/') !== -1){
            return 'gallery';
        }else{
            return 'image';
        }
    }

    loadMore(e){
        e.preventDefault();
        if(!this.state.loading){
            this.setState({
                loading : true
            },() => {
                this.getImages();
            });
        }else{
            alert('Loading');
        }
    }

    changeCaption(id, event){
        this.state.images.map(function(image, index){
            if(image.id === id){
                const index = this.state.images.indexOf(image);
                const _images = this.state.images;
                _images[index].title = event.target.value;
                this.setState({
                    images : _images
                });
            }
        }.bind(this));
    }

    saveImage(id, type, e){
        console.log(id, type);
        let image = this.state.images[id];

        $.ajax({
            type : 'POST',
            url : '/server/save.php',
            data : {
                type : type,
                name : image.title,
                url : image.url,
                storage_uri : localStorage.getItem('storage_uri')
            },
            success : function(res){
                if(JSON.parse(res) === true){
                    toastr.success('Image saved');
                }else{
                    toastr.error('Unable to save image');
                }
            }.bind(this)
        })
    }


    getImages(){
        let images = [],
            albums = [];

        axios.get('https://www.reddit.com/r/'+ this.state.reddit + '.json'+ this.state.req_params)
            .then(function (response) {
                let after = response.data.data.after;
                this.setState({
                    req_params : after.length ? '?after=' + after : '',
                    loading : true,
                    nextPage : !!after.length

                });
                response.data.data.children.map(function(item, i){
                    if (item.kind === 't3') {
                        if (this.isImage(item.data.url)) {
                            images = images.concat({
                                url : item.data.url,
                                id : item.data.id,
                                title : item.data.title
                            });
                        } else {
                            if (item.data.domain === 'imgur.com') {
                                let type = item.data.url.split('.').pop();
                                if(type === 'gifv'){
                                    // TODO
                                }else{
                                    let albumID = this.stripAlbumID(item.data.url),
                                        type = this.stripAlbumType(item.data.url),
                                        APIUrl = "https://api.imgur.com/3/"+type+"/" + albumID + "/images";
                                    albums = albums.concat({
                                        title : item.data.title,
                                        url : APIUrl,
                                        id : albumID
                                    });
                                }

                            }
                        }
                    }
                }.bind(this));


                const url_promises = albums.map(album => {
                    return axios.get(album.url , { headers: {"Authorization" : 'Client-ID fc6952f445a03f3'} })
                });

                axios.all(url_promises).then(function(results) {
                    results.map(r => {
                        let _album = albums.filter(function( album ) {
                            return album.url === r.config.url;
                        })[0];

                        if(r.data.data.length){
                            r.data.data.map(function(res){
                                images = images.concat({
                                    title : _album.title,
                                    url : res.link,
                                    id : _album.id
                                })
                            })
                        }else{
                            images = images.concat({
                                url : r.data.data.link,
                                id : _album.id,
                                title : _album.title
                            });
                        }
                    });

                    this.setState({
                        images : this.state.images.concat(images)
                    }, () => {
                        this.setState({
                            loading : false
                        })
                    })
                }.bind(this));

            }.bind(this))
            .catch(function (error) {
                this.setState({
                    not_found : true,
                    loading : false
                })
            }.bind(this));
    }

    handleChange(event) {
        this.setState({
            reddit: event.target.value,
            not_found : false,
        });
    }

    render(){
        return (
            <div>
                <Navbar
                    reddit={this.state.reddit}
                    search={this.search.bind(this)}
                    handleChange={this.handleChange.bind(this)}
                    showSearch={this.state.search}
                    clearSearch={this.clearSearch.bind(this)}
                />

                <div className="container">
                    <div id="app">
                        <Route exact path="/" render={() => (
                            <div>
                                {!this.state.search ? (
                                    <div className="container">
                                        <div className="search">
                                            <Logo/>

                                            <SearchBar
                                                search={this.search.bind(this)}
                                                handleChange={this.handleChange.bind(this)}
                                            />
                                        </div>
                                    </div>
                                ) : ''}

                                {!this.state.not_found ? (
                                        <Images
                                            images={this.state.images}
                                            loading={this.state.loading}
                                            nextPage={this.state.nextPage}
                                            loadMore={this.loadMore.bind(this)}
                                            changeCaption={this.changeCaption.bind(this)}
                                            saveImage={this.saveImage.bind(this)}
                                            clearSearch={this.clearSearch.bind(this)}
                                        />
                                    ) :
                                    <Redirect to={'/404/'+this.state.reddit}/>
                                }
                            </div>
                        )}/>

                        <Route exact path="/settings" render={() => (
                            <Settings/>
                        )}/>

                        <Route exact path="/404/:reddit" render={(props) => (
                            <NotFound {...props}/>
                        )}/>

                    </div>
                </div>
            </div>
        );
    }
}

export default Root;