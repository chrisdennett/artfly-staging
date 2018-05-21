// externals
import React, { Component } from "react";
import { connect } from 'react-redux';
import ga from './libs/googleAnalyticsConfig';
// actions
import { listenForUserChanges } from './actions/UserDataActions';
import { listenForUserArtworkChanges } from './actions/GetArtworkActions';
// components
import history from './app/global/history';
// route components
import App from "./app/App";
import Home from './app/Home/Home';
import FourOhFour from "./app/FourOhFour/FourOhFour";
import LoadingOverlay from "./app/global/LoadingOverlay";
import ArtworkViewer from "./app/artwork/ArtworkViewer";
import UserProfile from "./app/userProfile/UserProfile";

const routes = {
    home: { component: Home },
    profile: { component: UserProfile },
    artwork: { component: ArtworkViewer }
};

class ArtflyRouting extends Component {
    constructor(props) {
        super(props);
        this.state = { unlisten: null, params: null };
    }

    componentDidMount() {
        // fetch global data - determines routing
        this.props.listenForUserChanges();
        // set up routing
        const location = history.location;
        this.setPageData(location.pathname);
        const unlisten = history.listen((location) => {
            this.setPageData(location.pathname);
        });
        this.setState({ unlisten: unlisten });
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
        this.state.unlisten();
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
                case 'artwork':
                    params.artworkId = sections[1];
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
                {(!this.props.user.status || this.props.user.status === 'pending') &&
                <LoadingOverlay/>
                }
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
const mapActionsToProps = { listenForUserChanges, listenForUserArtworkChanges };

export default connect(mapStateToProps, mapActionsToProps)(ArtflyRouting);
