import React, { Component } from "react";
// styles
import './showIfLongDelay_styles.css';

class ShowIfLongDelay extends Component {

    constructor(props) {
        super(props);

        this.state = { seconds: 0 };

        this.updateTimer = this.updateTimer.bind(this);

    }

    componentDidMount() {
        const intervalRef = setInterval(this.updateTimer, 1000);
        this.setState({intervalRef})
    }

    componentWillUnmount() {
        clearTimeout(this.state.intervalRef);
    }

    updateTimer(e){
        this.setState((state) => {
            const currSeconds = state.seconds;
            const newSeconds = currSeconds + 1;

            return{
                seconds: newSeconds
            }
        });

        if(this.state.seconds > 3){
            clearTimeout(this.state.intervalRef);
        }
    }

    render() {
        const { children, waitFor=3 } = this.props;
        const { seconds } = this.state;

        if(seconds < waitFor){
            return null;
        }

        return (
            <div className={'showIfLongDelay'}>
                {children}
            </div>
        );
    }
}

export default ShowIfLongDelay;