// externals
import React from "react";
// components
import SignInContainer from "../../SignIn/SignInContainer";
import Link from "../../global/Link";
import history from '../../global/history';
import IconButt from "../../global/IconButt";

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
                <Link linkTo={`/artStudio/${props.artworkId}`}>
                    <IconButt icon={'editArt'} label={'edit art'}/>
                </Link>
                }

                <Link linkTo={`/artStudio/`}>
                    <IconButt icon={'addArt'} label={'add art'}/>
                </Link>

                <Link linkTo="/settings">
                    <IconButt icon={'settings'} label={'settings'}/>
                </Link>

                <IconButt icon={'signOut'} label={'sign out'} onClick={props.logout}/>
            </span>
    }

    return (
        <div className="controls-block controls-block-user">
            {renderContent}
        </div>
    )
};

export default UserControls;