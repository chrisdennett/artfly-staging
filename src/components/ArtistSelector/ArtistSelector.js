// externals
import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
// actions
import { getUserArtistChanges } from '../../actions/UserDataActions'

class ArtistSelector extends Component {
    constructor() {
        super();
        this.state = { selectedArtistId: '' };
    }

    componentWillMount() {
        // Load in the users artists
        this.props.getUserArtistChanges(this.props.userId);
        this.setDefaultArtist(this.props);
    }

    componentWillReceiveProps(nextProps) {
        this.setDefaultArtist(nextProps);
    }

    setDefaultArtist(props){
        // Set default artist Id - just use the first artist
        if (this.state.selectedArtistId === '' && Object.keys(props.artists).length > 0) {
            const defaultArtistId = Object.keys(props.artists)[0];
            this.onArtistSelected(defaultArtistId);
        }
    }

    onArtistSelected(artistId) {
        // save state and update parent - NB: could just keep state in parent and make this stateless
        this.setState({ selectedArtistId: artistId }, () => {
            this.props.onArtistSelected(artistId);
        });
    }

    render() {
        const props = this.props;
        const { selectedArtistId } = this.state;
        const labelText = props.labelText !== undefined ? props.labelText : 'Select Artist: ';

        if (selectedArtistId === '') return null;

        return (
            <div style={props.style}>
                <label className={'form-field'} htmlFor="artistSelector">{labelText} </label>
                <select value={selectedArtistId}
                        onChange={(e) => {this.onArtistSelected(e.target.value)}}>
                    {
                        _.map(props.artists, (artistData, artistId) => {

                            return <option key={artistId}
                                           value={artistId}>{artistData.firstName} {artistData.lastName}</option>;
                        })
                    }
                </select>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        userId: state.user.uid,
        artists: state.artists
    }
};
const mapActionsToProps = { getUserArtistChanges };

export default connect(mapStateToProps, mapActionsToProps)(ArtistSelector);