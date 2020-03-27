import React from 'react';
import { connect } from 'react-redux';
// ui
import { Menu, MenuItem, MenuSurfaceAnchor } from '@rmwc/menu';
import { ListDivider } from '@rmwc/list';
import { Button } from '@rmwc/button';
// selectors
import { getUserArtists, getCurrentArtistParam, getCurrentGalleryIdParam } from '../../../selectors/Selectors';
// actions
import { UpdateUrl } from '../../../actions/UrlActions';
import { GALLERY_PATH } from '../../../components/global/UTILS';

class GallerySwitcher extends React.Component {

    state = { menuIsOpen: false };

    onSelectArtist = (index) => {
        if (index === 0) {
            this.props.UpdateUrl(GALLERY_PATH(this.props.galleryId))
        }
        else {
            const newArtist = this.props.artists[index - 1];

            this.props.UpdateUrl(GALLERY_PATH(this.props.galleryId, newArtist.name));
        }
    };

    render() {

        if (!this.props.artists) return null;

        return (
            <div style={{ display: 'flex', justifyContent: 'center' }}>

                <MenuSurfaceAnchor>
                    <Menu
                        open={this.state.menuIsOpen}
                        onSelect={evt => this.onSelectArtist(evt.detail.index)}
                        onClose={() => this.setState({ menuIsOpen: false })}
                    >
                        <MenuItem selected={!this.props.currentArtist}>
                            All Artworks
                        </MenuItem>

                        <ListDivider />

                        {
                            this.props.artists.map(artist => {
                                return (
                                    <MenuItem key={artist.name}
                                        selected={artist.name === this.props.currentArtist}
                                    >
                                        {artist.name}
                                    </MenuItem>
                                )
                            })
                        }
                    </Menu>

                    <Button
                        onClick={evt => this.setState({ menuIsOpen: true })}
                    >
                        Switch Gallery
                    </Button>
                </MenuSurfaceAnchor>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        artists: getUserArtists(state),
        galleryId: getCurrentGalleryIdParam(state),
        currentArtist: getCurrentArtistParam(state),
    }
};
export default connect(mapStateToProps, { UpdateUrl })(GallerySwitcher);