// externals
import React, { Component } from "react";
import { connect } from 'react-redux';
import ga from './libs/googleAnalyticsConfig';
// actions
import { listenForUserAuthChanges, stopListeningForUserAuthChanges } from './actions/UserAuthActions';
import { listenForUserArtworkChanges, listenForIndividualArtworkChanged } from './actions/GetArtworkActions';
// helpers
import history from './app/global/history';
// route components
import App from "./app/App";
import Home from './app/Home/Home';
import FourOhFour from "./app/FourOhFour/FourOhFour";
import UserProfile from "./app/userProfile/UserProfile";
import UserDelete from "./app/userDelete/UserDelete";
import ArtworkAdder from "./app/artworkAdder/ArtworkAdder";
import TestPage from "./app/testPage/TestPage";
import Gallery from "./app/gallery/Gallery";
import ArtworkEditor from "./app/artworkEditor/ArtworkEditor";

const routes = {
    home: { component: Home },
    profile: { component: UserProfile },
    delete: { component: UserDelete },
    gallery: { component: Gallery },
    artworkAdder: { component: ArtworkAdder },
    artworkEditor: { component: ArtworkEditor },

    TESTING: {component: TestPage}
};

class ArtflyRouting extends Component {
    constructor(props) {
        super(props);
        this.state = { unlisten: null, params: null };
    }

    componentDidMount() {
        // set up routing
        const location = history.location;
        this.setPageData(location.pathname);
        const unlisten = history.listen((location) => {
            this.setPageData(location.pathname);
        });
        this.setState({ unlisten: unlisten });

        // fetch global data
        const sections = location.pathname.split('/').slice(1);
        if(sections.length > 1){
            // if there's an artwork param listen get that data first
            this.props.listenForIndividualArtworkChanged(sections[1]);
        }

        // listen out for logging in and out
        this.props.listenForUserAuthChanges();
    }

    componentWillReceiveProps(nextProps) {
        const { uid: newUid } = nextProps.user;
        const { uid: currentUid } = this.props.user;

        if (nextProps.user) {
            if (newUid !== currentUid) {
                this.props.listenForUserArtworkChanges(newUid);
            }
        }
    }

    componentWillUnmount() {
        // stop listening for route changes
        this.state.unlisten();
        // remove the auth listener
        this.props.stopListeningForUserAuthChanges();
    }



    setPageData(fullPath) {
        let page, params = {};

        if (fullPath === '/') {
            page = 'home';
        }
        else {
            const sections = fullPath.split('/').slice(1);
            page = sections[0];

            switch (page) {

                case 'artworkEditor':
                    params.artworkId = sections[1];
                    break;

                case 'gallery':
                    params.artworkId = sections[1];
                    break;

                case 'delete':
                    params.step = sections[1];
                    break;

                default:
                    break;
            }
        }

        this.setState(() => {
            return {
                page: page,
                params: params
            }
        });

        ga.set({ page: page });
        ga.pageview(fullPath);
    }

    render() {
        const { page, params } = this.state;

        const PageComponent = routes[page] ? routes[page].component : FourOhFour;
        const PageComponentWithProps = <PageComponent {...params} page={page}/>;

        return (
            <div>
                <App params={params} page={page}>
                    {PageComponentWithProps}
                </App>
            </div>
        );
    }
}


const mapStateToProps = (state) => {
    return {
        user: state.user
    }
};
const mapActionsToProps = { listenForUserAuthChanges, stopListeningForUserAuthChanges, listenForUserArtworkChanges, listenForIndividualArtworkChanged };

export default connect(mapStateToProps, mapActionsToProps)(ArtflyRouting);
