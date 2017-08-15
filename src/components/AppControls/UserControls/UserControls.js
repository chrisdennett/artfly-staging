import React from "react";
import { Link, Redirect } from 'react-router-dom';

import PhotoSelector from '../../PhotoSelector/PhotoSelector';

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
        renderContent = <button onClick={props.login}>Sign up / Log in</button>
    }
    else {
        renderContent =
            <span>
                {(!props.artworkId || onArtworkEditorPage) ? "" : <Link to={`/artwork-editor/${props.artworkId}`}>EDIT</Link> }

                <PhotoSelector history={props.history} />

                <Link to="/settings">Settings</Link>

                <button onClick={props.logout}>Log out</button>
            </span>
    }

    return (
        <div className="controls-block controls-block-user">
            {renderContent}
        </div>
    )
};

export default UserControls;