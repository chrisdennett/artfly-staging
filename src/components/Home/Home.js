import React, { Component } from "react";
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchCommunityData } from './CommunityActions';

class Home extends Component {

    componentDidMount() {
        this.props.fetchCommunityData();
    }

    render() {
        const { featuredGallery } = this.props.communityData;
        /*const deployToLive = false;

        if(deployToLive){
            return <h1 style={{width:'100%', textAlign:'centre', padding: 42}}>ArtFly</h1>;
        }*/

        return (
            <div>
                <h1>Home</h1>
                <p>Marketing stuff.</p>
                <Link to={`/gallery/${featuredGallery}`}>Featured Gallery</Link>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        communityData: state.communityData
    }
}

export default connect(mapStateToProps, { fetchCommunityData })(Home);