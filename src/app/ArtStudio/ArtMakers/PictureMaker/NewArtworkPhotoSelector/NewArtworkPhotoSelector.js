// externals
import React, { Component } from "react";
import { connect } from 'react-redux';
import _ from 'lodash';
// actions
import { getUserArtistChanges } from '../../../../../actions/UserDataActions'
// import ArtistSelectorOption from "../../../../ArtistSelector/ArtistSelectorOption";
import PhotoSelector from "../PhotoSelector/PhotoSelector";

class NewArtworkPhotoSelector extends Component {

    componentWillMount() {
        // Load in the users artists
        this.props.getUserArtistChanges(this.props.userId);
    }

    render() {
        const { artists, onArtistSelected, onFileSelect } = this.props;

        return (
            <div>
                {
                    _.map(artists, (artistData, artistId) => {
                        return <PhotoSelector
                            key={artistId}
                            id={artistId}
                            onFileSelect={onFileSelect}
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