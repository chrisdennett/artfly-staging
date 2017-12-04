import React, { Component } from "react";
import WindowController from "./global/WindowDimensionsTracker";
import AppControls from "./AppControls/AppControls";

class App extends Component {

    render() {
        const {PageComponentWithProps, params, user} = this.props;

        return (
            <div className='app'>

                <div className='app--sidebar'>
                    <AppControls {...params} user={user}/>
                </div>


                <div className='app--main'>
                    <WindowController>
                        {PageComponentWithProps}
                    </WindowController>
                </div>

            </div>
        );
    }
}

export default App;