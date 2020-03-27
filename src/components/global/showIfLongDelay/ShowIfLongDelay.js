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
        this.intervalRef = setInterval(this.updateTimer, 1000);
    }

    componentWillUnmount() {
        clearInterval(this.intervalRef);
    }

    updateTimer(){
        this.setState((state) => {
            const currSeconds = state.seconds;
            const newSeconds = currSeconds + 1;

            return{
                seconds: newSeconds
            }
        });

        if(this.state.seconds > 3){
            clearInterval(this.intervalRef);
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