import React from "react";

class SearchBar extends React.Component{

    constructor(props){
        super(props);
    }

    render(){
        return (
            <div className="input col-xs-12 col-sm-12 col-md-10 col-lg-7">
                <form onSubmit={this.props.search.bind(this)}>
                    <div className="input-group input-group-lg">
                        <span className="input-group-addon" id="sizing-addon1">reddit.com/r/</span>
                        <input
                            className="form-control"
                            placeholder="Search your favorite Subreddit"
                            aria-describedby="sizing-addon1"
                            onChange={this.props.handleChange.bind(this)}
                        />
                    </div>
                </form>
            </div>
        );
    }
}

export default SearchBar;