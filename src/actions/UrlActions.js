export const UPDATE_URL = 'update_Url';

export function UpdateUrl(pathname, notes) {
    return dispatch => {
       /* if(notes){
            console.log("notes: ", notes);
        }
        else{
            console.log("no notes.................");
        }*/

        dispatch({
            type: UPDATE_URL,
            payload: pathname
        });
    };
}
