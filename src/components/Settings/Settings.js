import React from 'react';
import _ from 'lodash';

import './settings.css';
import Butt from "../global/Butt";
import LinkButt from "../global/LinkButt";

const Settings = function ({ userArtists, subscription, price, onSubscribe, onCancelSubscription, onUpdateSubscription }) {
    let subscriptionContent;

    // if subscription is undefined show a subscribe button
    if (!subscription) {
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
        <div className={'settings'}>
            <div className={'settings-content'}>
                <h1>Settings</h1>

                <section className={'settings-subscription-section'}>
                    <h2>Subscription</h2>
                    {subscriptionContent}
                </section>

                <section>
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
};

export default Settings;