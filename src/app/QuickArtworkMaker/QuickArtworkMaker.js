import React, { Component } from "react";
// styles
import './quickArtworkMaker_styles.css';
// comps
import QuickPhotoSelector from "./quickPhotoSelector/QuickPhotoSelector";
import QuickArtworkRoom from "./quickArtworkRoom/QuickArtworkRoom";

class QuickArtworkMaker extends Component {

    render() {
        return (
            <div className={'quickArtworkMaker'}>

                <QuickArtworkRoom/>

                <div className={'quickArtworkMaker--photoSelectorHolder'}>
                    <QuickPhotoSelector/>
                </div>
            </div>
        );
    }
}

export default QuickArtworkMaker;