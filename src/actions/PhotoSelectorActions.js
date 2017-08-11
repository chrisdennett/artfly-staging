export const NEW_PHOTO_SELECTED = 'newPhotoSelected';
export const CLEAR_PHOTO_SELECTED = 'clearPhotoSelected';

export function selectPhoto(imageFile) {
    return dispatch => {

        dispatch({
            type: NEW_PHOTO_SELECTED,
            payload: imageFile
        });
    }
}

export function clearPhoto() {
    return dispatch => {
        dispatch({
            type: CLEAR_PHOTO_SELECTED,
            payload: null
        });
    }
}


