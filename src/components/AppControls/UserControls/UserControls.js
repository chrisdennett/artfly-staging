import React from "react";

import SignOutButton from "./assets/SignOutButton";
import SettingsButton from "./assets/SettingsButton";
import EditButton from "../GalleryControls/assets/EditButton";
import LoadingOverlay from "../../LoadingOverlay/LoadingOverlay";
import SignInContainer from "../../SignIn/SignInContainer";
import AddArtInputButton from "./assets/AddArtInputButton";
import Link from "../../global/Link";

const UserControls = function (props) {
    const { userStatus } = props;
    const currentPath = props.history.location.pathname;
    const onArtworkEditorPage = currentPath.indexOf("artworkEditor") > -1;

    let renderContent;

    if (!userStatus || userStatus === "pending") {
        return <LoadingOverlay/>
    }
    else if (userStatus === "new") {
        // return <Redirect to={'/addOrEditUser/'}/>
    }
    else if (userStatus === "none") {
        renderContent = <SignInContainer/>
    }
    else {
        renderContent =
            <span>
                {(!props.artworkId || onArtworkEditorPage) ? "" : <Link linkTo={`/artworkEditor/${props.artworkId}`}><EditButton/></Link> }

                <AddArtInputButton history={props.history} />

                <Link linkTo="/settings"><SettingsButton/></Link>

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