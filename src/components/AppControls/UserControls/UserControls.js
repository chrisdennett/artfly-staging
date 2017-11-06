// externals
import React from "react";
// components
import SignOutButton from "./assets/SignOutButton";
import SettingsButton from "./assets/SettingsButton";
import EditButton from "../GalleryControls/assets/EditButton";
import SignInContainer from "../../SignIn/SignInContainer";
// import AddArtInputButton from "./assets/AddArtInputButton";
import Link from "../../global/Link";
import history from '../../global/history';
// import SelectPhotoButton from "../../ImageCuttingBoard/assets/SelectPhotoButton";

const UserControls = function (props) {

    // status can be 'pending', 'complete', or 'none'
    const { userStatus, allowEditing } = props;
    // TODO: page name can now be passed into this component
    const currentPath = history.location.pathname;
    const onArtworkEditorPage = currentPath.indexOf("artworkEditor") > -1;
    let renderContent;
    const showEditArtworkButton = allowEditing && !onArtworkEditorPage && props.artworkId;

    if (userStatus === "none") {
        renderContent = <SignInContainer/>
    }
    else {
        renderContent =
            <span>
                {showEditArtworkButton &&
                <Link linkTo={`/artworkEditor/${props.artworkId}`}><EditButton/></Link>
                }

                {/*<SelectPhotoButton onPhotoSelect={this.props.onPhotoSelected}/>*/}
                {/*<AddArtInputButton maxArtworksReached={props.maxArtworksReached}/>*/}

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