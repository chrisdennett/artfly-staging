import {
    firestoreDb as db,
    storageRef as store,
    storageEvents
} from '../libs/firebaseConfig';

/*
*** USER ************************************************************
*/

// ADD NEW USER
export function fs_addNewUser(authId, newUserData, onAddedCallback = null) {
    db.collection('users')
        .doc(authId)
        .set(newUserData)
        .then(() => {
            if (onAddedCallback) onAddedCallback(authId);
        })
        .catch(function (error) {
            console.log('Add New User failed: ', error);
        })
}

// GET USER LISTENER
export function fs_getUserChanges(userId, onChangeCallback = null) {
    db.collection('users')
        .doc(userId)
        .onSnapshot(doc => {
                if (onChangeCallback) onChangeCallback(doc.data());
            },
            error => {
                console.log("user artist listener error: ", error);
            })

    fs_getUserArtworkChanges(userId);
}

/*
*** ARTIST ***********************************************************
*/

// ADD ARTIST
export function fs_addNewArtist(newArtistData, onChangeCallback = null) {
    db.collection('artists')
        .add(newArtistData)
        .then((docRef) => {
            if (onChangeCallback) onChangeCallback(docRef.id);
        })
        .catch(function (error) {
            console.log('Add New Artist failed: ', error);
        })
}

// GET USER ARTIST CHANGES
export function fs_getUserArtistChanges(userId, onChangeCallback = null) {
    db.collection('artists')
        .where('adminId', '==', userId)
        .onSnapshot(querySnapshot => {
                const changedDocsArr = querySnapshot.docChanges;
                let docAddedOrDeleted = false;
                for (let change of changedDocsArr) {
                    const artistId = change.doc.id;
                    // the function itself will prevent multiple listeners
                    fs_getArtistChanges(artistId, onChangeCallback);

                    // find out if there'll be a new number of artists
                    if (change.type === 'added' || change.type === 'removed') {
                        docAddedOrDeleted = true;
                    }
                }

                // if there's a different number of artists, update totalArtists
                if (docAddedOrDeleted) {
                    const totalArtists = querySnapshot.size;
                    fs_updateUser(userId, { totalArtists });
                }
            },
            error => {
                console.log("user artist listener error: ", error);
            })
}

// UPDATE ARTIST
export function fs_updateArtist(artistId, newData, onChangeCallback = null) {
    db.collection('artists')
        .doc(artistId)
        .update(newData)
        .then(() => {
            if (onChangeCallback) onChangeCallback();
        })
        .catch(function (error) {
            console.log('Update artist failed: ', error);
        })
}

// GET ARTIST CHANGES
let artistListeners = {};

export function fs_getArtistChanges(artistId, onChangeCallback = null) {
    if(!artistId){
        console.log("no artistId: ", artistId);
        return;
    }

    if (artistListeners[artistId]) {
        return "already_running";
    }

    artistListeners[artistId] = db.collection('artists')
        .doc(artistId)
        .onSnapshot(doc => {
                const artistId = doc.id;
                const artistData = doc.data();
                const artistDataWithId = { ...artistData, artistId };

                if (onChangeCallback) onChangeCallback(artistDataWithId);
            },
            (error) => {
                console.log("artist listener error: ", error);
            });
}

/*
*** ARTWORK ***********************************************************
*/

// ADD ARTWORK
export function fs_addArtwork(userId, artistId, imgFile, imgWidth, imgHeight, onChangeCallback = null) {
    // Get artwork database id first so can be used for the filename
    const artworkDatabaseRef = db.collection('artworks').doc();
    const artworkId = artworkDatabaseRef.id;
    // store images in artist directories
    const userPicturesRef = store.child(`userContent/${artistId}/${artworkId}`);
    // start the upload
    const uploadTask = userPicturesRef.put(imgFile);
    // listen for upload events
    uploadTask
        .on(storageEvents.STATE_CHANGED,
            (snapshot) => {
                const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                if (onChangeCallback) onChangeCallback({ progress, artistId, id: artworkId, status: 'uploading' })
            },
            (error) => {
                // A full list of error codes is available at https://firebase.google.com/docs/storage/web/handle-errors
                console.log("uncaught error: ", error);
            },
            () => {
                // Upload completed successfully - save artwork data
                const newArtworkData = {
                    adminId: userId,
                    artistId: artistId,
                    url: uploadTask.snapshot.downloadURL,
                    imgWidth: imgWidth,
                    imgHeight: imgHeight,
                    dateAdded: Date.now()
                };

                artworkDatabaseRef
                    .set(newArtworkData)
                    .then(() => {
                        if (onChangeCallback) {
                            const callBackData = {
                                ...newArtworkData,
                                progress: 100,
                                status: 'complete',
                                artworkId
                            };

                            onChangeCallback(callBackData);
                        }
                    })
                    .catch(function (error) {
                        console.log('Add New Artwork failed: ', error);
                    })
            })
}

// GET ARTIST ARTWORK CHANGES
export function fs_getArtistArtworkChanges(artistId, onChangeCallback = null) {
    db.collection('artworks')
        .where('artistId', '==', artistId)
        .onSnapshot(querySnapshot => {
                const changedDocsArr = querySnapshot.docChanges;
                let docAddedOrDeleted = false;

                for (let change of changedDocsArr) {
                    const artworkId = change.doc.id;
                    fs_getArtworkChanges(artworkId, onChangeCallback);

                    if (change.type === 'added' || change.type === 'removed') {
                        docAddedOrDeleted = true;
                    }
                }

                // if an artwork has been added or removed save the new total
                if (docAddedOrDeleted) {
                    const totalArtworks = querySnapshot.size;
                    fs_updateArtist(artistId, { totalArtworks });
                }
            },
            error => {
                console.log("Artist artwork listener error: ", error);
            })
}

// GET ARTWORK CHANGES
let artworkListeners = {};

export function fs_getArtworkChanges(artworkId, onChangeCallback = null) {
    if (artworkListeners[artworkId]) {
        return "already_running";
    }

    artworkListeners[artworkId] = db.collection('artworks')
        .doc(artworkId)
        .onSnapshot(doc => {
                const artworkId = doc.id;
                const artworkData = doc.data();
                const artworkDataWithId = { [artworkId]: artworkData };

                if (onChangeCallback) onChangeCallback(artworkDataWithId);
            },
            (error) => {
                console.log("artwork changes listener error: ", error);
            });
}

// GET USER ARTWORK CHANGES
let userArtworkListeners = {};

export function fs_getUserArtworkChanges(userId) {
    if (userArtworkListeners[userId]) {
        return "already_running";
    }

    userArtworkListeners[userId] = db.collection('artworks')
        .where('adminId', '==', userId)
        .onSnapshot(querySnapshot => {
                const changedDocsArr = querySnapshot.docChanges;
                let docAddedOrDeleted = false;

                for (let change of changedDocsArr) {
                    if (change.type === 'added' || change.type === 'removed') {
                        docAddedOrDeleted = true;
                    }
                }

                if (docAddedOrDeleted) {
                    const totalArtworks = querySnapshot.size;
                    fs_updateUser(userId, { totalArtworks });
                }
            },
            error => {
                console.log("user artworks listener error: ", error);
            })
}

// UPDATE USER
export function fs_updateUser(userId, newData, onChangeCallback = null) {
    db.collection('users')
        .doc(userId)
        .update(newData)
        .then(() => {
            if (onChangeCallback) onChangeCallback({ [userId]: newData });
        })
        .catch(function (error) {
            console.log('Update user failed: ', error);
        })
}
