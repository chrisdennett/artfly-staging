import React from 'react';
import { connect } from 'react-redux';
// styles
import './galleryCards_styles.css'
// actions
import { UpdateUrl } from "../../../actions/UrlActions";
// selectors
import { getUserGalleries, getUserId } from '../../../selectors/Selectors';
// comps
import GalleryCard from './galleryCard/GalleryCard';
// helpers
import { EDITOR_PATH, GALLERY_PATH } from "../../../components/global/UTILS";

const GalleryCards = ({ userGalleries, UpdateUrl, userId, onDeleteArtist }) => {

    if (!userGalleries) return null;

    const globalGallery = userGalleries.filter(gallery => gallery.type === 'global')[0];
    const artistGalleries = userGalleries.filter(gallery => gallery.type === 'artist');

    return (
        <div>

            <div className={'galleryCards--globalGalleryHolder'}>

                <GalleryCard title={globalGallery.title}
                    galleryType={globalGallery.type}
                    subtitle={globalGallery.subtitle}
                    onDeleteClick={() => onDeleteArtist(globalGallery.artist)}
                    latestArtwork={globalGallery.latestArtwork}
                    totalArtworks={globalGallery.totalArtworks}
                    key={globalGallery.id}
                    onAddClick={() => UpdateUrl(EDITOR_PATH(userId))}
                    onClick={() => UpdateUrl(GALLERY_PATH(userId))} />

            </div>


            <div className={'galleryCards'}>
                {
                    artistGalleries.map(gallery => {

                        return (
                            <GalleryCard title={gallery.title}
                                galleryType={gallery.type}
                                subtitle={gallery.subtitle}
                                onDeleteClick={() => onDeleteArtist(gallery.artist)}
                                latestArtwork={gallery.latestArtwork}
                                totalArtworks={gallery.totalArtworks}
                                key={gallery.id}
                                onAddClick={() => UpdateUrl(EDITOR_PATH(userId, null, gallery.artist))}
                                onClick={() => UpdateUrl(GALLERY_PATH(userId, gallery.artist))} />
                        )
                    })
                }
            </div>
        </div>
    )
};


const mapStateToProps = (state) => (
    {
        userId: getUserId(state),
        userGalleries: getUserGalleries(state)
    }
);

export default connect(mapStateToProps, { UpdateUrl })(GalleryCards);