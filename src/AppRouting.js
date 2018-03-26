// externals
import React, { Component } from "react";
import { connect } from 'react-redux';
import ga from './libs/googleAnalyticsConfig';
// actions
import { listenForUserChanges } from './actions/UserDataActions';
// components
import history from './app/global/history';
// route components
import Home from './app/Home/Home';
import FourOhFour from "./app/FourOhFour/FourOhFour";
import LoadingOverlay from "./app/global/LoadingOverlay";
import App from "./app/App";
import QuickArtworkMaker from "./app/QuickArtworkMaker/QuickArtworkMaker";

const routes = {
    home: { component: Home },
    quickArtworkMaker: { component: QuickArtworkMaker },
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
        const PageComponentWithProps = <PageComponent {...params} user={this.props.user} page={page}/>;

        if (!this.props.user.status || this.props.user.status === 'pending') {
            return <LoadingOverlay/>
        }

        return (
            <App params={params} user={this.props.user} page={page}>
                {PageComponentWithProps}
            </App>
        );
    }
}


const mapStateToProps = (state) => {
    return {
        user: state.user
    }
};
const mapActionsToProps = { listenForUserChanges };

export default connect(mapStateToProps, mapActionsToProps)(ArtflyRouting);
