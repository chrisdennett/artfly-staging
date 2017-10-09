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

const Settings = function ({ maxArtworksReached, totalArtworks, userArtists, newSubscriptionStatus, subscription, ...rest }) {

    if(newSubscriptionStatus) console.log("newSubscriptionStatus: ", newSubscriptionStatus);

    const accountType = !subscription ? 'free' : 'family';
    const maxArtworksAllowed = ArtflyAccountTypes[accountType].maxArtworks;

    return (
        <Page title={'Settings'} icon={<SettingsIcon height={50}/>} hue={168}>

            <AccountLimitWarningMessage maxArtworksReached={maxArtworksReached}/>

            <section className={'page-main-section'}>
               <AccountSettings artflyAccountTypes={ArtflyAccountTypes} maxArtworksAllowed={maxArtworksAllowed} subscription={subscription} accountType={accountType} totalArtworks={totalArtworks} {...rest}/>
            </section>

            <section className={'page-main-section'}>
                <ArtistsSettings userArtists={userArtists}/>
            </section>
        </Page>
    )
};

export default Settings;