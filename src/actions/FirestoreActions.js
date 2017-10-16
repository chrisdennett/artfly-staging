import { firestoreDb as db, storageRef as store, storageEvents } from '../libs/firebaseConfig';

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
        })
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
            for (let change of changedDocsArr) {
                const artistId = change.doc.id;
                // the function itself will prevent multiple listeners
                fs_getArtistChanges(artistId, onChangeCallback);
            }
        }, error => {
            console.log("user artist listener error: ", error);
        })
}

// GET ARTIST CHANGES
let artistListeners = {};

export function fs_getArtistChanges(artistId, onChangeCallback = null) {
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
        });
}

/*
*** ARTWORK ***********************************************************
*/

// ADD ARTWORK
export function fs_addArtwork(artistId, imgFile, onChangeCallback = null) {
    // Get artwork database id first so can be used for the filename
    const artworkDatabaseRef = db.collection('artworks').doc();
    const artworkId = artworkDatabaseRef.id;
    // store images in artist directories
    const userPicturesRef = store.child(`userContent/${artistId}/${artworkId}`);

    console.log("`userContent/${artistId}/${artworkId}`: ", `userContent/${artistId}/${artworkId}`);

    // start the upload
    const uploadTask = userPicturesRef.put(imgFile);

    // listen for upload events
    uploadTask
        .on(storageEvents.STATE_CHANGED,
            (snapshot) => {
                const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                if (onChangeCallback) onChangeCallback({ progress, status: 'uploading' })
            },
            (error) => {
                // A full list of error codes is available at
                // https://firebase.google.com/docs/storage/web/handle-errors
                console.log("uncaught error: ", error);
            },
            () => {
                // Upload completed successfully - save artwork data
                const dateStamp = Date.now();
                if (onChangeCallback) onChangeCallback(
                    {
                        progress: 100,
                        downloadURL: uploadTask.snapshot.downloadURL,
                        dateStamp,
                        status: 'complete'
                    }
                )
            })
}

// GET ARTIST ARTWORK CHANGES
export function fs_getArtistArtworkChanges(artistId, onChangeCallback = null) {
    db.collection('artworks')
        .where('artistId', '==', artistId)
        .onSnapshot(querySnapshot => {
            const changedDocsArr = querySnapshot.docChanges;

            // if(changedDocsArr)

            for (let change of changedDocsArr) {
                const artworkId = change.doc.id;
                const artworkData = change.doc.data();
                // TODO: Standardise how the id is passed back - this way seems reasonable because it can be used in a reducer spread operator
                const artworkDataWithId = { [artworkId]: artworkData };

                if (onChangeCallback) onChangeCallback(artworkDataWithId);
            }

        })
}