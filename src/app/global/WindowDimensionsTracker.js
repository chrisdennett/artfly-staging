// externals
import { Component } from "react";
import { connect } from 'react-redux';
// actions
import { setWindowSize } from "../../actions/UiActions";

class WindowDimensionsTracker extends Component {

    constructor() {
        super();

        this.updateDimensions = this.updateDimensions.bind(this);
    }

    componentDidMount() {
        this.updateDimensions();
        window.onresize = this.updateDimensions;
    }

    componentWillUpdate(nextProps) {
        if (nextProps.inEditMode !== this.props.inEditMode) {
            this.updateDimensions(nextProps.inEditMode);
        }
    }

    updateDimensions(inEditMode=this.props.inEditMode) {

        const pageWidth = window.innerWidth;
        const pageHeight = window.innerHeight;
        const editControlsWidth = 150;

        const contentWidth = inEditMode ? pageWidth - editControlsWidth : pageWidth;

        this.props.setWindowSize(contentWidth, pageHeight);
    };

    render() {
        return this.props.children;
    }
}

// export default ScrollbarRemover;
// Map state to props maps to the intermediary component which uses or passes them through
export default connect(
    null, { setWindowSize }
)(WindowDimensionsTracker);