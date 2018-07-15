import React from "react";
import axios from 'axios';
import toastr from 'toastr';

class Settings extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            storage_uri : '',
            storage : false,
            storage_err : false,
            errors : []
        }
    }

    componentDidMount(){
        document.title = 'Settings - ReIMG';
        if (!this.storageAvailable('localStorage')) {
            this.setState({
                storage_err : true,
            })
        }else{
            this.setState({
                storage_uri : localStorage.getItem("storage_uri") ? localStorage.getItem("storage_uri") : '',
                storage : localStorage.getItem("storage") ? JSON.parse(localStorage.getItem("storage")) : false
            }, () => {
                console.log(this.state);
            });
        }
    }

    storageAvailable(type) {
        try {
            let storage = window[type],
                x = '__storage_test__';
            storage.setItem(x, x);
            storage.removeItem(x);
            return true;
        }
        catch(e) {
            return e instanceof DOMException && (
                e.code === 22 ||
                e.code === 1014 ||
                e.name === 'QuotaExceededError' ||
                e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
                storage.length !== 0;
        }
    }

    saveSettings(e){
        e.preventDefault();
        axios.get('/server/settings.php', {
            params: {
                storage_dir : this.state.storage_uri
            }
        })
        .then(function (res) {
            if(res.data.errors.length){
                this.setState({
                    errors : res.data.errors
                });
                toastr.success('Storage setting updated');
            }else{
                this.setState({
                    errors : []
                });
                localStorage.setItem('storage', this.state.storage ? "true" : "false");
                localStorage.setItem('storage_uri', this.state.storage_uri);
                toastr.success('Storage setting updated');
            }
        }.bind(this))
        .catch(function (error) {
            console.log(error);
        });

    }

    handleChange(event) {
        this.setState({
            storage_uri: event.target.value,
        });
    }

    toggleStorage(event){
        this.setState({
            storage : event.target.checked
        })
    }

    render(){
        return (
            <div className="settings col-xs-12 col-sm-12 col-md-8 col-lg-6">
                {!this.state.storage_err ? (
                    <div>
                        <h3 className="text-center">
                            Application Settings
                        </h3>
                        <form onSubmit={this.saveSettings.bind(this)}>

                            <div className="form-group">
                                <label htmlFor="storage_dir">Storage Directory</label>
                                <input type="text"
                                       className="form-control"
                                       name="storage_dir"
                                       placeholder="C:/xampp/htdocs/reimg/storage"
                                       value={this.state.storage_uri}
                                       onChange={this.handleChange.bind(this)}
                                />
                            </div>

                            <div className="checkbox">
                                <label>
                                    <input
                                        type="checkbox"
                                        name="storage"
                                        checked={this.state.storage}
                                        onChange={this.toggleStorage.bind(this)}
                                    /> Enable Storage
                                </label>
                            </div>

                            {this.state.errors.length ? (
                                <div className="alert alert-danger">
                                    <ul>
                                        {this.state.errors.map(function(err, i){
                                            return <li key={i}>{err}</li>
                                        })}
                                    </ul>
                                </div>
                            ) : ''}
                            <button className="btn btn-default">
                                Update
                            </button>
                        </form>

                    </div>
                ) : (
                    <div>
                        <h3 className="text-center">
                            Application Settings
                        </h3>

                        <div className="alert alert-danger text-center">
                            Local Storage not supported
                        </div>
                    </div>

                )}
            </div>
        );
    }
}

export default Settings;