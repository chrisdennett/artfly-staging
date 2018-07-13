//https://paddle.com/docs/paddlejs-localized-prices/
import Paddle, { ProductId } from '../libs/paddleConfig';

export const FETCH_LOCAL_PRICE = "fetchLocalPrice";
export const SUBSCRIBE_USER = "subscribeUser";
export const UPDATE_SUBSCRIPTION = "updateSubscription";
export const CANCEL_SUBSCRIPTION = "cancelSubscription";

export function subscribeUser(userId) {
    return (dispatch) => {

        dispatch({
            type: SUBSCRIBE_USER,
            payload: "triggered"
        });

        let checkoutSetupData = {};
        checkoutSetupData.product = ProductId;
        checkoutSetupData.passthrough = userId;
        // removed to allow users to chose their own email.
        // checkoutSetupData.email = email;

        //Paddle success data is like this:
        /*
        {
            "checkout": {
                "completed": true,
                "id": "4451433-chrd10623c1cbd5-c8d37ad479",
                "coupon": null,
                "prices": {
                    "customer": {
                        "currency": "USD",
                        "unit": "9.99",
                        "total": "9.99"
                    },
                    "vendor": {
                        "currency": "USD",
                        "unit": "9.99",
                        "total": "9.99"
                    }
                },
                "passthrough": null,
                "redirect_url": null
            },
            "product": {
                "quantity": 1,
                "id": "1234567",
                "name": "My Product"
            },
            "user": {
                "country": "GB",
                "email": "christian@paddle.com",
                "id": "29777"
            }
        }
        */

        checkoutSetupData.successCallback = () => {
            dispatch({
                type: SUBSCRIBE_USER,
                payload: "success"
            })
        };

        checkoutSetupData.closeCallback = () => {
            dispatch({
                type: SUBSCRIBE_USER,
                payload: "cancelled"
            })
        };

        Paddle.Checkout.open(checkoutSetupData);
    }
}

export function cancelSubscription(cancelUrl) {
    return (dispatch) => {
        dispatch({
            type: CANCEL_SUBSCRIPTION,
            payload: "triggered"
        });

        let checkoutSetupData = {};
        checkoutSetupData.override = cancelUrl;

        Paddle.Checkout.open(checkoutSetupData);
    }
}

export function updateSubscription(updateUrl) {

    return (dispatch) => {
        dispatch({
            type: UPDATE_SUBSCRIPTION,
            payload: "triggered"
        });

        let checkoutSetupData = {};
        checkoutSetupData.override = updateUrl;

        Paddle.Checkout.open(checkoutSetupData);
    }
}

export function fetchLocalPrice() {
    return (dispatch) => {

        dispatch({
            type: FETCH_LOCAL_PRICE,
            payload: "..."
        });

        Paddle.Product.Prices(ProductId, (prices) => {
            // console.log("prices: ", prices);
            // const localPrice = prices.price.gross || '[...]';
            dispatch({
                type: FETCH_LOCAL_PRICE,
                payload: prices.price
            });
        });
    }
}

