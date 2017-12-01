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
            <div className="controls-block controls-block-user">

                {showEditArtworkButton &&
                <Link linkTo={`/artStudio/${props.artworkId}`}>
                    <IconButt icon={'editArt'} fill={'hsl(250,98%,80%)'} label={'edit art'}/>
                </Link>
                }

                <Link linkTo={`/artStudio/`}>
                    <IconButt icon={'addArt'} fill={'hsl(250,98%,80%)'} label={'add art'}/>
                </Link>

                <Link linkTo="/settings">
                    <IconButt icon={'settings'} fill={'hsl(250,98%,80%)'} label={'settings'}/>
                </Link>

                <IconButt icon={'signOut'} fill={'hsl(250,98%,80%)'} label={'sign out'} onClick={props.logout}/>
            </div>
    }

    return renderContent
};

export default UserControls;