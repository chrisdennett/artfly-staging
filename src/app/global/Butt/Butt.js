import React, { Component } from 'react';
// styles
import './buttStyles.css';

class Butt extends Component {

    constructor() {
        super();

        this.state = { hover: false };

        this.onMouseEnter = this.onMouseEnter.bind(this);
        this.onMouseLeave = this.onMouseLeave.bind(this);
    }

    onMouseEnter() {
        this.setState({ hover: true });
    }

    onMouseLeave() {
        this.setState({ hover: false });
    }

    render() {
        const { label, useATag = false, onClick, alignLeft, size, svgIcon, showAsLink, fullWidth, ...rest } = this.props;

        let buttonStyle = {};

        if (alignLeft) {
            buttonStyle.justifyContent = 'left';
        }

        if (fullWidth) {
            buttonStyle.flexGrow = 1;
        }

        if (showAsLink) {
            buttonStyle.backgroundColor = 'rgba(0,0,0,0)';
            buttonStyle.boxShadow = 'none';
        }

        if (rest.style) {
            buttonStyle = { ...buttonStyle, ...rest.style }
        }

        let classes = 'butt';
        if (size === 'small') classes += ' butt--small';
        if (this.state.hover) classes += ' butt--hover';

        const { facebook, google, link, red, orange, white, yellow, green, blue, purple } = rest;

        if (facebook) classes += ' butt--facebook';
        else if (google) classes += ' butt--google';
        else if (link) classes += ' butt--link';
        else if (red) classes += ' butt--red';
        else if (orange) classes += ' butt--orange';
        else if (white) classes += ' butt--white';
        else if (yellow) classes += ' butt--yellow';
        else if (green) classes += ' butt--green';
        else if (blue) classes += ' butt--blue';
        else if (purple) classes += ' butt--purple';

        const wording = label ? label : this.props.children;

        if (useATag) {
            buttonStyle.display = 'inline-flex';

            return (
                <a onClick={onClick}
                   href={this.props.href}
                   download={this.props.download}
                   className={classes}
                   style={buttonStyle}
                   onMouseEnter={this.onMouseEnter}
                   onMouseLeave={this.onMouseLeave}>

                    {svgIcon &&
                    <div className={'butt--iconHolder'}>{svgIcon}</div>
                    }

                    <div>{wording}</div>
                </a>
            )
        }

        return (
            <button onClick={onClick}
                    className={classes}
                    style={buttonStyle}
                    onMouseEnter={this.onMouseEnter}
                    onMouseLeave={this.onMouseLeave}>

                {svgIcon &&
                <div className={'butt--iconHolder'}>{svgIcon}</div>
                }

                <div>{wording}</div>
            </button>
        )
    }
}

export default Butt;