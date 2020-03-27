import React from 'react';

const PaletteButt = ({data:palette}) => {
    return (
        <div style={{ display: 'flex', border: 'solid 1px rgba(0,0,0,0.2)' }}>
            {
                palette.colours.map((col, index) => {
                    return <div key={index} style={{
                        width: 20,
                        height: 30,
                        backgroundColor: `rgb(${col.r}, ${col.g}, ${col.b})`
                    }}
                    />
                })
            }
        </div>
    )
};

export default PaletteButt;