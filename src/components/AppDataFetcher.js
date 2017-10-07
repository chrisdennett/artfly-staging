import React, { Component } from "react";

class AppDataFetcher extends Component {

    render() {
        return (
            <div>
                {this.props.children}
            </div>
        );
    }
}

export default AppDataFetcher;