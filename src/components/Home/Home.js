import React, { Component } from "react";
import './home.css';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchCommunityData } from '../../actions/CommunityActions';
import Title from "./assets/Title";

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
            <div className={'home'}>
                <div className={'home-content'}>
                    <Title/>
                    <p className={'descriptions'}>Don't let artistic creations languish in a drawer. Let your ART FLY
                        FREE.</p>
                    <section>
                        <h2>What?</h2>
                        <p>A website</p>
                        <img style={{ maxWidth: '100%' }} src={'../gallery-example.png'}/>

                        <h2>How?</h2>
                        <ul>
                            <li>Snap a photo of the artwork.</li>
                            <li>Add a frame and a room.</li>
                            <li>Build your own gallery.</li>
                            <li>Share with the world.</li>
                        </ul>

                        <h2>Why?</h2>
                        <p>Kids info</p>

                        <h2>Who?</h2>
                        <p>About us stuff</p>

                        <h2>Where?</h2>
                        <p>Ulverston</p>

                        <h2>When?</h2>
                        <p>NOW!</p>
                    </section>

                    <section>
                        <h2>Have a look at Holly and Dot's galleries</h2>
                        <p>I originally made this for my own children. If you want to check out their galleries you can
                            see them here:</p>
                        <Link to={`/gallery/${featuredGallery}`}>Holly's Gallery</Link>
                        <Link to={`/gallery/${featuredGallery}`}>Dot's Gallery</Link>
                    </section>

                </div>
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