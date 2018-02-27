// externals
import { Component } from "react";
import { connect } from 'react-redux';
// actions
import { setWindowSize } from "../../actions/UiActions";

class WindowDimensionsTracker extends Component {

    constructor(props) {
        super(props);

        this.updateDimensions = this.updateDimensions.bind(this);
    }

    componentDidMount() {
        this.updateDimensions();
        window.addEventListener("resize", this.updateDimensions);

        /*window.onresize = () => {
            this.updateDimensions();
        }*/
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.updateDimensions);
    }

    /*componentWillUpdate(nextProps) {
        if (nextProps.leftMargin !== this.props.leftMargin) {
            this.updateDimensions(nextProps.leftMargin);
        }
    }*/

    updateDimensions() {
        const pageWidth = Math.max(window.innerWidth, document.documentElement.clientWidth);
        const pageHeight = Math.max(window.innerHeight, document.documentElement.clientHeight);

        this.props.setWindowSize(pageWidth, pageHeight);
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