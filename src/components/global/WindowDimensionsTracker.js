// externals
import React, { Component } from "react";
import { connect } from 'react-redux';
// actions
import { setWindowSize } from "../../actions/UiActions";

class WindowDimensionsTracker extends Component {

    componentDidMount() {
        this.updateDimensions();
        window.onresize = this.updateDimensions;
    }

    updateDimensions = () => {
        const pageWidth = window.innerWidth;
        const pageHeight = window.innerHeight;

        this.props.setWindowSize(pageWidth, pageHeight);
    };

    render() {
        return (
            <div>
                {this.props.children}
            </div>
        );
    }
}

// export default ScrollbarRemover;
// Map state to props maps to the intermediary component which uses or passes them through
export default connect(
    null, { setWindowSize }
)(WindowDimensionsTracker);