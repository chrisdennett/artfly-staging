import React from 'react';
import PaletteButt from "./PaletteButt";
import ItemSelector
    from "../../../components/appControls/itemSelector/ItemSelector";

const PaletteSelector = ({ palettes, palette, onSelect }) => {
    return (
        <ItemSelector
            label={'Palette'}
            items={palettes}
            onSelect={onSelect}
            ItemComponent={PaletteButt}
            selectedData={palette}
        />
    )
};

export default PaletteSelector;
