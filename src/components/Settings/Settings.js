import React from 'react';

import './settings.css';

import { Link } from 'react-router-dom'
import _ from 'lodash';

const Settings = function ({ userArtists, subscription, price, onSubscribe, onCancelSubscription, onUpdateSubscription }) {
    let subscriptionContent;

    // if subscription is undefined show a subscribe button
    if (!subscription) {
        subscriptionContent = (
            <div>
                <p>Subscribe for {price} a month to save up to 1000 artworks</p>
                <button onClick={onSubscribe}>Subscribe</button>
            </div>
        )
    }
    // if the subscription is active it's an ongoing paid up subscription
    else if (subscription.status === 'active') {
        subscriptionContent = (
            <div>
                <p>You're a monthly subscriber</p>
                <button onClick={onCancelSubscription}>Cancel subscription</button>
                <button onClick={onUpdateSubscription}>Update subscription</button>
            </div>
        )
    }
    // if status is past_due it means their payment has failed.
    else if (subscription.status === 'past_due') {
        subscriptionContent = (
            <div>
                <p>You're a monthly subscriber, but you last payment has failed. We'll try to collect the payment again
                    soon.</p>
                <button onClick={onCancelSubscription}>Cancel subscription</button>
                <button onClick={onUpdateSubscription}>Update subscription</button>
            </div>
        )
    }
    // if status is deleted
    else if (subscription.status === 'deleted') {
        subscriptionContent = (
            <div>
                <p>You've cancelled your subscription - you can access your account until: {subscription.paidUntil}</p>
                <p>Subscribe for {price} a month to save up to 1000 artworks</p>
                <button className={'butt'} onClick={onSubscribe}>Subscribe</button>
            </div>
        )
    }

    return (
        <div className={'settings'}>
            <h1>Settings</h1>

            <section className={'settings-subscription-section'}>
                <h2>Subscription</h2>
                {subscriptionContent}
            </section>

            <section>
                <h2>Artists</h2>
                <section className={'settings-add-new-artist-section'}>
                    <Link className={'butt'} to={`/add-or-edit-artist/`}>Add New Artist</Link>
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
                                        <Link className={'butt'} to={`/gallery/${id}`}>Open Gallery</Link>
                                        <Link className={'butt'} to={`/add-or-edit-artist/${id}`}>Edit
                                            Artist</Link>
                                    </div>
                                </div>)
                        })
                    }
                </section>
            </section>


        </div>
    )
};

export default Settings;