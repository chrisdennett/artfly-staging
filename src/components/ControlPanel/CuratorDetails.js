import React, { Component } from "react";

class CuratorDetails extends Component {

    render() {
        return (
            <div>
                <span>Curator: </span><span>{this.props.name}</span>
                <button>edit</button>
            </div>
        );
    }
}

export default CuratorDetails;