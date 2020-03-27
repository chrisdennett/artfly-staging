import React from 'react';
import { connect } from 'react-redux';
// styles
import './artistDelete_styles.css';
// actions
import { updateArtworkBatch } from '../../actions/SaveArtworkActions';
import { updateUserAccount } from '../../actions/UserAccountActions';
//selectors
import { getUserArtists, getUserArtworks } from '../../selectors/Selectors';
// ui
import { Select } from '@rmwc/select';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    DialogButton
} from '@rmwc/dialog';
class ArtistDelete extends React.Component {

    state = { value: "none" };

    componentDidUpdate(prevProps) {
        if (this.props.showDialog && !prevProps.showDialog) {
            this.setState({ value: 'none' })
        }
    }

    confirmDelete = (artistArtworks) => {
        const { artists, artistId } = this.props;
        const { value: selectedArtist } = this.state;

        // update user artist list
        const updatedArtists = artists.filter(artist => artist.name !== artistId);
        this.props.updateUserAccount(null, { artists: updatedArtists });

        const newArtist = selectedArtist === 'none' ? null : selectedArtist;

        // also need to delete artist from any artwork
        //TODO: Change artist in label edit to newArtist value.

        let updatedArtworks = [];
        for (let artwork of artistArtworks) {
            let updatedEditData = {}

            // change the artist in the label editdata if it exists.
            if (artwork.editData && artwork.editData.edits) {
                updatedEditData = { ...artwork.editData };
                let updatedEdits = { ...updatedEditData.edits }

                const labelEditKey = Object.keys(updatedEdits).filter(editKey => updatedEdits[editKey].type === 'label')[0];

                if (labelEditKey) {
                    const updatedLabelEdit = { ...updatedEdits[labelEditKey], artist: newArtist };
                    updatedEdits[labelEditKey] = updatedLabelEdit;
                    updatedEditData.edits = updatedEdits;
                }
                else {
                    updatedEditData = {};
                }
            }

            const updatedArtwork = { ...artwork, editData: updatedEditData };
            updatedArtwork.artist = newArtist;
            updatedArtworks.push(updatedArtwork);
        }

        this.props.updateArtworkBatch(updatedArtworks, () => {
            this.props.onCancel();
        });
    }

    render() {
        const { artistId, onCancel, userArtworks, showDialog = false, artists = [] } = this.props;

        const artistArtworks = userArtworks.filter(artwork => artwork.artist === artistId);
        const totalArtworks = artistArtworks.length;

        const artistOptions = artists.filter(artist => artist.name !== artistId);
        let selectOptions = artistOptions.map(artist => {
            return {
                label: `Change to: ${artist.name}`,
                value: artist.name
            }
        });
        selectOptions.unshift({
            label: 'Leave the Artist blank',
            value: 'none'
        });

        return (
            <div>
                <Dialog
                    open={showDialog}
                    onClose={onCancel}
                >
                    <DialogTitle>Delete Artist</DialogTitle>
                    <DialogContent>
                        <div>
                            Artist: <span className={'artistDelete--emphasis'}>{artistId}</span>
                        </div>
                        <div className={'artistDelete--contentSection'}>
                            <span className={'artistDelete--emphasis'}>
                                {totalArtworks} artwork{totalArtworks !== 1 ? 's' : ''}
                            </span>
                            {totalArtworks === 1 ? ' is' : ' are'} labelled with this artist.
                        </div>

                        {
                            totalArtworks > 0 &&
                            <React.Fragment>
                                <div>
                                    How do you want to change the label?
                                </div>
                                <div className={'artistDelete--selectHolder'}>
                                    <Select
                                        className={'artistDelete--select'}
                                        value={this.state.value}
                                        onChange={evt => this.setState({ value: evt.target.value })}
                                        label={"Artwork options:"}
                                        options={selectOptions}
                                    />
                                </div>
                            </React.Fragment>
                        }

                    </DialogContent>

                    <DialogActions>
                        <DialogButton onClick={() => this.confirmDelete(artistArtworks)}>Delete</DialogButton>
                        <DialogButton action="close">Cancel</DialogButton>
                    </DialogActions>
                </Dialog>


            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        artists: getUserArtists(state),
        userArtworks: getUserArtworks(state)
    }
};

const mapActionsToProps = {
    updateUserAccount,
    updateArtworkBatch,
}

export default connect(mapStateToProps, mapActionsToProps)(ArtistDelete);