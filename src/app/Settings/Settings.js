// externals
import React from 'react';
// styles
import './settings.css';
// components
import SettingsIcon from '../global/SettingsIcon';
import Page from "../global/Page";
import ArtflyAccountTypes from "../global/ArtflyAccountTypes";
import ArtistsSettings from "./assets/ArtistsSettings";
import AccountSettings from "./assets/AccountSettings";
import AccountLimitWarningMessage from "./assets/AccountLimitWarningMessage";
import LoginSettings from "./assets/LoginSettings";

const Settings = function ({ planName, maxArtworks, maxArtworksReached, totalArtworks,
                               userArtists, newSubscriptionStatus, subscription, signOutUser, ...rest }) {

    if(newSubscriptionStatus) console.log("newSubscriptionStatus: ", newSubscriptionStatus);

    return (
        <Page title={'Settings'} icon={<SettingsIcon height={50}/>}>

            <LoginSettings signOutUser={signOutUser} />

            <AccountLimitWarningMessage maxArtworksReached={maxArtworksReached}/>

            <section className={'page-main-section'}>
               <AccountSettings artflyAccountTypes={ArtflyAccountTypes} maxArtworks={maxArtworks} subscription={subscription} accountType={planName} totalArtworks={totalArtworks} {...rest}/>
            </section>

            <section className={'page-main-section'}>
                <ArtistsSettings userArtists={userArtists}/>
            </section>
        </Page>
    )
};

export default Settings;