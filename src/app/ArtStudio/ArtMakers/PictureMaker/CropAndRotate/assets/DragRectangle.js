// externals
import React, { Component } from "react";
import Draggable from 'react-draggable';

class DragRectangle extends Component {


    onDrag(e, data) {

        const leftX = data.x;
        const rightX = leftX + this.props.width;
        const topY = data.y;
        const bottomY = topY + this.props.height;

        this.props.onHandleUpdate(leftX, rightX, topY, bottomY);
    }

    render() {

        const rectStyle = {
            cursor: 'move'
        };

        return (
            <Draggable
                handle=".handle"
                bounds={this.props.bounds}
                position={this.props.position}
                onDrag={this.onDrag.bind(this)}>

                <rect style={rectStyle} fill={'#00ffff'} fillOpacity={0} width={this.props.width} height={this.props.height} className="handle" />

            </Draggable>
        )
    }
}

export default DragRectangle;

/*
 <Draggable
                handle=".handle"
                bounds={this.props.bounds}
                position={this.props.position}
                onDrag={this.onDrag.bind(this)}>
                <div className="handle">
                    <rect fill={'#00ffff'} width={100} height={100} />
                </div>
            </Draggable>
*/