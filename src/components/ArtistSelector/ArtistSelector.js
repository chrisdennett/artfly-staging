// externals
import React, {Component} from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
// actions
import { getUserArtistChanges } from '../../actions/UserDataActions'

class ArtistSelector extends Component {
    constructor(props) {
        super(props);
        this.state = {selectedArtistId: '' };
    }

    componentWillMount() {
        this.props.getUserArtistChanges(this.props.userId);
    }

    onArtistSelected(artistId) {
        this.setState({ selectedArtistId: artistId });
    }

    render() {
        const props = this.props;
        const {selectedArtistId} = this.state;
        const labelText = props.labelText !== undefined ? props.labelText : 'Select Artist: ';

        return (
            <div style={props.style}>
                <label className={'form-field'} htmlFor="artistSelector">{labelText} </label>
                <select value={selectedArtistId}
                        onChange={(e) => {props.onArtistSelected(e.target.value)}}>
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

export default connect( mapStateToProps, mapActionsToProps )(ArtistSelector);