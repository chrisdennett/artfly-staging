import React from 'react';
import { Link } from 'react-router-dom'
import _ from 'lodash';

const Settings = function ({ artistGalleries, subscription, price, onSubscribe, onCancelSubscription, onUpdateSubscription }) {
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
    else if(subscription.status === 'active') {
        subscriptionContent = (
            <div>
                <p>You're a monthly subscriber</p>
                <button onClick={onCancelSubscription}>Cancel subscription</button>
                <button onClick={onUpdateSubscription}>Update subscription</button>
            </div>
        )
    }
    // if status is past_due it means their payment has failed.
    else if(subscription.status === 'past_due') {
        subscriptionContent = (
            <div>
                <p>You're a monthly subscriber, but you last payment has failed. We'll try to collect the payment again soon.</p>
                <button onClick={onCancelSubscription}>Cancel subscription</button>
                <button onClick={onUpdateSubscription}>Update subscription</button>
            </div>
        )
    }
    // if status is deleted
    else if(subscription.status === 'deleted') {
        subscriptionContent = (
            <div>
                <p>You've cancelled your subscription - you can access your account until: {subscription.paidUntil}</p>
                <p>Subscribe for {price} a month to save up to 1000 artworks</p>
                <button onClick={onSubscribe}>Subscribe</button>
            </div>
        )
    }

    return (
        <div>
            <h1>Settings</h1>
            <hr/>
            <h2>Subscription:</h2>

            {subscriptionContent}

            <hr/>
            <Link to={`/add-or-edit-artist/`}>Add New Artist</Link>
            {
                _.map(artistGalleries, (artistGallery) => {
                    const { artist, gallery, id, totalArtworks } = artistGallery;

                    return (
                        <div key={id}>
                            <h2>{gallery.name}</h2>
                            <p>Artist: {artist.name}</p>
                            <p>Artist biog: {artist.biog}</p>
                            <p>Total artworks: {totalArtworks}</p>
                            <Link to={`/gallery/${id}`}>Open Gallery</Link>
                            <Link to={`/add-or-edit-artist/${id}`}>Edit Artist Gallery</Link>
                        </div>)
                })
            }
        </div>
    )
};

export default Settings;