import React from 'react';
import ItemSelector
    from "../../../components/appControls/itemSelector/ItemSelector";
import PixelTypeButt from "./PixelTypeButt";

const PixelTypeSelector = ({ pixelTypes, currentPixelType, onSelect }) => {
    return (
        <ItemSelector
            label={'Shape'}
            labelWidth={60}
            items={pixelTypes}
            onSelect={onSelect}
            ItemComponent={PixelTypeButt}
            selectedData={currentPixelType}
        />
    )
};

export default PixelTypeSelector;