import React, { Component } from "react";
import WindowController from "./global/WindowDimensionsTracker";
import AppControls from "./AppControls/AppControls";

class App extends Component {

    render() {
        const {params, children} = this.props;

        return (
            <div className='app'>

                <div className='app--sidebar'>
                    <AppControls {...params}/>
                </div>

                <div className='app--main'>
                    <WindowController>
                        {children}
                    </WindowController>
                </div>

            </div>
        );
    }
}

export default App;