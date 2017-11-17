// externals
import React, { Component } from "react";
import { connect } from 'react-redux';
import styled from 'styled-components';
// components
import CropAndRotate from "./CropAndRotate";

class CuttingBoardModal extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {screenWidth, screenHeight, ...rest} = this.props;
        const { initialCropData, loadedImg, onCancel, onDone, orientation} = rest;

        return (
            <StyledContainer>

                <CropAndRotate width={screenWidth}
                               height={screenHeight}
                               initialCropData={initialCropData}
                               loadedImg={loadedImg}
                               onCancel={onCancel}
                               onDone={onDone}
                               orientation={orientation} />

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
