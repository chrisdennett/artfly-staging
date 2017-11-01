// externals
import React, { Component } from "react";
import styled from 'styled-components';
// components
import DragHandle from "./assets/DragHandle";
import SelectPhotoButton from "./assets/SelectPhotoButton";

class ImageCuttingBoard extends Component {
    constructor(props){
        super(props)

        this.onHandleUpdate = this.onHandleUpdate.bind(this);
    }

    componentDidMount() {
        this.updateCanvas();
    }

    onHandleUpdate(handleName, x, y){
        // console.log("handleName > x,y: ", handleName, x, y);
    }

    updateCanvas() {
        const canvasHeight = 600;
        const canvasWidth = 800;
        const ctx = this.refs.canvas.getContext('2d');
        ctx.clearRect(0, 0, canvasWidth, canvasHeight);

        const verticalCropLine1 = 200;
        const verticalCropLine2 = 600;
        const horizontalCropLine1 = 100;
        const horizontalCropLine2 = 500;

        line({ ctx, startX: verticalCropLine1, startY: 0, endX: verticalCropLine1, endY: canvasHeight });
        line({ ctx, startX: verticalCropLine2, startY: 0, endX: verticalCropLine2, endY: canvasHeight });
        line({ ctx, startX: 0, startY: horizontalCropLine1, endX: canvasWidth, endY: horizontalCropLine1 });
        line({ ctx, startX: 0, startY: horizontalCropLine2, endX: canvasWidth, endY: horizontalCropLine2 });
    }

    render() {
        return (
            <CuttingBoardContainer>
                <SelectPhotoButton/>
                <CuttingBoard>
                    <DragHandle onHandleUpdate={this.onHandleUpdate}/>
                    <canvas ref="canvas" width={800} height={600}/>
                </CuttingBoard>
            </CuttingBoardContainer>
        );
    }
}

export default ImageCuttingBoard;

// HELPER functions
function line({ ctx, startX, startY, endX, endY }) {
    ctx.moveTo(startX, startY);
    ctx.lineTo(endX, endY);
    ctx.lineWidth = 1;
    ctx.strokeStyle = '#ee00ee';
    ctx.stroke();
}


const CuttingBoardContainer = styled.div`
    background: rgba(0,0,0,0.2);
    padding: 20px;
`;

const CuttingBoard = styled.div`
    background-color: #931f84;
    width: 800px;
    height: 600px;
    margin: 0 auto;
    position: relative; 
    
    canvas{
        outline: #fff 1px solid;
    }
`;
