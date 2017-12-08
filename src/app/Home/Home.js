// externals
import React from "react";
// styles
import './homeStyles.css';
// components
import Title from "./UserHome/assets/Title";
import Page from "../global/Page";
import SignInOut from '../SignInOut/SignInOut';
import PublicHome from "./PublicHome/PublicHome";
import UserHome from "./UserHome/UserHome";

const Home = ({ user }) => {
    const userLoggedIn = user && user.loginStatus === 'loggedIn';

    return (
        <Page>
            <div className='home--heading'>
                <div>
                    <Title/>
                </div>
                <div className='home--tagLine'>Artworks don't belong in a drawer, bin or hard drive. <br/>There's a
                    better
                    place...
                </div>

                <div className='home--signInOut'>
                    <SignInOut/>
                </div>

            </div>

            {userLoggedIn &&
            <UserHome/>
            }

            {!userLoggedIn &&
            <PublicHome/>
            }


            <div className='home--footer'>
                <h3>About us</h3>
                <div className='home--footer--p'>
                    ArtFly is a massive global corporate monster run by the high-powered business types below from
                    the sprawling metroplis of Ulverson, Cumbria, UK.
                </div>
                <div className='home--footer--personTile'>
                    Chris
                </div>
                <div className='home--footer--personTile'>
                    Jennie
                </div>
                <div className='home--footer--personTile'>
                    Holly
                </div>
                <div className='home--footer--personTile'>
                    Dot
                </div>
            </div>
        </Page>
    );
};

export default Home;
