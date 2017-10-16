import React from 'react';
import Page from "../global/Page";

const WelcomeMessage = () => {
    return (
        <Page title={"Welcome to Artfly"} brightness={58}>

            <h2>Home page</h2>
            <p>When you're logged in, links to your galleries will appear on the Artfly home page.</p>

            <h2>Controls</h2>
            <p>The buttons in the top right of the screen allow you to:</p>
            <ul>
                <li><strong>Add artwork:</strong> Open the camera on a phone or select an picture you've already taken.
                </li>
                <li><strong>Settings:</strong> Add or change artists, subscription information</li>
                <li><strong>Sign out:</strong> When signed out you'll still be able to view galleries and artworks, but you won't be able to add or edit
                    anything until you've signed back in.
                </li>
            </ul>
            <h2>Galleries and Artworks</h2>
            <ul>
                <li>An "Edit artwork" button will appear in the top right when you're logged in and viewing an artwork.</li>
                <li>When you're on a gallery page you'll see controls appear at the bottom of the screen.</li>
                <li>All galleries and artworks are publicly viewable, so just share the links for friends and family to
                    have a look.
                </li>
            </ul>


        </Page>
    )
};

export default WelcomeMessage;