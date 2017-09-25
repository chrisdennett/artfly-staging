import React from "react";
import { Link, Redirect } from 'react-router-dom';

import AddArtwork from '../../AddArtwork/AddArtwork';
import SignOutButton from "./assets/SignOutButton";
import SettingsButton from "./assets/SettingsButton";
import EditButton from "../GalleryControls/assets/EditButton";
import LoadingOverlay from "../../LoadingOverlay/LoadingOverlay";
import SignInContainer from "../../SignIn/SignInContainer";

const UserControls = function (props) {
    const { userStatus } = props;
    const currentPath = props.history.location.pathname;
    const onArtworkEditorPage = currentPath.indexOf("artwork-editor") > -1;

    let renderContent;

    if (!userStatus || userStatus === "pending") {
        return <LoadingOverlay/>
    }
    else if (userStatus === "new") {
        return <Redirect to={'/add-or-edit-user/'}/>
    }
    else if (userStatus === "none") {
        renderContent = <SignInContainer/>
    }
    else {
        renderContent =
            <span>
                {(!props.artworkId || onArtworkEditorPage) ? "" : <Link to={`/artwork-editor/${props.artworkId}`}><EditButton/></Link> }

                <AddArtwork history={props.history} />

                <Link to="/settings"><SettingsButton/></Link>

                <SignOutButton onClick={props.logout}/>
            </span>
    }

    return (
        <div className="controls-block controls-block-user">
            {renderContent}
        </div>
    )
};

export default UserControls;