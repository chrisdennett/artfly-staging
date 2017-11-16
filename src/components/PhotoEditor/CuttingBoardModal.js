// externals
import React, { Component } from "react";
import { connect } from 'react-redux';
import styled from 'styled-components';
// components
import CuttingBoard from "./CuttingBoard";
import Butt from "../global/Butt";

class CuttingBoardModal extends Component {

    constructor(props) {
        super(props);

        this.onCropUpdate = this.onCropUpdate.bind(this);
        this.onCanvasSetup = this.onCanvasSetup.bind(this);
        this.onRotateClockwiseClick = this.onRotateClockwiseClick.bind(this);
        this.onDoneClick = this.onDoneClick.bind(this);
        this.onCancelClick = this.onCancelClick.bind(this);

        this.state = {
            canvas: null,
            rotation: 1,
            cropData: {
                leftPercent: 0,
                rightPercent: 1,
                topPercent: 0,
                bottomPercent: 1
            }
        };
    }

    componentWillMount() {
        let { orientation, initialCropData } = this.props;
        if (!orientation) orientation = 1;
        if (!initialCropData) initialCropData = {
            leftPercent: 0,
            rightPercent: 1,
            topPercent: 0,
            bottomPercent: 1
        };

        this.setState({ rotation: orientation, cropData: initialCropData });
    }

    onCropUpdate(cropData) {
        this.setState({ cropData });
    }

    onCanvasSetup(canvas) {
        this.setState({ canvas });
    }

    // Cancel current changes
    onCancelClick() {
        this.props.onCancel();
    }

    onDoneClick() {
        const { canvas, rotation, cropData } = this.state;
        const { leftPercent, rightPercent, topPercent, bottomPercent } = cropData;
        const canvasW = canvas.width;
        const canvasH = canvas.height;

        this.props.onDone({
            canvas: canvas,
            rotation,
            leftX: canvasW * leftPercent, rightX: canvasW * rightPercent, topY: canvasH * topPercent, bottomY: canvasH * bottomPercent,
            leftPercent, rightPercent, topPercent, bottomPercent
        });
    }

    // Rotate using info from:
    // https://stackoverflow.com/questions/7584794/accessing-jpeg-exif-rotation-data-in-javascript-on-the-client-side/32490603#32490603
    onRotateClockwiseClick() {
        const currentRotation = this.state.rotation ? this.state.rotation : 1;
        const nextRotations = { 1: 6, 6: 3, 3: 8, 8: 1 }; // order of rotations by 90° clockwise increments
        const newRotation = nextRotations[currentRotation] || 6;

        let { leftPercent, rightPercent, topPercent, bottomPercent } = this.state.cropData;

        const newL = 1 - bottomPercent;
        const newR = 1 - topPercent;
        const newT = leftPercent;
        const newB = rightPercent;

        this.setState({ rotation: newRotation, cropData: { leftPercent: newL, rightPercent: newR, topPercent: newT, bottomPercent: newB } });
    }

    render() {
        const { loadedImg } = this.props;
        const { rotation, cropData } = this.state;
        const cuttingBoardPadding = 25;
        const buttonHeight = 60;
        const maxCuttingBoardWidth = this.props.screenWidth - (cuttingBoardPadding * 2);
        const maxCuttingBoardHeight = this.props.screenHeight - (buttonHeight + (cuttingBoardPadding * 2));

        return (
            <StyledContainer>

                <StyledContents>

                    <div style={{ margin: '0 auto' }}>

                        <CuttingBoard
                            img={loadedImg}
                            onCropUpdate={this.onCropUpdate}
                            onCanvasSetup={this.onCanvasSetup}
                            maxWidth={maxCuttingBoardWidth}
                            maxHeight={maxCuttingBoardHeight}
                            rotation={rotation}
                            cropData={cropData}/>
                    </div>


                </StyledContents>

                <StyledControls>
                    <Butt inline onClick={this.onRotateClockwiseClick}>ROTATE</Butt>
                    <Butt inline onClick={this.onDoneClick}>DONE</Butt>
                    <Butt inline onClick={this.onCancelClick}>CANCEL</Butt>
                </StyledControls>
            </StyledContainer>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        screenWidth: state.ui.windowSize.windowWidth,
        screenHeight: state.ui.windowSize.windowHeight
    }
};

export default connect(mapStateToProps)(CuttingBoardModal);

const StyledContainer = styled.div`
    background-color: red;
    position: fixed;
    overflow-x: hidden;
    top:0;
    left:0;
    right: 0;
    bottom: 0;
    z-index: 2000;
    display: flex;
    flex-direction: column;
`;

const StyledContents = styled.div`
    position: relative;
    background-color: green;
    padding: 25px;
    display: flex;
    flex: 1;
    align-items: center;
`;

const StyledControls = styled.div`
    background-color: rgba(0,0,0,0.4);
    display: flex;
    justify-content: center;
`;
