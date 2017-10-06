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

        checkoutSetupData.successCallback = (data) => {
            dispatch({
                type: SUBSCRIBE_USER,
                payload: "success"
            })
        };

        checkoutSetupData.closeCallback = (data) => {
            dispatch({
                type: SUBSCRIBE_USER,
                payload: "cancelled"
            })
        };

        Paddle.Checkout.open(checkoutSetupData);
    }
}

export function cancelSubscription(updateUrl) {
    return (dispatch) => {
        dispatch({
            type: CANCEL_SUBSCRIPTION,
            payload: "triggered"
        });

        let checkoutSetupData = {};
        checkoutSetupData.override = updateUrl;

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
            const localPrice = prices.price.gross || '[...]';
            dispatch({
                type: FETCH_LOCAL_PRICE,
                payload: localPrice
            });
        });
    }
}

