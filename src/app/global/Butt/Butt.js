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
        const { label, onClick, alignLeft, size, svgIcon, showAsLink, fullWidth, ...rest } = this.props;

        const labelPadding = svgIcon ? 10 : 0;
        const labelStyle = { paddingLeft: labelPadding };

        let buttonStyle = {

        };

        if(alignLeft){
            buttonStyle.justifyContent = 'left';
        }

        if(fullWidth){
            buttonStyle.flexGrow = 1;
        }

        if (showAsLink) {
            buttonStyle.backgroundColor = 'rgba(0,0,0,0)';
            buttonStyle.boxShadow = 'none';
        }

        if(rest.style){
            buttonStyle = {...buttonStyle, ...rest.style}
        }

        let classes = 'butt';
        if(size === 'small') classes += ' butt--small';
        if(this.state.hover) classes += ' butt--hover';

        const {facebook, google, link, red, orange, white, yellow, green, blue, purple} = rest;

        if(facebook) classes += ' butt--facebook';
        else if(google) classes += ' butt--google';
        else if(link) classes += ' butt--link';
        else if(red) classes += ' butt--red';
        else if(orange) classes += ' butt--orange';
        else if(white) classes += ' butt--white';
        else if(yellow) classes += ' butt--yellow';
        else if(green) classes += ' butt--green';
        else if(blue) classes += ' butt--green';
        else if(purple) classes += ' butt--purple';

        return (
            <button onClick={onClick}
                    className={classes}
                    style={buttonStyle}
                    onMouseEnter={this.onMouseEnter}
                    onMouseLeave={this.onMouseLeave}>
                <span style={{paddingTop: 3}}>{svgIcon}</span>
                <span style={labelStyle}>{label}</span>
                {this.props.children}
            </button>
        )
    }
}

export default Butt;