import React from 'react';
import IconButt from "../global/Butt/IconButt";
import Page from "../global/Page";

const ColourBlock = (hue, decrement, isSelected=false) => {
    const saturation = 98;
    const lightness = 80;

    const light = `hsl(${hue},${saturation}%,${lightness}%)`;
    const medium = `hsl(${hue},${saturation-(decrement*2)}%,${lightness-decrement}%)`;
    // const dark = `hsl(${hue},${saturation-(decrement*4)}%,${lightness-(decrement*4)}%)`;
    const dark = `hsl(${hue},${saturation-(decrement*7)}%,${lightness-(decrement*5)}%)`;

    const blockStyle = {height: 50, width: 160 };
    const b1 = {...blockStyle, backgroundColor:light};
    const b2 = {...blockStyle, backgroundColor:medium};
    const b3 = {...blockStyle, backgroundColor:dark, color:light};

    const label = isSelected ? `**${hue}**` : hue;

    return (
        <div key={hue} style={{display: 'inline-block', marginBottom: 20}}>
            <p style={{textAlign: 'center'}}>{label}</p>
            <div style={b1}>{light}</div>
            <div style={b2}>{medium}</div>
            <div style={b3}>{dark}</div>
        </div>
    )
};

/*const InkscapeConverter = (inkH, inkS, inkB) => {
    const h = Math.round((inkH / 255) * 300);
    const s = Math.round((inkH / 255) * 100);
    const l = Math.round((inkB / 255) * 100);

    return `h:${h}, s:${s}, l:${l}`;
};*/

const StyleGuide = () => {

    // values I like from trial and error
    const huesILike = [0,12,24,50,84,105,144,162,185,200,212,225,250,275,300];

    // inkscape values
    // const yellow = InkscapeConverter(41,250,203);
    // const purple = InkscapeConverter(181,250,186);

    const decrement = 10;

    let blocksILike = [];
    for(let i=0; i<huesILike.length; i++){
        blocksILike.push(ColourBlock(huesILike[i], decrement))
    }

    let allBlocks = [];
    const hueIncrement = 1;
    for(let i=0; i<=300; i+= hueIncrement){
        const isSelected = huesILike.indexOf(i) > 0;
        allBlocks.push(ColourBlock(i, decrement, isSelected));
    }

    return (
        <Page title={'Style Guide'} style={{ paddingTop: 100 }}>
            <h2>Buttons</h2>
            <IconButt icon={'logo'} stroke={'#000'} label={'logo'}/>
            <IconButt icon={'home'} stroke={'#000'} label={'home'}/>
            <IconButt icon={'editArt'} label={'edit art'}/>
            <IconButt icon={'addArt'} label={'add art'}/>
            <IconButt icon={'settings'} label={'selected'} isSelected={true}/>
            <IconButt icon={'signIn'} label={'sign in'} />
            <IconButt icon={'signOut'} label={'sign out'} />

            <h2>Blocks I like</h2>
            {blocksILike}
            <hr/>
            <h2>All blocks</h2>
            {allBlocks}
        </Page>
    )
};

export default StyleGuide;