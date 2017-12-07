// externals
import React from "react";
// components
import Link from "../../global/Link";
import history from '../../global/history';
import IconButt from "../../global/IconButt";

const UserControls = function (props) {

    // status can be 'pending', 'complete', or 'none'
    const { userStatus, allowEditing } = props;
    // TODO: page name can now be passed into this component
    const currentPath = history.location.pathname;
    const onArtworkEditorPage = currentPath.indexOf("artworkEditor") > -1;
    const showEditArtworkButton = allowEditing && !onArtworkEditorPage && props.artworkId;

    if (userStatus === "none") return null;

    return (
        <div className='appControls--userControls'>

            <Link linkTo={`/artStudio/`}>
                <IconButt icon={'addArt'} fill={'hsl(250,98%,80%)'} label={'add art'}/>
            </Link>

            {showEditArtworkButton &&
            <Link linkTo={`/artStudio/${props.artworkId}`}>
                <IconButt icon={'editArt'} fill={'hsl(250,98%,80%)'} label={'edit art'}/>
            </Link>
            }

        </div>
    )
};

export default UserControls;