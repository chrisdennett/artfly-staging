import React from 'react';
import { Link } from 'react-router-dom'
import _ from 'lodash';
import PropTypes from 'prop-types';

const Settings = function ({ artistGalleries, userId, subscription, userEmail }) {
    let subscriptionContent;
    const productId = "516947";
    let checkoutRef = `https://pay.paddle.com/checkout/${productId}?passthrough=${userId}`;
    if (userEmail) {
        checkoutRef += `&guest_email=${userEmail}`;
    }

    // if subscription is undefined show a subscribe button
    if (!subscription) {
        subscriptionContent = (
            <div>
                <p>Subscribe for £2.75 a month to save up to 1000 artworks</p>
                <a href={checkoutRef} target="_blank">Subscribe</a>
            </div>
        )
    }
    // if the subscription is active it's an ongoing paid up subscription
    else if(subscription.status === 'active') {
        subscriptionContent = (
            <div>
                <p>You're a monthly subscriber - next payment will be taken on: {subscription.paidUntil}</p>
                <a href={subscription.cancelUrl} target="_blank">Cancel subscription</a>
                <a href={subscription.updateUrl} target="_blank">Update subscription</a>
            </div>
        )
    }
    // if status is past_due it means their payment has failed.
    else if(subscription.status === 'past_due') {
        subscriptionContent = (
            <div>
                <p>You're a monthly subscriber, but you last payment has failed. We'll try to collect the payment again soon.</p>
                <a href={subscription.cancelUrl} target="_blank">Cancel subscription</a>
                <a href={subscription.updateUrl} target="_blank">Update subscription</a>
            </div>
        )
    }
    // if status is deleted
    else if(subscription.status === 'deleted') {
        subscriptionContent = (
            <div>
                <p>You've cancelled your subscription - you can access your account until: {subscription.paidUntil}</p>
                <a href={checkoutRef} target="_blank">Re-subscribe</a>
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

Settings.propTypes = {
    artistGalleries: PropTypes.arrayOf(
        PropTypes.shape(
            {
                id: PropTypes.string.isRequired,
                artist: PropTypes.shape(
                    {
                        name: PropTypes.string
                    }
                ),
                gallery: PropTypes.shape({
                    name: PropTypes.string
                })
            }
        )
    ).isRequired
};

export default Settings;