// Externals
import React, { Component } from "react";
import { connect } from 'react-redux';
// Actions
import { fetchUserData } from './actions/UserActions';
import { fetchLocalPrice } from './actions/PaddleActions';
import { fetchArtist } from "./actions/ArtistGalleryActions";
// Components
import Redirect from "./components/global/Redirect";

class AppDataFetcher extends Component {

    constructor(props) {
        super(props);
        this.state = { pageWidth: 0, pageHeight: 0, inMobileMode: null };
    }

    componentWillMount() {
        this.fetchGlobalData();
    }

    fetchGlobalData = () => {
        this.props.fetchUserData();
        this.props.fetchLocalPrice();
    };

    render() {
        // If it's an admin only page wait for user data and only let through if have a uid
        if(this.props.adminOnly){
            if(this.props.user.status === 'none'){
                return <Redirect to={'/'}/>;
            }

            if(this.props.user.status !== 'complete'){
                return <div> waiting for godot...</div>
            }
        }

        return (
            <div>
                {this.props.children}
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        user: state.user,
    }
};

export default connect(
    mapStateToProps, {
        fetchUserData,
        fetchLocalPrice,
        fetchArtist
    }
)(AppDataFetcher);