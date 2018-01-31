import React, { Component } from "react";
import sizeMe from 'react-sizeme';
// styles
import './quickArtworkMaker_styles.css';
// comps
import QuickPhotoSelector from "./quickPhotoSelector/QuickPhotoSelector";
import QuickArtworkRoom from "./quickArtworkRoom/QuickArtworkRoom";
import * as ImageHelper from "../ArtStudio/ImageHelper";
import QuickArtwork from "./quickArtwork/QuickArtwork";

class QuickArtworkMaker extends Component {

    constructor(props) {
        super(props);

        this.onPhotoSelect = this.onPhotoSelect.bind(this);

        this.state = { artworkData: null };
    }

    onPhotoSelect(imgFile) {
        ImageHelper.GetImage(imgFile, (sourceImg, imgOrientation, widthToHeightRatio, heightToWidthRatio) => {
            this.setState({ artworkData: { sourceImg, imgOrientation, widthToHeightRatio, heightToWidthRatio } });
        });
    }

    render() {
        const { artworkData } = this.state;
        const { height, width } = this.props.size;
        const floorPercentage = 0.15;
        const floorHeight = height * floorPercentage;

        return (
            <div className={'quickArtworkMaker'}>

                <QuickArtworkRoom height={height}
                                  floorHeight={floorHeight}/>

                {artworkData &&
                <div className={'quickArtworkMaker--artworkHolder'}>
                    <QuickArtwork height={height-floorHeight}
                                  width={width}
                                  artworkData={artworkData}/>
                </div>
                }

                {!artworkData &&
                <div className={'quickArtworkMaker--photoSelectorHolder'}>
                    <QuickPhotoSelector onPhotoSelected={this.onPhotoSelect}/>
                </div>
                }
            </div>
        );
    }
}

export default sizeMe({ monitorHeight: true })(QuickArtworkMaker);