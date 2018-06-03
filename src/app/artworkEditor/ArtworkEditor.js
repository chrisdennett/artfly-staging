import React, { Component } from 'react';
import { connect } from 'react-redux';
// material ui
import { Button, ButtonIcon } from 'rmwc/Button';
// actions
import { addNewArtwork } from '../../actions/SaveArtworkActions';
// helper
import GenerateDefaultArtworkData from '../artwork/DefaultArtworkDataGenerator';
import { GetImage } from "../global/ImageHelper";
// comps
import AppBar from "../appBar/AppBar";
import PhotoSelector from "../artworkOptions/photoSelector/PhotoSelector";
import FramedArtworkCanvas from "../artwork/FramedArtworkCanvas";

class ArtworkEditor extends Component {

    constructor(props) {
        super(props);

        this.state = { img: null };

        this.onPhotoSelected = this.onPhotoSelected.bind(this);
        this.onSaveNewArtwork = this.onSaveNewArtwork.bind(this);
    }

    onPhotoSelected(imgFile) {
        GetImage(imgFile, (img, orientation, widthToHeightRatio, heightToWidthRatio) => {
            this.setState({ img, orientation, widthToHeightRatio, heightToWidthRatio });
        })
    }

    onSaveNewArtwork() {
        const defaultArtworkData = GenerateDefaultArtworkData();
        const { orientation, widthToHeightRatio, heightToWidthRatio } = this.state;
        const newArtworkData = { ...defaultArtworkData, orientation, widthToHeightRatio, heightToWidthRatio };
        this.props.addNewArtwork(this.state.img, newArtworkData);
    }

    render() {
        const { img } = this.state;

        return (
            <div>
                <AppBar title={'Add Artwork'} fixed={false} showUserMenu={false} showCloseButt={true}/>

                {!img &&
                <PhotoSelector onPhotoSelected={(img) => this.onPhotoSelected(img)}/>
                }

                {img &&
                <div>
                    <FramedArtworkCanvas imgSrc={img.src}/>
                    <Button onClick={this.onSaveNewArtwork}
                            raised>
                        <ButtonIcon use={'save'}/>
                        Save
                    </Button>

                    <Button onClick={() => this.setState({ img: null })}
                            raised
                            theme={'secondary-bg'}>
                        <ButtonIcon use={'delete'}/>
                        Cancel
                    </Button>
                </div>
                }

            </div>
        )
    }
}

export default connect(null, { addNewArtwork })(ArtworkEditor);