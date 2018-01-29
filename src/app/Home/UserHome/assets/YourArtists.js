// externals
import React from 'react';
import _ from 'lodash';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import {faAddressCard, faBuilding} from '@fortawesome/fontawesome-free-solid';
// styles
import './yourArtists_styles.css';
// components
import Link from "../../../global/Butt/Link";
import Butt from "../../../global/Butt/Butt";

const YourArtists = function ({ userArtists }) {
    return (
        <div className={'yourArtists'}>
            {
                _.map(userArtists, (artist) => {

                    return (
                        <div className='yourArtists--artistCard' key={artist.artistId}
                             style={{ display: 'inline-block' }}>
                            <div className='yourArtists--artistCard--nameBox'>
                                {artist.firstName} {artist.lastName}
                            </div>

                            <Link linkTo={`/gallery/${artist.artistId}`}>
                                <Butt yellow svgIcon={<FontAwesomeIcon icon={faBuilding}/>}>
                                    Open Gallery
                                </Butt>
                            </Link>

                            <Link linkTo={`/addOrEditArtist/${artist.artistId}`}>
                                <Butt blue svgIcon={<FontAwesomeIcon icon={faAddressCard}/>}>
                                    Edit Artist
                                </Butt>
                            </Link>

                            <p>Total artworks: {artist.totalArtworks}</p>
                        </div>)
                })
            }
        </div>
    )
};

export default YourArtists;