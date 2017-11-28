// externals
import React, { Component } from "react";
import { connect } from 'react-redux';
import styled from 'styled-components';
// components
import CropAndRotate from "./CropAndRotate";

class CropAndRotateModal extends Component {
    render() {
        const {screenWidth, screenHeight, ...rest} = this.props;
        const { initialCropData, loadedImg, onCancel, onDone, orientation, imgUrl} = rest;

        return (
            <StyledContainer>

                <CropAndRotate width={screenWidth}
                               height={screenHeight}
                               initialCropData={initialCropData}
                               imgUrl={imgUrl}
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

export default connect(mapStateToProps)(CropAndRotateModal);

const StyledContainer = styled.div`
    position: fixed;
    overflow-x: hidden;
    overflow-y: hidden;
    top:0;
    left:0;
    right: 0;
    bottom: 0;
    z-index: 2000;
    display: flex;
    flex-direction: column;
`;