export const UPDATE_URL = 'update_Url';

export function UpdateUrl(pathname) {
    return dispatch => {
        dispatch({
            type: UPDATE_URL,
            payload: pathname
        });
    };
}
