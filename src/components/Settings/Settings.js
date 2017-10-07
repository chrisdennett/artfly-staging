import React from 'react';
import _ from 'lodash';

import './settings.css';
import Butt from "../global/Butt";
import LinkButt from "../global/LinkButt";
import SettingsIcon from '../global/SettingsIcon';
import Page from "../global/Page";
import ArtflyAccountTypes from "../global/ArtflyAccountTypes";

const Settings = function ({ userArtists, newSubscriptionStatus, subscription, price, onSubscribe, onCancelSubscription, onUpdateSubscription }) {

    if(newSubscriptionStatus) console.log("newSubscriptionStatus: ", newSubscriptionStatus);

    let totalArtworks = 0;
    for (let artist of userArtists) {
        totalArtworks += artist.totalArtworks;
    }
    const accountType = !subscription ? 'free' : 'family';
    const maxArtworksAllowed = ArtflyAccountTypes[accountType].maxArtworks;
    let subscriptionButtons;
    const infoStyle = {
        fontSize: 16, margin: '0 0 10px 10px', opacity: 0.9
    };

    if (accountType === 'free') {
        subscriptionButtons = (
            <span>
                <Butt inline={true} size={'small'} label={`Subscribe`} onClick={onSubscribe}/>
                <p style={infoStyle}>
                    (Subscribe for {price} a month to save up to {ArtflyAccountTypes.family.maxArtworks} artworks)
                </p>
            </span>
        )
    }
    else {
        subscriptionButtons = (
            <span>
                <Butt inline={true} size={'small'} onClick={onCancelSubscription} label={`Cancel subscription`}/>
                <Butt inline={true} size={'small'} onClick={onUpdateSubscription} label={`Update subscription`}/>
            </span>
        )
    }


    /*if (subscription.status === 'past_due') {
        subscriptionContent = (
            <div>
                <p>You're a monthly subscriber, but you last payment has failed. We'll try to collect the payment again
                    soon.</p>
                <Butt onClick={onCancelSubscription} label={`Cancel subscription`}/>
                <Butt onClick={onUpdateSubscription} label={`Update subscription`}/>
            </div>
        )
    }
    // if status is deleted
    else if (subscription.status === 'deleted') {
        subscriptionContent = (
            <div>
                <p>You've cancelled your subscription - you can access your account until: {subscription.paidUntil}</p>
                <p>Re-subscribe for {price} a month to save up to 1000 artworks</p>
                <Butt label={`Subscribe`} onClick={onSubscribe}/>
            </div>
        )
    }*/

    return (
        <Page title={'Settings'} icon={<SettingsIcon height={50}/>} hue={168}>

            <section className={'page-main-section'}>
                <h2>Your account</h2>
                <ul>
                    <li>Account type: {!subscription ? 'free' : 'subscriber'} {subscriptionButtons}</li>
                    <li>Total artworks added: {totalArtworks}
                        <p style={infoStyle}>
                            (the limit is {maxArtworksAllowed})
                        </p>
                    </li>
                    <li>Remaining spaces available: {maxArtworksAllowed - totalArtworks}</li>
                </ul>
            </section>

            <section className={'page-main-section'}>
                <h2>Artists</h2>

                <section className={'settings-add-new-artist-section'}>
                    <LinkButt size={'small'} label={'Add New Artist'} linkTo={`/addOrEditArtist/`}/>
                </section>

                <section className={'settings-artists-section'}>
                    {
                        _.map(userArtists, (artistGallery) => {
                            const { artist, id, totalArtworks } = artistGallery;

                            return (
                                <div key={id} style={{ minWidth: '100%' }}>
                                    <ul>
                                        <li><span>First name:</span> {artist.firstName}</li>
                                        <li><span>Last name:</span> {artist.lastName}</li>
                                        <li><span>Total artworks:</span> {totalArtworks}</li>
                                        <li>
                                            <LinkButt inline={true} size={'small'} label={'Open Gallery'}
                                                      linkTo={`/gallery/${id}`}/>
                                            <LinkButt inline={true} size={'small'} label={'Edit Artist'}
                                                      linkTo={`/addOrEditArtist/${id}`}/>
                                        </li>
                                    </ul>
                                </div>)
                        })
                    }
                </section>
            </section>
        </Page>
    )
};

export default Settings;

/*
return (
        <div className={'settings'}>

            <div className={'page-title'}>
                <h1><SettingsIcon height={50}/> Settings</h1>
            </div>

            <div className={'settings-content'}>

                <section className={'page-main-section'}>
                    <h2>Subscription</h2>
                    {subscriptionContent}
                </section>

                <section className={'page-main-section'}>
                    <h2>Artists</h2>

                    <section className={'settings-add-new-artist-section'}>
                        <LinkButt label={'Add New Artist'} linkTo={`/addOrEditArtist/`}/>
                    </section>

                    <section className={'settings-artists-section'}>
                        {
                            _.map(userArtists, (artistGallery) => {
                                const { artist, id, totalArtworks } = artistGallery;

                                return (
                                    <div key={id} className={"settings-artist"}>
                                        <p><span className={'form-field'}>First name:</span> {artist.firstName}
                                        </p>
                                        <p><span className={'form-field'}>Last name:</span> {artist.lastName}</p>
                                        <p><span className={'form-field'}>Total artworks:</span> {totalArtworks}
                                        </p>
                                        <div className={'settings-artist-buttons'}>
                                            <LinkButt label={'Open Gallery'} linkTo={`/gallery/${id}`}/>
                                            <LinkButt label={'Edit Artist'} linkTo={`/addOrEditArtist/${id}`}/>
                                        </div>
                                    </div>)
                            })
                        }
                    </section>
                </section>
            </div>
        </div>
    )
*/