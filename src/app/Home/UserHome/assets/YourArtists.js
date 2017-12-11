// externals
import React from 'react';
import _ from 'lodash';
// styles
import './yourGalleriesStyles.css';
// components
import IconGallery from "../../../global/icon/icons/IconGallery";
import Link from "../../../global/Link";
import Butt from "../../../global/Butt/Butt";

const YourArtists = function ({ userArtists }) {
    return (
        <div className='userHome--section'>
            <h2 className='home--subHeading'>Artists</h2>

            <Link linkTo={`/addOrEditArtist/`}>
                <Butt>
                    <IconGallery width={21} height={21}/> Add New Artist
                </Butt>
            </Link>

            <div className='yourGalleries--cards'>
                {
                    _.map(userArtists, (artist) => {

                        return (
                            <div className='yourGalleries--galleryCard' key={artist.artistId}
                                 style={{ display: 'inline-block' }}>
                                <div className='yourGalleries--nameBox'>
                                    <p className='yourGalleries--nameBox--artistName'>{artist.firstName}</p>
                                    <p className='yourGalleries--nameBox--artistName'>{artist.lastName}</p>
                                </div>

                                <Link linkTo={`/gallery/${artist.artistId}`}>
                                    <Butt yellow fullWidth>
                                        <IconGallery width={21} height={21}/> Open Gallery
                                    </Butt>
                                </Link>

                                <Link linkTo={`/addOrEditArtist/${artist.artistId}`}>
                                    <Butt blue>
                                        <IconGallery width={21} height={21}/> Edit Artist
                                    </Butt>
                                </Link>

                                <p>Total artworks: {artist.totalArtworks}</p>
                            </div>)
                    })
                }
            </div>
        </div>
    )
};

export default YourArtists;