import React, { Component } from "react";
import { saveAs } from 'file-saver';
import toBlob from 'canvas-to-blob';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faDesktop from '@fortawesome/fontawesome-pro-solid/faDesktop';
import faDownload from '@fortawesome/fontawesome-pro-solid/faDownload';
import faShare from '@fortawesome/fontawesome-pro-solid/faShare';
import faFacebook from '@fortawesome/fontawesome-free-brands/faFacebook';
import faInstagram from '@fortawesome/fontawesome-free-brands/faInstagram';
import faPinterest from '@fortawesome/fontawesome-free-brands/faPinterest';
import faTwitter from '@fortawesome/fontawesome-free-brands/faTwitter';
import faGooglePlus from '@fortawesome/fontawesome-free-brands/faGooglePlus';
// styles
import './sharingOptions_styles.css';
// comps
import Butt from "../../global/Butt/Butt";
import Artwork from "../../artwork/Artwork";
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

• for iPhone 4S
Screen: 960 x 640
Wallpaper: 1196 x 740

• for iPhone 5, 5C & 5S; iPod Touch 5th gen
Screen: 1136 x 640
Wallpaper: 1392 x 744

• for iPhone 6
Screen: 1334 x 750
Wallpaper: 1608 x 852

• for iPhone 6 Plus
Screen: 1920 x 1080
(downsampled from 2208 x 1242)
Wallpaper: 2662 x 2662
npm
• for iPhone 7
750 x 1334

• for iPhone 7 plus
Landscape: 2208 x 2208

• for iPad 2nd gen & iPad mini
Screen: 1024 x 768
Wallpaper: 1262 x 1262

• for iPad 3rd & 4th gen; iPad Air; iPad mini (retina)
Screen: 2048 x 1536
Wallpaper: 2524 x 2524
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
        label: 'Desktop wallpaper',
        width: 1920,
        height: 1080
    }
];

class SharingOptions extends Component {

    constructor(props) {
        super(props);

        this.saveImage = this.saveImage.bind(this);
        this.onCanvasSetUp = this.onCanvasSetUp.bind(this);
        this.onPresetSelected = this.onPresetSelected.bind(this);
        this.onPresetWidthInputChange = this.onPresetWidthInputChange.bind(this);
        this.onPresetHeightInputChange = this.onPresetHeightInputChange.bind(this);

        toBlob.init();

        this.state = { presetWidth: 1200, presetHeight: 630, presetName: 'Facebook' };
    }

    onCanvasSetUp(canvas) {
        this.canvas = canvas;
    }

    saveImage() {
        const { presetWidth, presetHeight, presetName } = this.state;
        const downloadName = `artfly_${presetName}_${presetWidth}x${presetHeight}.png`;

        this.canvas.toBlob((blob) => {
            saveAs(blob, downloadName);
        });

        // previous attempts to save the canvas - didn't work in all browsers.
        /*try {
            window.navigator.msSaveBlob(this.canvas.msToBlob(), 'filename.png'); // pops up download prompt
        }
        catch (e) {
            this.setState({ downloadUrl: this.canvas.toDataURL() });
        }*/
    }

    onPresetSelected(presetWidth, presetHeight, presetName) {
        this.setState({ presetWidth, presetHeight, presetName });
    }

    onPresetWidthInputChange(e) {
        let proposedWidth = e.target.value;
        const maxWidth = 3000;

        if (proposedWidth > maxWidth) {
            proposedWidth = maxWidth
        }

        this.setState({ presetWidth: proposedWidth, presetName: 'Custom size' })
    }

    onPresetHeightInputChange(e) {
        let proposedHeight = e.target.value;
        const maxHeight = 3000;

        if (proposedHeight > maxHeight) {
            proposedHeight = maxHeight;
        }

        this.setState({ presetHeight: proposedHeight, presetName: 'Custom size' })
    }

    render() {
        const { presetWidth, presetHeight, presetName } = this.state;
        const { artworkData, masterCanvas} = this.props;

        return (

            <div className={'quickShare'}>

                <div className={'quickShare--intro'}>
                    <StencilHeader wording={'Saving and Sharing'}
                                   icon={<FontAwesomeIcon icon={faShare}/>}/>

                    <p>Now your artwork is framed and looking divine, you'll want to download it for backgrounds, mugs,
                        t-shirts, tattoos and to share with the world.</p>
                    <p>Pick your own size or use one of the presets.</p>
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
                                                     presetName={preset.label}/>
                            })

                        }
                    </div>

                    <div className={'quickShare--controls--dimensions'}>
                        Dimensions:
                        <div className={'quickShare--controls--dimensions--inputs'}>
                            <input onChange={this.onPresetWidthInputChange}
                                   className={'quickShare--controls--dimensions--input'}
                                   type="text"
                                   value={presetWidth}/>

                            x

                            <input onChange={this.onPresetHeightInputChange}
                                   className={'quickShare--controls--dimensions--input'}
                                   type="text"
                                   value={presetHeight}/>
                        </div>
                    </div>
                </div>

                <div className={'quickShare--imagePreview'}>
                    <div className={'quickShare--imagePreview--label'}>{presetName}: {presetWidth}x{presetHeight}</div>
                    <div className={'quickShare--quickArtworkHolder'}>
                        <Artwork width={presetWidth}
                                 height={presetHeight}
                                 artworkData={artworkData}
                                 onCanvasSetUp={this.onCanvasSetUp}
                                 masterCanvas={masterCanvas}
                        />
                    </div>
                </div>

                <div className={'quickShare--downloadSection'}>
                    <Butt green useATag={true}
                          svgIcon={<FontAwesomeIcon icon={faDownload}/>}
                          onClick={this.saveImage}>
                        Download image*
                    </Butt>

                    <div className={'quickShare--downloadSection--footnote'}>* If the download doesn't work some
                        browsers allow you to
                        click/press the image to save it: Use right-click on Windows; click and hold on Mac: press and
                        hold mobile.
                    </div>

                </div>
            </div>
        );
    }
}

export default SharingOptions;