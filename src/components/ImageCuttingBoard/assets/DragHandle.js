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

    onDrag(e, data) {
        this.props.onHandleUpdate('left', data.x, data.y);
    }

    render() {
        const bounds = {left:0, right:800};
        const { isSelected } = this.state;

        const fill = isSelected ? '#ffff00' : '#ff00ff';

        return (
            <Draggable
                axis={'x'}
                handle=".handle"
                bounds={bounds}
                onStart={this.select.bind(this)}
                onDrag={this.onDrag.bind(this)}
                onStop={this.deselect.bind(this)}>
                <div className="handle" style={{width:'50px', position:'absolute', top:275, left:-25}}>
                    <SvgHandle className="handle" fill={fill}/>
                </div>
            </Draggable>

        )


    }
}

export default DragHandle;