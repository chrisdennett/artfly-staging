// properties are the paddle subscription checkout product IDs
// https://vendors.paddle.com/subscriptions/plans
// local price is retrieved from paddle.  These prices are here as a fallback if Paddle API doesn't break

const membershipPlans = {
    free:{
        planName: 'Free',
        isPaidPlan: false,
        maxArtworks: 7,
        price: '£0',
        maxArtists: 2
    },
    516947:{
        planName:'Artfly Creator',
        isPaidPlan: true,
        maxArtworks: 250,
        price: '£1.85',
        maxArtists: 1
    }
};

export default membershipPlans;

/*
    533578:{
        planName:'Family',
        isPaidPlan: true,
        maxArtworks: 1000,
        price: '£2.85',
        maxArtists: 8
    },
    518909:{
        planName:'School',
        isPaidPlan: true,
        maxArtworks: 5000,
        price: '£5.85',
        maxArtists: 42
    }
*/