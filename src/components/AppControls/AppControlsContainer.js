import React, { Component } from 'react';
import { connect } from 'react-redux';

import {fetchUserData} from './UserControls/UserActions';

import AppControls from './AppControls';

// Intermediary component so ui component isn't required to call data
class AppControlsHolder extends Component {
    componentDidMount() {
        this.props.fetchUserData();
    }

    componentDidUpdate(prevProps) {
        /*if (this.props.artworkId !== prevProps.artworkId) {
            this.props.fetchArtwork(this.props.artworkId);
        }*/
    }

    render() {
        // const { artwork } = this.props;
        return <AppControls user={this.props.user}
                            artworkIds={this.props.artworkIds}
                            history={this.props.history}
                            galleryId={this.props.galleryId}
                            artworkId={this.props.artworkId} />;
    }
}

// Map state to props maps to the intermediary component which uses or passes them through
const mapStateToProps = (state, ownProps) => {
    const {galleryId, artworkId} = ownProps.match.params;

    return {
        user: state.user,
        galleryId: galleryId,
        artworkId: artworkId,
        artworkIds: state.artistsArtworkIds[galleryId]
    }
};

const AppControlsContainer = connect(
    mapStateToProps, { fetchUserData }
)(AppControlsHolder);

export default AppControlsContainer;
