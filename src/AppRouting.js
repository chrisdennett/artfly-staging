// Externals
import React, { Component } from "react";
import ga from './libs/googleAnalyticsConfig';
// Components
import history from './components/global/history';
import App from "./App";

class ArtflyRouting extends Component {

    constructor(props) {
        super(props);
        this.state = { unlisten: null, galleryId: null, artworkId: null, artistId: null };
    }

    componentDidMount() {
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

            if (page === 'gallery') {
                params.galleryId = sections[1];

                if (sections[2]) {
                    page = 'artwork';
                    params.artworkId = sections[3];
                }
            }
            else if (page === 'artworkEditor') {
                params.artworkId = sections[1];
            }
            else if (page === 'addOrEditArtist') {
                params.artistId = sections[1];
            }
            else if (page === 'addOrEditUser') {
                params.userId = sections[1];
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
        return <App page={this.state.page} params={this.state.params} history={history}/>
    }
}

export default ArtflyRouting;