// externals
import React, {
    Component,
    Suspense
} from "react";
import {
    connect
} from 'react-redux';
// ui
import {
    Typography
} from 'rmwc/Typography';
// styles
import './homeStyles.css';
// components
import {
    HomeAppBar
} from "../../components/appBar/AppBar";
import Title from "./title/Title";
import LoadingThing from "../../components/loadingThing/LoadingThing";
import ArtFlyIntro from "./artFlyIntro/ArtFlyIntro";
import GalleryCards from "./galleryCards/GalleryCards";
import ArtistDelete from "../../components/artistDelete/ArtistDelete";
// lazy loaded components
const AboutUs = React.lazy(() => import("./aboutUs/AboutUs"));
const SocialMediaStuff = React.lazy(() => import("./socialMediaStuff/SocialMediaStuff"));
const ArtFlyLab = React.lazy(() => import("./artflyLab/ArtFlyLab"));
const JumpingVictorianLady = React.lazy(() => import('./JumpingVictorianLady'));
const Footer = React.lazy(() => import("../../components/footer/Footer"));
// import SignUpForm from "./SignUpForm/SignUpForm";
class Home extends Component {

    constructor(props) {
        super(props);

        this.state = {
            deleteArtist: null,
            showLowPriorityStuff: false,
            killMe: false
        };
    }

    componentDidMount() {
        this.setState({ showLowPriorityStuff: true });
    }

    render() {
        const { user } = this.props;

        const userLoggedIn = !!user.uid;
        const userPending = user === 'pending';

        return (
            <div className={'home'}>
                <HomeAppBar />

                {
                    userPending &&
                    <LoadingThing />
                }

                {
                    !userLoggedIn &&
                    <div className='home--heading'>
                        <Title />
                        < ArtFlyIntro />
                    </div>
                }

                {
                    userLoggedIn &&
                    <div className={'home--yourGalleries'}>
                        <Typography className={'sectionTitle'} use="headline4">
                            Your Galleries
                        </Typography>

                        <ArtistDelete showDialog={this.state.deleteArtist}
                            artistId={this.state.deleteArtist}
                            onCancel={() => this.setState({ deleteArtist: null })}
                        />

                        <div className={'home--yourGalleries--galleries'} >
                            <GalleryCards onDeleteArtist={(artistId) => this.setState({ deleteArtist: artistId })} />
                        </div>
                    </div>
                }

                {
                    this.state.showLowPriorityStuff &&
                    <Suspense fallback={<div> Loading... </div>}>
                        <div>
                            { /*<SignUpForm/>*/}
                            <ArtFlyLab />
                            <SocialMediaStuff />
                            <AboutUs />
                            <JumpingVictorianLady />
                            <Footer />
                        </div>
                    </Suspense>
                }

            </div >
        );
    }
};

const mapStateToProps = (state) => ({
    user: state.user,
});

export default connect(mapStateToProps)(Home);