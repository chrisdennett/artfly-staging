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
        const { loadedImg, screenWidth, screenHeight } = this.props;
        const { rotation, cropData } = this.state;
        const cuttingBoardPadding = 40;
        const buttonHeight = 70;
        const maxCuttingBoardWidth = screenWidth - (cuttingBoardPadding * 2);
        const maxCuttingBoardHeight = screenHeight - (buttonHeight + (cuttingBoardPadding * 2));
        const cuttingMatPadding = 10;
        const cuttingMatWidth = screenWidth - (cuttingMatPadding*2);
        const cuttingMatX = cuttingMatPadding;
        const cuttingMatHeight = screenHeight - ((cuttingMatPadding*2) + buttonHeight);
        const cuttingMatY = cuttingMatPadding;

        const table = {fill: "url(#floorPattern)"};
        const tableColour = {fill: "#c49e71"};
        const tablePatternStyle = {fill: "#ad8b65"};

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

                <svg style={{position:'absolute', left:0, top:0, zIndex: -1}} width={'100%'} height={'100%'}>

                    <defs>
                        <pattern id="minorGrid" width="10" height="10" patternUnits="userSpaceOnUse">
                            <path d="M 10 0 L 0 0 0 10" fill="none" stroke="#a2c656" strokeWidth="1"/>
                        </pattern>
                        <pattern id="grid" width="100" height="100" patternUnits="userSpaceOnUse">
                            <rect width="100" height="100" fill="url(#minorGrid)"/>
                            <path d="M 100 0 L 0 0 0 100" fill="none" stroke="#a2c656" strokeWidth="2"/>
                        </pattern>

                        <pattern id="floorPattern"
                                 width={180} height={20}
                                 patternUnits="userSpaceOnUse">
                            <rect style={tableColour} width="180" height="20"/>
                            <path style={tablePatternStyle}
                                  d="M504,154h78a30,30,0,0,0,13-1h26c7,2,16,1,24,1h53c-5,1-11,2-16,1H595c-4,1-10,2-14,1H504Z"
                                  transform="translate(-501 -135)"/>
                            <path style={tablePatternStyle} d="M509,152H645c6,0,12-1,18,0h0c-6-1-13,0-19,0H509Z"
                                  transform="translate(-501 -135)"/>
                            <path style={tablePatternStyle} d="M504,148h81c-6-1-13-1-19,1H504Z"
                                  transform="translate(-501 -135)"/>
                            <path style={tablePatternStyle} d="M527,146h35a9,9,0,0,0,6-1H681c-5-2-12-1-18,0H527Z"
                                  transform="translate(-501 -135)"/>
                            <path style={tablePatternStyle} d="M532,142H645c-10,0-20-2-29-1H532Z"
                                  transform="translate(-501 -135)"/>
                            <path style={tablePatternStyle}
                                  d="M513,141h27c5,1,10,0,15-1h16c6,0,12,1,18,0h28c9-2,20-1,28,1h1a75,75,0,0,0-25-1H560c-4-2-8,0-12,1H513Z"
                                  transform="translate(-501 -135)"/>
                            <path style={tablePatternStyle}
                                  d="M511,138H673a134,134,0,0,0,29,0h-2a108,108,0,0,1-26,0H511Z"
                                  transform="translate(-501 -135)"/>
                            <path style={tablePatternStyle} d="M525,137H704c-11-1-22-1-33,0H597c-9-1-18-1-27,0H525Z"
                                  transform="translate(-501 -135)"/>
                        </pattern>
                    </defs>

                    <rect style={table} width={'100%'} height={'100%'}/>

                    <rect fill={'#044c33'} x={cuttingMatX} y={cuttingMatY + 2} width={cuttingMatWidth} height={cuttingMatHeight} rx={15} ry={15} />
                    <rect fill={'#04906a'} x={cuttingMatX} y={cuttingMatY} width={cuttingMatWidth} height={cuttingMatHeight} rx={15} ry={15} />

                    <rect fill="url(#grid)" x={cuttingMatX+10} y={cuttingMatY+10} height={cuttingMatHeight-20} width={cuttingMatWidth-20} />

                </svg>


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
    padding: 40px;
    display: flex;
    flex: 1;
    align-items: center;
`;

const StyledControls = styled.div`
    display: flex;
    justify-content: center;
`;
