import React, { Component } from "react";
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram, faPinterest, faTwitter, faGooglePlus } from '@fortawesome/fontawesome-free-brands';
// styles
import './quickShare_styles.css';
// images
import Butt from "../../global/Butt/Butt";
import QuickArtwork from "../quickArtwork/QuickArtwork";
import PresetButton from "./PresetButton";

/*
Best image sizes
//https://postcron.com/en/blog/social-media-image-dimensions-sizes/
Facebook: 1,200 x 630
Instagram: 1080 x 1080 (or 1080 x 566 or 1080 x 1350) //https://havecamerawilltravel.com/photographer/instagram-photo-size-guide/
Pinterest: 736 x 1104 to 2061 //https://www.picmonkey.com/blog/perfect-the-art-of-pinterest-pin-sizes
Twitter: 1024 x 512
Google+: 1,080 x 608
*/

const presets = [
    {
        icon: <FontAwesomeIcon icon={faFacebook}/>,
        label: 'Facebook',
        width: 1200,
        height: 630
    },
    {
        icon: <FontAwesomeIcon icon={faInstagram}/>,
        label: 'Instagram',
        width: 1080,
        height: 1080
    },
    {
        icon: <FontAwesomeIcon icon={faPinterest}/>,
        label: 'Pinterest',
        width: 736,
        height: 1104
    },
    {
        icon: <FontAwesomeIcon icon={faTwitter}/>,
        label: 'Twitter',
        width: 1024,
        height: 512
    },
    {
        icon: <FontAwesomeIcon icon={faGooglePlus}/>,
        label: 'Google+',
        width: 1080,
        height: 608
    }
];


class QuickShare extends Component {

    constructor(props) {
        super(props);

        this.saveImage = this.saveImage.bind(this);
        this.onCanvasSetUp = this.onCanvasSetUp.bind(this);
        this.onPresetSelected = this.onPresetSelected.bind(this);

        this.state = { downloadUrl: '', presetWidth: 1200, presetHeight: 630 };
    }

    onCanvasSetUp(canvas) {
        this.canvas = canvas;
    }

    saveImage() {
        this.setState({ downloadUrl: this.canvas.toDataURL() })
    }

    onPresetSelected(presetWidth, presetHeight) {
        this.setState({ presetWidth, presetHeight });
    }

    render() {
        const { downloadUrl, presetWidth, presetHeight } = this.state;
        const { cropData, masterCanvas, widthToHeightRatio, heightToWidthRatio, width, height } = this.props;

        const presetWidthToHeightRatio = presetHeight / presetWidth;
        const presetHeightToWidthRatio = presetWidth / presetHeight;

        const sidebarWidth = 300;


        let artworkHolderWidth = width - sidebarWidth;
        let artworkHolderHeight = artworkHolderWidth * presetWidthToHeightRatio;
        const imageLabelHeight = 70;
        const padding = 10;
        const margin = 10;
        const maxHeight = height - (imageLabelHeight + (padding*2) + (margin*2));
        if(artworkHolderHeight > maxHeight){
            artworkHolderHeight = maxHeight;
            artworkHolderWidth = artworkHolderHeight * presetHeightToWidthRatio;
        }

        const artworkHolderStyle = { height: artworkHolderHeight, width:artworkHolderWidth };

        return (

            <div className={'quickShare'}>


                <div className={'quickShare--imagePreview'}>
                    <div className={'quickShare--quickArtworkHolder'} style={artworkHolderStyle}>

                        <QuickArtwork width={presetWidth}
                                      height={presetHeight}
                                      onCanvasSetUp={this.onCanvasSetUp}
                                      cropData={cropData}
                                      masterCanvas={masterCanvas}
                                      widthToHeightRatio={widthToHeightRatio}
                                      heightToWidthRatio={heightToWidthRatio}/>
                    </div>
                    <p className={'quickShare--quickArtworkHolder--label'}>Dimensions: {presetWidth} x {presetHeight}</p>
                </div>

                <div className={'quickShare--controls'}>
                    <h2>Preset sizes:</h2>
                    <div className={'quickShare--presets'}>
                        {
                            presets.map((preset) => {
                                return <PresetButton icon={preset.icon}
                                                     key={preset.label}
                                                     onSelect={this.onPresetSelected}
                                                     width={preset.width}
                                                     height={preset.height}
                                                     label={preset.label}/>
                            })

                        }
                    </div>

                    <div>
                        Dimensions: {presetWidth} x {presetHeight}
                    </div>

                    <Butt useATag={true} href={downloadUrl} download={'artwork'} onClick={this.saveImage}>
                        Download image
                    </Butt>
                </div>


            </div>
        );
    }
}

export default QuickShare;