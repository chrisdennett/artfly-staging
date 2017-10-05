import Paddle, {ProductId} from '../libs/paddleConfig';

export const FETCH_LOCAL_PRICE = "fetchLocalPrice";

export function fetchLocalPrice(){
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