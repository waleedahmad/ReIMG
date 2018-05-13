import React from "react";

class NotFound extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            reddit : props.reddit
        }
    }

    render(){
        return (
            <div className="not-found">
                <div className="logo">
                    <img src="/src/img/error-404.png" alt=""/>
                </div>

                <div className="title">
                    <h2>
                        Subreddit {this.state.reddit} Not Found
                    </h2>
                </div>
            </div>
        );
    }
}

export default NotFound;