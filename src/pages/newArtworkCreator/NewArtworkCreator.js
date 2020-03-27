import React, { Component } from "react";
import { connect } from 'react-redux';
// styles
import './newArtworkCreator_styles.css';
// selectors
import { getDeleteAfterDate, getMaxArtworksAllowed, getTotalUserArtworks } from "../../selectors/Selectors";
// actions
import { addNewArtwork } from "../../actions/SaveArtworkActions";
import { UpdateUrl } from "../../actions/UrlActions";
// helpers
import { loadImage } from "../../components/global/UTILS";
// comps
import LoadingThing from "../../components/loadingThing/LoadingThing";
import { TempScreenAppBar } from "../../components/appBar/AppBar";
import MaximumArtworksReached from "./maximumArtworksReached/MaximumArtworksReached";
import { createOrientatedCanvas } from "../../editors/canvasCreators";
import NewArtworkCreatorCard from "./NewArtworkCreatorCard";
import { getAllProjects } from "../../PROJECTS";

class NewArtworkCreator extends Component {

    constructor(props) {
        super(props);

        this.state = { projects: getAllProjects() };

        this.onCreateProject = this.onCreateProject.bind(this);
    }

    onCreateProject(editData) {

        const sourceUrl = process.env.PUBLIC_URL + '/images/projects/add-your-own-photo-here.JPG';

        loadImage(sourceUrl, img => {
            // Uses original photo exif orientation to set initial canvas
            const orientatedCanvas = createOrientatedCanvas(img, 1);
            // Sorting the orientation here allows all uploaded photos to
            // start with the same orientation, ie 1;
            this.props.onCreateNewArtwork(orientatedCanvas, editData);
        });
    }

    render() {
        const { projects } = this.state;
        const { totalArtworksFetchProgress, galleryId, onCancel, totalUserArtworks, maxArtworksAllowed } = this.props;

        const maximumArtworkLimitReached = totalUserArtworks >= maxArtworksAllowed;
        const showPhotoSelector = !maximumArtworkLimitReached;

        if (totalArtworksFetchProgress !== 'fetched') {
            return <LoadingThing/>
        }

        return (
            <div className={'newArtworkCreator'}>

                <TempScreenAppBar title={'Create a New Artwork'}
                                  onCloseClick={onCancel}/>


                <div className={'newArtworkCreator--content'} style={{ paddingTop: 70 }}>

                    {maximumArtworkLimitReached &&
                    <MaximumArtworksReached galleryId={galleryId}
                                            totalUserArtworks={totalUserArtworks}
                                            maxArtworksAllowed={maxArtworksAllowed}/>
                    }

                    {showPhotoSelector &&
                    <div className={'newArtworkCreator--content--projectCards'}>
                        {
                            projects.map(project => {
                                return <NewArtworkCreatorCard key={project.id}
                                                              project={project}
                                                              onCreateProject={this.onCreateProject}
                                />;
                            })
                        }
                    </div>
                    }
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => (
    {
        deleteAfterDate: getDeleteAfterDate(state),
        totalArtworksFetchProgress: state.dataFetching.userArtworks,
        totalUserArtworks: getTotalUserArtworks(state),
        maxArtworksAllowed: getMaxArtworksAllowed(state)
    }
);
export default connect(mapStateToProps, { addNewArtwork, UpdateUrl })(NewArtworkCreator);