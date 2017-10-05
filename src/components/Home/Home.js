import React, { Component } from "react";
import './home.css';
import { connect } from 'react-redux';
import { fetchCommunityData } from '../../actions/CommunityActions';
import Title from "./assets/Title";
import LinkButt from "../global/LinkButt";

class Home extends Component {

    componentDidMount() {
        this.props.fetchCommunityData();
    }

    render() {
        const { featuredGallery, featuredGallery2 } = this.props.communityData;

        return (
            <div className={'home'}>
                <div className={'home-content'}>
                    <Title/>
                    <p className={'descriptions'}>Don't let artistic creations languish in a drawer. Let the Art Fly
                        free!</p>
                    <section>
                        <h2>What?</h2>
                        <p>A place for all your those awesome artworks your kids produce. You could just stick them in a
                            draw or take a picture of it and save it somewhere. </p>
                        <p>Ideally we'd frame them and stick them all on the wall, but...</p>
                        <p>I tried sticking them all straight to the wall, but even this is too much for me it seems. I
                            need it to be quick and easy.</p>
                        <p>With Artfly you take a photo of it, but instead of forgetting about it you stick it in their
                            own art gallery.</p>
                        <p>I originally made this for my own children. If you want to check out their galleries you can
                            see them here:</p>

                        <LinkButt linkTo={`/gallery/${featuredGallery}`}
                                  label={'Holly\'s Gallery'}
                                  backgroundColour={'#4b962e'}
                                  shadowColour={'#2a5421'}
                                  style={{ display: 'inline-block' }}
                                  fullWidth={false}/>

                        <LinkButt linkTo={`/gallery/${featuredGallery2}`}
                                  label={'Dot\'s Gallery'}
                                  backgroundColour={'#2f8194'}
                                  shadowColour={'#22485a'}
                                  style={{ display: 'inline-block' }}
                                  fullWidth={false}/>

                        <p>Here are some screenshots and stuff:</p>

                        <img style={{ maxWidth: '100%' }} src={'../gallery-example.png'} alt={`gallery`}/>

                        <h2>How</h2>
                        <p></p>
                        <ul>
                            <li>Snap a photo of the artwork.</li>
                            <li>Add a frame and a room.</li>
                            <li>Build your own gallery.</li>
                            <li>Share with the world.</li>
                        </ul>

                        <h2>How much?</h2>
                        <p>It's free for up to 7 pictures so you can try it out. Then if you want to subscribe
                            it's {this.props.localPrice} a month.</p>

                        <h2>What about the 'who, why', where & when'?</h2>
                        <p>I think that's enough words for the home page so I've stuck all dvd extras on the
                            <button>[Add link to About Us Page]</button>
                        </p>
                    </section>

                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        communityData: state.communityData,
        localPrice: state.paddle.localPrice
    }
}

export default connect(mapStateToProps, { fetchCommunityData })(Home);