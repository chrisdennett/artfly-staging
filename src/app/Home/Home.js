// externals
import React from "react";
// styles
import './homeStyles.css';
// components
import {IN_BETA_TESTING} from '../global/GLOBAL_CONSTANTS';
import Title from "./Title";
import SignInOut from '../SignInOut/SignInOut';
import PublicHome from "./PublicHome/PublicHome";
import UserHome from "./UserHome/UserHome";
import Flooring from "../global/flooring/Flooring";

const Home = ({ user }) => {
    const userLoggedIn = user && user.loginStatus === 'loggedIn';

    return (
        <div>
            <div className='home--heading'>
                <div>
                    <Title/>
                </div>
                <div className='home--tagLine'>Artworks don't belong in a drawer, bin or hard drive. <br/>There's a
                    better
                    place...
                </div>

                {!IN_BETA_TESTING &&
                <div className='home--signInOut'>
                    <SignInOut/>
                </div>
                }

            </div>

            {userLoggedIn &&
            <UserHome/>
            }

            {!userLoggedIn &&
            <PublicHome/>
            }

            <Flooring>
                <h3>About us</h3>
                <div className='home--footer--p'>
                    ArtFly is a massive global corporate monster run by the high-powered business types below from
                    the sprawling metropolis of Ulverson, Cumbria, UK.
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
            </Flooring>
        </div>
    );
};

export default Home;
