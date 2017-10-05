import Paddle, { ProductId } from '../libs/paddleConfig';

export const FETCH_LOCAL_PRICE = "fetchLocalPrice";
export const SUBSCRIBE_USER = "subscribeUser";

export function subscribeUser(userId, userEmail) {
    return (dispatch) => {

        dispatch({
            type: SUBSCRIBE_USER,
            payload: "triggered"
        });

        let checkoutSetupData = {};
        checkoutSetupData.product = ProductId;
        checkoutSetupData.passthrough = userId;

        /*if (userEmail) {
            checkoutSetupData.email = userEmail;
        }*/

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

