// externals
import React, { Component } from "react";
import { connect } from 'react-redux';
import _ from 'lodash';
// styles
import './newArtworkPhotoSelector_styles.css';
// actions
import { getUserArtistChanges } from '../../../../../actions/UserDataActions'
// import ArtistSelectorOption from "../../../../ArtistSelector/ArtistSelectorOption";
import PhotoSelector from "./PhotoSelector/PhotoSelector";
import { faTimes } from "@fortawesome/fontawesome-free-solid/index.es";
import ControlPanelButt from "../../../../global/Butt/ControlPanelButt";

class NewArtworkPhotoSelector extends Component {

    componentDidMount() {
        this.props.setToolControls([
            <ControlPanelButt key={'cancelUpload'} isSelected={true} label={'CANCEL'} icon={faTimes}
                              onClick={this.props.onCancel}/>
        ]);
    }

    componentWillUnmount() {
        this.props.clearToolControls();
    }

    componentWillMount() {
        // Load in the users artists
        this.props.getUserArtistChanges(this.props.userId);
    }

    render() {
        const { artists, onArtistSelected, onPhotoSelected } = this.props;

        return (
            <div className={'newArtworkPhotoSelector'}>
                {
                    _.map(artists, (artistData, artistId) => {
                        return <PhotoSelector
                            key={artistId}
                            id={artistId}
                            onPhotoSelected={onPhotoSelected}
                            onInputClick={onArtistSelected}
                            firstName={artistData.firstName}
                            lastName={artistData.lastName}/>
                    })
                }
            </div>
        );
    }
}

const
    mapStateToProps = (state) => {
        return {
            userId: state.user.uid,
            artists: state.artists
        }
    };
const mapActionsToProps = { getUserArtistChanges };

export default connect(mapStateToProps, mapActionsToProps)(NewArtworkPhotoSelector);