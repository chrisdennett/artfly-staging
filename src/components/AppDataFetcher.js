// Externals
import React, { Component } from "react";
import { connect } from 'react-redux';
// Actions
import { fetchUserData } from '../actions/UserActions';
import { fetchLocalPrice } from '../actions/PaddleActions';
import { fetchArtist } from "../actions/ArtistGalleryActions";

class AppDataFetcher extends Component {
    dataFetched = false;

    constructor(props) {
        super(props);
        this.state = { pageWidth: 0, pageHeight: 0, inMobileMode: null };
    }

    componentWillMount() {
        this.fetchGlobalData();
    }

    componentWillUpdate(nextProps){
        if(this.dataFetched === false && nextProps.userId !== this.props.userId){
            // this.fetchGlobalData();
            console.log("nextProps.userStatus: ", nextProps.userId);
            console.log("nextProps.userStatus: ", this.props.userId);
        }
    }

    componentWillUnmount(){
        console.log("unmounted: ");
    }

    fetchGlobalData = () => {
        this.props.fetchUserData((userData) => {
            if (userData) {
                this.dataFetched = true;
                /*for (let artistId of Object.keys(userData.artistIds)) {
                    this.props.fetchArtist(artistId);
                    this.props.fetchArtistArtworkIds(artistId);
                }*/
            }
        });
        this.props.fetchLocalPrice();
    };

    render() {
        // If it's an admin only page wait for user data and only let through if have a uid
        if(this.props.adminOnly){
            // TODO add redirect code if status is 'none' or 'new'
            if(!this.props.user || this.props.user.status !== 'complete'){
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