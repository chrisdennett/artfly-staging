import {
    SAVING_ARTWORK_TRIGGERED, SAVING_ARTWORK_PROGRESS,
    SAVING_ARTWORK_COMPLETE, SAVING_ARTWORK_CLEAR_PROGRESS
} from '../actions/SaveArtworkActions';

const initialData = {
    status: 'dormant',
    artworkId: null,
    source: 0,
    large: 0,
    thumb: 0
};

export default function (state = initialData, action) {
    switch (action.type) {

        case SAVING_ARTWORK_TRIGGERED:
            return { ...state, status: 'triggered' };

        case SAVING_ARTWORK_PROGRESS:
            const { key, progress } = action.payload;
            return { ...state, [key]: progress, status: 'saving' };

        case SAVING_ARTWORK_COMPLETE:
            return { ...state, status: 'complete', artworkId: action.payload };

        case SAVING_ARTWORK_CLEAR_PROGRESS:
            return initialData;

        default:
            return state;
    }
}

/*
{
    source:{
        label: 'Source Image',
        progress
    },
    thumb:{
        label: 'Thumbnail Image',
        progress
    },
    large:{
        label: 'Artwork Image',
        progress
    },
    artworkId: artworkId,
    artworkData: {
        artworkId: {}
    }
}

*/