export default function(){

    // CROP DATA
    const defaultCropData = { leftPercent: 0, rightPercent: 1, topPercent: 0, bottomPercent: 1 };
    const defaultFrameThickness = 0.04;
    const defaultMountThickness = 0.06;
    const defaultFrameColour = { hue: 96, saturation: 0, lightness: 29 };
    const defaultMountColour = { hue: 96, saturation: 0, lightness: 100 };
    const defaultFrameData = {
        frameThicknessDecimal:defaultFrameThickness,
        mountThicknessDecimal:defaultMountThickness,
        frameColour:defaultFrameColour,
        mountColour:defaultMountColour
    };

    // TITLES
    const title = 'Utopia';
    const artist = "Anon";
    const description = "A seminal work of pivotal importance to humanity. A true masterpiece.";
    const now = new Date();
    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
    const month = monthNames[now.getMonth()].toUpperCase();
    const year = now.getFullYear();

    const date = month + " " + year;
    const defaultTitlesData = {title, artist, description, date};

    // ROOM
    const wallTileUrl = '/images/tiles-wall/brickwall.png';
    const floorTileUrl = '/images/tiles-floor/floor-boards.png';
    const defaultRoomData = {wallTileUrl, floorTileUrl, includeSkirting:true};

    return {
        cropData:defaultCropData,
        frameData:defaultFrameData,
        orientation: 1,
        titlesData: defaultTitlesData,
        roomData: defaultRoomData
    };
};