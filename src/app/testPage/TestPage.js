import React from 'react';
import ArtworkAdderSavingProgress from "../artworkAdder/ArtworkAdderSavingProgress";
import AppBar from "../appBar/AppBar";
import ArtworkAdderComplete from "../artworkAdder/ArtworkAdderComplete";

const TestPage = () => {
    return (
        <TestArtworkAdderComplete />
    )
};

export default TestPage;

//<TestArtworkAdderComplete />
const TestArtworkAdderComplete = () => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
            <AppBar title={'Artwork Added'} fixed={false} showUserMenu={false} showCloseButt={true}/>

            <ArtworkAdderComplete newArtworkId={'8PwGYWC6r1gNHvZuE3HN'}/>
        </div>
    )
};


//<TestArtworkAdderSavingProgress />
const TestArtworkAdderSavingProgress = () => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
            <AppBar title={'Saving...'} fixed={false} showUserMenu={false} showCloseButt={true}/>

            <ArtworkAdderSavingProgress artworkSavingProgress={data2}/>
        </div>
    )
};

const data1 = {
    status: 'triggered',
    artworkId: null,
    source: 1,
    thumb: 0.8,
    large: 0.2
};

const data2 = {
    status: 'complete',
    artworkId: '1uSGOV4jUj2gVuqQxBnR',
    source: 1,
    thumb: 0.8,
    large: 0.2
};