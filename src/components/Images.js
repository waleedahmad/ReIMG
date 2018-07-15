import React, {Fragment} from "react";
import { ScaleLoader } from 'react-spinners';


class Images extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            images : this.props.images,
            loading : this.props.loading,
            nextPage : this.props.nextPage,
        };
    }

    static getDerivedStateFromProps(nextProps, prevState){
        return  {
            images : nextProps.images,
            loading: nextProps.loading,
            nextPage : nextProps.nextPage
        }
    }

    componentWillUnmount(){
        this.props.clearSearch();
    }

    render(){
        return (
            <div>
                <div>
                    {this.state.images.map(function(post, index){
                        return (
                            <div key={index} className="post">
                                <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6 image">
                                    <h3>{post.title}</h3>
                                    <img className="image-uri" src={post.url}/>
                                </div>

                                {JSON.parse(localStorage.getItem("storage")) ? (
                                    <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6 title">
                                        <div className="input-group">
                                            <span className="input-group-btn">
                                                <button
                                                    className="btn btn-default"
                                                    onClick={this.props.saveImage.bind(this, index, 'NSFW')}
                                                >
                                                    <span className="fa fa-save"/> NSFW
                                                </button>
                                            </span>

                                            <input
                                                className="form-control post-name"
                                                value={post.title}
                                                placeholder="Name.."
                                                onChange={this.props.changeCaption.bind(this, post.id)}
                                            />

                                            <span className="input-group-btn">
                                                <button
                                                    className="btn btn-default"
                                                    onClick={this.props.saveImage.bind(this, index, 'SAFE')}
                                                >
                                                    <span className="fa fa-save"/> SAFE
                                                </button>
                                            </span>
                                        </div>

                                    </div>
                                ) : ''}
                            </div>
                        )
                    }.bind(this))}
                </div>

                <div className="loader">
                    <ScaleLoader
                        color={'#777'}
                        loading={this.state.loading}
                    />
                </div>

                {!this.state.loading &&
                    <Fragment>
                        {this.state.nextPage ? (
                            <a href="#" className="btn btn-default load-more" onClick={this.props.loadMore.bind(this)} >
                                Load More <span aria-hidden="true">&rarr;</span>
                            </a>
                        ) : ''}
                    </Fragment>
                }
            </div>
        );
    }
}

export default Images;