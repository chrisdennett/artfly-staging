import React, { Component } from 'react';

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
        const { label, inline, size, svgIcon, backgroundColour, shadowColour, labelColour, showAsLink, fullWidth, ...rest } = this.props;

        const labelPadding = svgIcon ? 20 : 0;
        const labelStyle = { paddingLeft: labelPadding };
        let buttonStyle = {
            textDecoration: 'none',
            padding: '15px 25px',
            margin: 10,
            fontSize: 24,
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            outline: 'none',
            color: '#fff',
            backgroundColor: 'rgba(0, 0, 0, 0.3)',
            border: 'none',
            borderRadius: 5,
            boxShadow: '0 5px rgba(0, 0, 0, 0.5)'
        };

        if(!inline){
            buttonStyle.display = 'flex';
        }

        if(size ==='small'){
            buttonStyle.fontSize = 16;
            buttonStyle.padding = '10px 10px';
            buttonStyle.margin = 5;
            buttonStyle.borderRadius = 3;
            buttonStyle.boxShadow = '0 3px rgba(0, 0, 0, 0.5)';
        }

        if(fullWidth){
            buttonStyle.flexGrow = 1;
        }

        if (backgroundColour)
            buttonStyle.backgroundColor = backgroundColour;

        if(shadowColour)
            buttonStyle.boxShadow = `0 5px ${shadowColour}`;

        if (labelColour)
            buttonStyle.color = labelColour;

        if (showAsLink) {
            buttonStyle.backgroundColor = 'rgba(0,0,0,0)';
            buttonStyle.boxShadow = 'none';
        }

        if (this.state.hover) {
            buttonStyle.textDecoration = 'underline';
        }

        if(rest.style){
            buttonStyle = {...buttonStyle, ...rest.style}
        }

        return (
            <button {...rest}
                    style={buttonStyle}
                    onMouseEnter={this.onMouseEnter}
                    onMouseLeave={this.onMouseLeave}>
                <span>{svgIcon}</span>
                <span style={labelStyle}>{label}</span>
                {this.props.children}
            </button>
        )
    }
}

export default Butt;