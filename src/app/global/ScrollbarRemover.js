// externals
import { Component } from "react";

class ScrollbarRemover extends Component {

    componentDidMount() {
        this.updateScrollbars();
    }

    componentDidUpdate() {
        this.updateScrollbars();
    }

    componentWillUnmount() {
        this.allowScrollbars();
    }

    updateScrollbars = () => {
        if (this.props.showScrollbars === true) {
            this.allowScrollbars();
        }
        else {
            this.hideScrollbars();
        }
    };

    hideScrollbars = () => {
        document.body.classList.toggle('no-scroll-bars', true);
    };

    allowScrollbars = () => {
        document.body.classList.remove('no-scroll-bars');
    };

    render() {
        return (this.props.children );
    }
}

export default ScrollbarRemover;