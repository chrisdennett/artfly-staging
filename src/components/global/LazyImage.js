import React, { Component } from "react";

class LazyImage extends Component {

    constructor(props) {
        super(props);

        this.state = {
            loaded: false,
            error: false
        };
    }

    componentWillUpdate(nextProps) {
        if (nextProps.url !== this.props.url) {
            this.loadImage(nextProps.url);
        }
    }

    loadImage(url) {
        const image = new Image();
        image.onload = () => {
            this.setState({
                loaded: true
            });
        };
        image.onerror = (e) => {
            this.setState({
                error: true
            });
        };

        image.src = url;
    }

    render() {
        if (this.state.error) {
            return <g fill={'#ff0000'}>
                <rect x={58}
                      y={53}
                      width={100}
                      height={100}/>
            </g>
        }
        else if (!this.props.url) {
            return <g fill={'#000'}>
                <rect x={58}
                      y={53}
                      width={100}
                      height={100}/>
            </g>
        }
        return <image x={58}
                      y={53}
                      width={100}
                      height={100}
                      href={this.props.url}/>
    }
}

export default LazyImage;