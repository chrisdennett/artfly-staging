import React from "react";
import { Link, Redirect } from 'react-router-dom';

import AddArtwork from '../../AddArtwork/AddArtwork';
import LoginButton from "./assets/LoginButton";
import LogoutButton from "./assets/LogoutButton";
import SettingsButton from "./assets/SettingsButton";

const UserControls = function (props) {
    const { userStatus } = props;
    const currentPath = props.history.location.pathname;
    const onArtworkEditorPage = currentPath.indexOf("artwork-editor") > -1;

    let renderContent;

    if (!userStatus || userStatus === "pending") {
        renderContent = <div>Checking the salad draw...</div>
    }
    else if (userStatus === "new") {
        return <Redirect to={'/add-or-edit-user/'}/>
    }
    else if (userStatus === "none") {
        // renderContent = <button onClick={props.login}><LoginButton/></button>
        renderContent = <LoginButton onClick={props.login}/>
    }
    else {
        renderContent =
            <span>
                {(!props.artworkId || onArtworkEditorPage) ? "" : <Link to={`/artwork-editor/${props.artworkId}`}>EDIT</Link> }

                <AddArtwork history={props.history} />

                <Link to="/settings"><SettingsButton/></Link>

                <LogoutButton onClick={props.logout}/>
            </span>
    }

    return (
        <div className="controls-block controls-block-user">
            {renderContent}
        </div>
    )
};

export default UserControls;