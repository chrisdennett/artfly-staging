import React, { Component } from "react";

class CuratorDetails extends Component {

    constructor(props){
        super(props);

        this.state = {inEditingMode:false}
    }

    onEditButtClick(){
        this.setState({inEditingMode:!this.state.inEditingMode})
    }

    render() {
        let content;

        if(this.state.inEditingMode){
            content = (
                <div>
                    <span>Curator: </span><span>{this.props.name}</span>
                    <button onClick={this.onEditButtClick.bind(this)}>DONE</button>
                </div>
            );
        }
        else{
            content = (
                <div>
                    <span>Curator: </span><span>{this.props.name}</span>
                    <button onClick={this.onEditButtClick.bind(this)}>Edit</button>
                </div>
            );
        }

        return content;
    }
}

export default CuratorDetails;