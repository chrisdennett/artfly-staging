// externals
import React, { Component } from "react";
import Draggable from 'react-draggable';
// components
import SvgHandle from "./SvgHandle";

class DragHandle extends Component {

    constructor(props) {
        super(props);

        this.state = { isSelected: false }
    }


    select(e) {
        this.setState({ isSelected: true });
    }

    deselect(e) {
        this.setState({ isSelected: false });
    }


    onDrag(e) {
        // console.log("e: ", e);
    }

    render() {
        const { x = 0, y = 0 } = this.props;
        const { isSelected } = this.state;

        console.log("isSelected: ", isSelected);

        const fill = isSelected ? '#ffff00' : '#ff00ff';

        return (
            <Draggable
                axis={'x'}
                handle=".handle"
                defaultPosition={{ x, y }}
                onStart={this.select.bind(this)}
                onDrag={this.onDrag.bind(this)}
                onStop={this.deselect.bind(this)}>
                <div className="handle">
                    <SvgHandle fill={fill}/>
                </div>
            </Draggable>

        )


    }
}

export default DragHandle;