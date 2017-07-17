import React from "react";
import { Link, Redirect } from 'react-router-dom';

import ArtworkAdderContainer from '../../Settings/ArtworkAdder/ArtworkAdderContainer';

const UserControls = function (props) {
    const { userStatus } = props;
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
                {!props.artworkId ? "" : <Link to={`/artwork-editor/${props.artworkId}`}>EDIT</Link> }

                <ArtworkAdderContainer history={props.history}
                                       galleryId={props.galleryId}/>

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