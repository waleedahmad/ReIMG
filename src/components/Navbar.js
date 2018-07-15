import React from "react";
import {Link} from "react-router-dom";

class Navbar extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            reddit : props.reddit,
            showSearch : props.showSearch
        }
    }

    componentWillReceiveProps(nextProps){
        this.setState({
            reddit : nextProps.reddit,
            showSearch : nextProps.showSearch
        });
    }

    render(){
        return (
            <nav className="navbar navbar-default navbar-fixed-top">

                <div className="container">
                    <div className="navbar-header">
                        <button type="button" className="navbar-toggle collapsed" data-toggle="collapse"
                                data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                            <span className="sr-only">Toggle navigation</span>
                            <span className="icon-bar"/>
                            <span className="icon-bar"/>
                            <span className="icon-bar"/>
                        </button>
                        <Link
                            to={'/'}
                            onClick={e => {
                                this.props.clearSearch();
                            }}
                            className="navbar-brand"
                        >
                            <i className="fa fa-reddit"/> ReIMG
                        </Link>

                    </div>


                    <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                        {this.state.showSearch ? (
                                <form className="navbar-form navbar-left" onSubmit={this.props.search.bind(this)}>
                                    <div className="input-group">
                                        <span className="input-group-addon">reddit.com/r/</span>
                                        <input type="text"
                                               className="form-control"
                                               name="reddit"
                                               value={this.state.reddit}
                                               onChange={this.props.handleChange.bind(this)}
                                        />
                                        <span className="input-group-addon">
                                            <a href="#"
                                               className="btn-link"
                                               onClick={this.props.clearSearch}
                                            >
                                                <i className="fa fa-remove"/>

                                            </a>
                                        </span>
                                    </div>
                                    <div className="input-group">

                                    </div>
                                </form>

                        ) : ''}


                        <ul className="nav navbar-nav navbar-right">
                            <li><a target="_blank" href="https://github.com/waleedahmad/reimg">
                                <i className="fa fa-github"/> Github
                            </a>
                            </li>

                            <li>
                                <Link to={'/settings'}><span className="fa fa-cogs"> </span> Settings </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        );
    }
}

export default Navbar;