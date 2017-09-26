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

        const { label, svgIcon, backgroundColour, shadowColour, labelColour, showAsLink, ...rest } = this.props;

        const labelPadding = svgIcon ? 20 : 0;
        const labelStyle = { paddingLeft: labelPadding };
        let buttonStyle = {
            flexGrow: 1,
            display: 'flex',
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

        return (
            <button {...rest}
                    style={buttonStyle}
                    onMouseEnter={this.onMouseEnter}
                    onMouseLeave={this.onMouseLeave}>
                <span>{svgIcon}</span>
                <span style={labelStyle}>{label}</span>
            </button>
        )
    }
}

export default Butt;