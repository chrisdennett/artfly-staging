import { generateUID } from "../components/global/UTILS";
import { allEditTypes } from "../EDITS";

// projects
export const createProjectData = (editSequence) => {
    const { editOrder, edits } = createDefaultEdits({ editTypes: editSequence });

    return {
        editOrder,
        edits
    }
};

// create edit sequence
export const createDefaultEdits = ({ editTypes }) => {
    const editOrder = [];
    const edits = {};

    for (let i = 0; i < editTypes.length; i++) {
        const type = editTypes[i];
        // adding i to ensure two edits of the same time
        // have unique ids
        const editId = `${type}_${i}`;
        editOrder.push(editId);
        edits[editId] = getNewEditData(type, editId);
    }

    return { editOrder, edits }
};

// get new edit default
export const getNewEditData = (type, id) => {
    const editId = id ? id : generateUID();
    const { defaults, name } = allEditTypes[type];

    return {
        key: editId,
        type: type,
        name: name,
        ...defaults
    }
};

// all edits
export const getAllEditOptions = () => {
    // all edits except imageAdd for now.
    const allEditNames = Object.keys(allEditTypes).filter(key => key !== 'imageAdd' && !allEditTypes[key].draft);
    const allEditsData = createDefaultEdits({ editTypes: allEditNames });
    return allEditsData.edits;
};

export const getOrderedEditArray = (editsObject, editOrder) => {
    const orderedArray = editOrder.map(key => {
        return { ...editsObject[key], key };
    });

    orderedArray.sort((a, b) => a.order - b.order);
    return orderedArray;
};
