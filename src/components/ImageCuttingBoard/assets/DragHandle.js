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
        this.props.onHandleUpdate(this.props.id, data.x, data.y);
    }

    render() {
        const bounds = {left:0, right:this.props.maxX, top:0, bottom:this.props.maxY};
        const { isSelected } = this.state;

        const fill = isSelected ? '#ffff00' : this.props.colour;

        return (
            <Draggable
                axis={this.props.axis}
                handle=".handle"
                bounds={bounds}
                position={this.props.position}
                onStart={this.select.bind(this)}
                onDrag={this.onDrag.bind(this)}
                onStop={this.deselect.bind(this)}>
                <div className="handle" style={{position:'absolute', left:-25, top:-25}}>
                    <SvgHandle className="handle" fill={fill} />
                </div>
            </Draggable>

        )
    }
}

export default DragHandle;

/*
 <Draggable
                axis={this.props.axis}
                handle=".handle"
                bounds={bounds}
                defaultPosition={{x: this.props.startX, y: this.props.startY}}
                position={null}
                onStart={this.select.bind(this)}
                onDrag={this.onDrag.bind(this)}
                onStop={this.deselect.bind(this)}>
                <div className="handle" style={{position:'absolute', left:-25, top:-25}}>
                    <SvgHandle className="handle" fill={fill} />
                </div>
            </Draggable>
*/