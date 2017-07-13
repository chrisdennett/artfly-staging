import React, { Component } from "react";
import { Link } from 'react-router-dom';

// import Login from './Login';
import NewUserForm from '../../Settings/UserEditor/NewUserForm';
import ArtworkAdderContainer from '../../Settings/ArtworkAdder/ArtworkAdderContainer';

class UserControls extends Component {

    render() {
        const { userStatus } = this.props;
        let renderContent;

        if (!userStatus || userStatus === "pending") {
            renderContent = <div>Checking the salad draw...</div>
        }
        else if (userStatus === "new") {
            renderContent = <NewUserForm {...this.props} />
        }
        else if (userStatus === "none") {
            renderContent = <button onClick={this.props.login}>Sign up / Log in</button>
        }
        else {
            renderContent =
                <span>
                    {!this.props.artworkId ? "" : <button>edit artwork</button>  }

                    <ArtworkAdderContainer history={this.props.history}
                                           galleryId={this.props.galleryId}/>

                    <Link to="/settings">Settings</Link>

                    <button onClick={this.props.logout}>Log out</button>
                </span>
        }

        return (
            <div className="controls-block controls-block-user">
                {renderContent}
            </div>
        )
    }
}

export default UserControls;