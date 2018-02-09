import React, {Component} from "react";
// styles
import './artworkPreviewStyles.css';
// helpers
import { calculateArtworkSizes } from "../../../../Artwork/assets/ArtworkCalculations";
// comps
import Artwork from "../../../../Artwork/Artwork";
import { faCheck } from "@fortawesome/fontawesome-pro-solid/index.es";
import ControlPanelButt from "../../../../global/Butt/ControlPanelButt";

class ArtworkPreview extends Component{

    componentDidMount() {
        this.props.setToolControls([
            <ControlPanelButt key={'showArt'}
                              isSelected={true}
                              label={'Done'}
                              icon={faCheck}
                              onClick={this.props.onDone}/>,
        ]);
    }

    componentWillUnmount() {
        this.props.clearToolControls();
    }

    render() {
        const { maxWidth, maxHeight, artwork } = this.props;

        if (!artwork) return <div>no artwork data</div>;

        const { widthToHeightRatio, heightToWidthRatio } = artwork;
        const minimumPaddingTop = 15;
        const minimumPaddingSides = 15;
        const artworkWidth = maxWidth - (maxWidth / 10); // give a 10% margin
        const artworkHeight = maxHeight - (maxHeight / 10); // give a 10% margin

        let artworkData = calculateArtworkSizes(artworkWidth, artworkHeight, widthToHeightRatio, heightToWidthRatio, minimumPaddingTop, minimumPaddingSides);

        return (
            <div className={'artworkPreview--holder'}>
                <div className={'artworkPreview'} style={{ width: artworkWidth, height: artworkHeight }}>
                    <Artwork width={artworkWidth}
                             height={artworkHeight}
                             artwork={artwork}
                             allowScrollbars={true}
                             artworkData={artworkData}/>
                </div>
            </div>

        );
    }
};

export default ArtworkPreview;