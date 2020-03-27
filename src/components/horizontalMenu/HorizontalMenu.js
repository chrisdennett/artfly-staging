import React, { Component } from "react";
import './horizontalMenuStyles.css';

class HorizontalMenu extends Component {

    constructor(props) {
        super(props);
        this.state = { arrowsNeeded: '' }

        this.onRightArrowClick = this.onRightArrowClick.bind(this);
    }

    onRightArrowClick(){

    }

    /*determineOverflow() {
        if (!this.content || !this.container) return null;

        let arrowsNeeded;

        const containerMetrics = this.container.getBoundingClientRect();
        const containerMetricsRight = Math.floor(containerMetrics.right);
        const containerMetricsLeft = Math.floor(containerMetrics.left);
        const contentMetrics = this.content.getBoundingClientRect();
        const contentMetricsRight = Math.floor(contentMetrics.right);
        const contentMetricsLeft = Math.floor(contentMetrics.left);
        if (containerMetricsLeft > contentMetricsLeft && containerMetricsRight < contentMetricsRight) {
            arrowsNeeded = "both";
        }
        else if (contentMetricsLeft < containerMetricsLeft) {
            arrowsNeeded = "left";
        }
        else if (contentMetricsRight > containerMetricsRight) {
            arrowsNeeded = "right";
        }
        else {
            arrowsNeeded = "none";
        }

        this.setState({ arrowsNeeded });
    }*/

    render() {

        return (
            <div className="pn-ProductNav_Wrapper">
                <nav id="pnProductNav" className="pn-ProductNav"
                     ref={container => this.container = container}>
                    <div id="pnProductNavContents"
                         ref={content => this.content = content}
                         className="pn-ProductNav_Contents">
                        <span className="pn-ProductNav_Link" aria-selected="true">Chairs</span>
                        <span className="pn-ProductNav_Link">Tables</span>
                        <span className="pn-ProductNav_Link">Cookware</span>
                        <span className="pn-ProductNav_Link">Beds</span>
                        <span className="pn-ProductNav_Link">Desks</span>
                        <span className="pn-ProductNav_Link">Flooring</span>
                        <span className="pn-ProductNav_Link">Lighting</span>
                        <span className="pn-ProductNav_Link">Mattresses</span>
                        <span className="pn-ProductNav_Link">Solar Panels</span>
                        <span className="pn-ProductNav_Link">Bookcases</span>
                        <span className="pn-ProductNav_Link">Mirrors</span>
                        <span className="pn-ProductNav_Link">Rugs</span>
                        <span className="pn-ProductNav_Link">Curtains &amp; Blinds</span>
                        <span className="pn-ProductNav_Link">Frames &amp; Pictures</span>
                        <span className="pn-ProductNav_Link">Wardrobes</span>
                        <span className="pn-ProductNav_Link">Storage</span>
                        <span className="pn-ProductNav_Link">Decoration</span>
                        <span className="pn-ProductNav_Link">Appliances</span>
                        <span className="pn-ProductNav_Link">Racks</span>
                        <span className="pn-ProductNav_Link">Worktops</span>
                        <span id="pnIndicator" className="pn-ProductNav_Indicator"/>
                    </div>
                </nav>
                <button id="pnAdvancerLeft" className="pn-Advancer pn-Advancer_Left" type="button">
                    <svg className="pn-Advancer_Icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 551 1024">
                        <path
                            d="M445.44 38.183L-2.53 512l447.97 473.817 85.857-81.173-409.6-433.23v81.172l409.6-433.23L445.44 38.18z"/>
                    </svg>
                </button>
                <button id="pnAdvancerRight" onClick={() => this.onRightArrowClick()} className="pn-Advancer pn-Advancer_Right" type="button">
                    <svg className="pn-Advancer_Icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 551 1024">
                        <path
                            d="M105.56 985.817L553.53 512 105.56 38.183l-85.857 81.173 409.6 433.23v-81.172l-409.6 433.23 85.856 81.174z"/>
                    </svg>
                </button>
            </div>
        );
    }
}

export default HorizontalMenu;