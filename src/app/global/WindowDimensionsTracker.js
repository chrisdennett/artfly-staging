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
        window.onresize = () => {
            this.updateDimensions();
        }
    }

    componentWillUpdate(nextProps) {
        if (nextProps.leftMargin !== this.props.leftMargin) {
            this.updateDimensions(nextProps.leftMargin);
        }
    }

    // updateDimensions(inEditMode=this.props.inEditMode) {
    updateDimensions(leftMargin=this.props.leftMargin) {

        const pageWidth = window.innerWidth;
        const pageHeight = window.innerHeight;

        const contentWidth = leftMargin ? pageWidth - leftMargin : pageWidth;

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