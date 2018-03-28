import React, { Component } from 'react';
// styles
import './buttStyles.css';

class Butt extends Component {

    constructor(props) {
        super(props);

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
        const { label, type, useATag = false, disabled, onClick, alignLeft, size, svgIcon, showAsLink, fullWidth, className, ...rest } = this.props;

        let onClickHandler = onClick;
        let buttonStyle = {display:'inline-flex'};
        const wordingStyle = { width:'100%'};

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

        if(disabled) {
            classes += ' butt--disabled';
            onClickHandler = null;
        }

        if(className){
            classes += ' ' + className;
        }

        const wording = label ? label : this.props.children;

        const iconHolderStyles = {};
            if(!wording){
                buttonStyle.paddingTop = 10;
                iconHolderStyles.padding = 0;
                iconHolderStyles.margin = 0;

            }

        if (useATag) {
            return (
                <a onClick={onClickHandler}
                   href={this.props.href}
                   download={this.props.download}
                   className={classes}
                   style={buttonStyle}
                   onMouseEnter={this.onMouseEnter}
                   onMouseLeave={this.onMouseLeave}>

                    {svgIcon &&
                    <div className={'butt--iconHolder'} style={iconHolderStyles}>{svgIcon}</div>
                    }

                    <div style={wordingStyle}>{wording}</div>

                </a>
            )
        }

        return (
            <button onClick={onClickHandler}
                    type={type}
                    className={classes}
                    style={buttonStyle}
                    onMouseEnter={this.onMouseEnter}
                    onMouseLeave={this.onMouseLeave}>

                {svgIcon &&
                <div className={'butt--iconHolder'} style={iconHolderStyles}>{svgIcon}</div>
                }

                <div style={wordingStyle}>{wording}</div>
            </button>
        )
    }
}

export default Butt;