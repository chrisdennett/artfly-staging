import React, { Component } from "react";
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faDesktop, faDownload } from '@fortawesome/fontawesome-pro-solid';
import { faFacebook, faInstagram, faPinterest, faTwitter, faGooglePlus } from '@fortawesome/fontawesome-free-brands';
// styles
import './quickShare_styles.css';
// images
import Butt from "../../global/Butt/Butt";
import QuickArtwork from "../quickArtwork/QuickArtwork";
import PresetButton from "./PresetButton";
import StencilHeader from "../../global/stencilHeader/StencilHeader";

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
    },
    {
        icon: <FontAwesomeIcon icon={faDesktop}/>,
        label: '1920 x 1080',
        width: 1920,
        height: 1080
    },
];


class QuickShare extends Component {

    constructor(props) {
        super(props);

        this.saveImage = this.saveImage.bind(this);
        this.onCanvasSetUp = this.onCanvasSetUp.bind(this);
        this.onPresetSelected = this.onPresetSelected.bind(this);
        this.onPresetWidthInputChange = this.onPresetWidthInputChange.bind(this);
        this.onPresetHeightInputChange = this.onPresetHeightInputChange.bind(this);

        this.state = { downloadUrl: '', downloadName:'ArtFly', presetWidth: 1200, presetHeight: 630 };
    }

    onCanvasSetUp(canvas) {
        this.canvas = canvas;
    }

    saveImage() {
        this.setState({ downloadUrl: this.canvas.toDataURL() })
    }

    onPresetSelected(presetWidth, presetHeight, label) {
        this.setState({ presetWidth, presetHeight, downloadName:`ArtFly_pic_${label}_${presetWidth}x${presetHeight}` });
    }

    onPresetWidthInputChange(e){

        let proposedWidth = e.target.value;
        const maxWidth = 3000;

        if(proposedWidth > maxWidth){
            proposedWidth = maxWidth
        }

        this.setState({presetWidth:proposedWidth})

    }

    onPresetHeightInputChange(e){

        let proposedHeight = e.target.value;
        const maxHeight = 3000;

        if(proposedHeight > maxHeight){
            proposedHeight = maxHeight;
        }

        this.setState({presetHeight:proposedHeight})

    }

    render() {
        const { downloadUrl, downloadName, presetWidth, presetHeight } = this.state;
        const { cropData, masterCanvas, widthToHeightRatio, heightToWidthRatio, width, height } = this.props;

        /*const presetWidthToHeightRatio = presetHeight / presetWidth;
        const presetHeightToWidthRatio = presetWidth / presetHeight;

        const sidebarWidth = 300;*/


       /* let artworkHolderWidth = width - sidebarWidth;
        let artworkHolderHeight = artworkHolderWidth * presetWidthToHeightRatio;
        const imageLabelHeight = 70;
        const padding = 10;
        const margin = 10;
        const maxHeight = height - (imageLabelHeight + (padding*2) + (margin*2));
        if(artworkHolderHeight > maxHeight){
            artworkHolderHeight = maxHeight;
            artworkHolderWidth = artworkHolderHeight * presetHeightToWidthRatio;
        }

        const artworkHolderStyle = { height: artworkHolderHeight, width:artworkHolderWidth };*/

        return (

            <div className={'quickShare'}>

                <div className={'quickShare--intro'}>
                    <StencilHeader wording={'Saving and Sharing'}/>
                    <p>Now your artwork is framed and looking divine, you'll want to download it for backgrounds, mugs, t-shirts, tattoos and to share with the world.</p>
                    <p>Pick your own size or use one of these presets.</p>
                    {/*<p>You can right-click (click and hold on Mac, press and hold on mobile) on the artwork to save it.</p>*/}
                </div>

                <div className={'quickShare--controls'}>
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

                    <div className={'quickShare--controls--dimensions'}>
                        Dimensions:
                        <input onChange={this.onPresetWidthInputChange}
                               type="text"
                               value={presetWidth}/>

                        x

                        <input onChange={this.onPresetHeightInputChange}
                               type="text"
                               value={presetHeight}/>
                    </div>

                    <Butt green useATag={true}
                          svgIcon={<FontAwesomeIcon icon={faDownload}/>}
                          href={downloadUrl}
                          download={downloadName}
                          onClick={this.saveImage}>
                        Download image
                    </Butt>
                </div>

                <div className={'quickShare--imagePreview'}>


                    <div className={'quickShare--quickArtworkHolder'}>
                        <QuickArtwork width={presetWidth}
                                      height={presetHeight}
                                      onCanvasSetUp={this.onCanvasSetUp}
                                      cropData={cropData}
                                      masterCanvas={masterCanvas}
                                      widthToHeightRatio={widthToHeightRatio}
                                      heightToWidthRatio={heightToWidthRatio}/>
                    </div>

                    {/*<p className={'quickShare--quickArtworkHolder--label'}>Dimensions: {presetWidth} x {presetHeight}</p>*/}
                </div>
            </div>
        );
    }
}

export default QuickShare;