import React from 'react';
import _ from 'lodash';

import './settings.css';
import Butt from "../global/Butt";
import LinkButt from "../global/LinkButt";
import SettingsIcon from '../global/SettingsIcon';
import Page from "../global/Page";

const Settings = function ({ userArtists, newSubscriptionStatus, subscription, price, onSubscribe, onCancelSubscription, onUpdateSubscription }) {
    let subscriptionContent;

    console.log("newSubscriptionStatus: ", newSubscriptionStatus);

    // if subscription is undefined show a subscribe button
    if(newSubscriptionStatus === "triggered"){
        subscriptionContent = <p>Hopefully there's a pop-up with instructions to follow...</p>
    }
    else if (!subscription && newSubscriptionStatus !== "success") {
        subscriptionContent = (
            <div>
                <p>Subscribe for {price} a month to save up to 1000 artworks</p>
                <Butt label={`Subscribe`} onClick={onSubscribe}/>
            </div>
        )
    }
    // if the subscription is active it's an ongoing paid up subscription
    else if (subscription.status === 'active') {
        subscriptionContent = (
            <div>
                <p>You're a monthly subscriber</p>
                <Butt onClick={onCancelSubscription} label={`Cancel subscription`}/>
                <Butt onClick={onUpdateSubscription} label={`Update subscription`}/>
            </div>
        )
    }
    else if(newSubscriptionStatus !== "success"){
        subscriptionContent = <p>Setting things up. Should be done in a mo...</p>
    }
    // if status is past_due it means their payment has failed.
    else if (subscription.status === 'past_due') {
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
    }

    return (
        <Page title={'Settings'} icon={<SettingsIcon height={50}/>} hue={168}>
            <section className={'page-main-section'}>
                <h2>Subscription</h2>
                {subscriptionContent}
            </section>

            <section className={'page-main-section'}>
                <h2>Artists</h2>

                <section className={'settings-add-new-artist-section'}>
                    <LinkButt label={'Add New Artist'} linkTo={`/add-or-edit-artist/`}/>
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
                                        <LinkButt label={'Edit Artist'} linkTo={`/add-or-edit-artist/${id}`}/>
                                    </div>
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
                        <LinkButt label={'Add New Artist'} linkTo={`/add-or-edit-artist/`}/>
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
                                            <LinkButt label={'Edit Artist'} linkTo={`/add-or-edit-artist/${id}`}/>
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