// properties are the paddle subscription checkout product IDs
// https://vendors.paddle.com/subscriptions/plans
// local price is retrieved from paddle.  These prices are here as a fallback if Paddle API doesn't break

const membershipPlans = {
    free:{
        planName: 'Free',
        maxArtworks: 7,
        price: '£0',
        maxArtists: 2
    },
    516947:{
        planName:'Individual',
        maxArtworks: 500,
        price: '£1.85',
        maxArtists: 1
    },
    533578:{
        planName:'Family',
        maxArtworks: 1000,
        price: '£2.85',
        maxArtists: 8
    },
    518909:{
        planName:'School',
        maxArtworks: 5000,
        price: '£5.85',
        maxArtists: 42
    }
};

export default membershipPlans;