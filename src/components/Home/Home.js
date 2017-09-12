import React, { Component } from "react";
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchCommunityData } from '../../actions/CommunityActions';

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
                <h1>ArtFly</h1>
                <p className={'descriptions'}>Don't let artistic creations languish in a drawer. Let your art fly free
                    in the galleries of cyberspace. Let's all be creative and stick our work online for all to see.</p>
                <section>
                    <h2>Meet ArtFly</h2>
                    <ul>
                        <li>Snap a photo of the artwork.</li>
                        <li>Add a frame and a room.</li>
                        <li>Build your own gallery.</li>
                        <li>Share with the world.</li>
                    </ul>
                </section>

                <section>
                    <h2>Have a look at Holly and Dot's galleries</h2>
                    <p>I originally made this for my own children. If you want to check out their galleries you can see them here:</p>
                    <Link to={`/gallery/${featuredGallery}`}>Holly's Gallery</Link>
                    <Link to={`/gallery/${featuredGallery}`}>Dot's Gallery</Link>
                </section>

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