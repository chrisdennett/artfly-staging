import { createProjectData } from "./editors/EditUtils";

export const getAllProjects = (includeDraftProjects = false) => {
    const allProjects = [
        {
            id: 'framed',
            title: 'Add an Artwork',
            img: '/images/projects/add-artwork-tile-image-290x163.jpg',
            description: "Snap a photo of the art to add it as a Framed Artwork in your Gallery.",
            editData: createProjectData(['imageAdd', 'crop', 'frame', 'label'])
        },
        {
            id: 'pixelPortrait',
            comingSoon: true,
            img: '/images/projects/coming-soon-card-header-pic-290x163.jpg',
            title: 'Make a Pixel Portrait',
            subtitle: 'An Artfly Project',
            description: "Turn your portrait photo into a pixel artwork made from beads (regular or iron), cross-stitch, finger painting or anything else you fancy.",
            editData: createProjectData(['imageAdd', 'crop', 'replacedPalette', 'pixelate'])
        },
        {
            id: 'splitColour',
            isDraft: true,
            title: 'Split Colour Artwork',
            description: "Create an artwork that pulls apart the colour in a picture.",
            editData: createProjectData(['imageAdd', 'crop', 'colourSplitter', 'frame'])
        }
    ];

    if (includeDraftProjects) {
        return allProjects;
    }
    else {
        return allProjects.filter(project => !project.isDraft);
    }
};

