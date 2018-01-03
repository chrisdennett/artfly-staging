// externals
import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
// actions
import { getUserArtistChanges } from '../../actions/UserDataActions'
import ArtistSelectorOption from "./ArtistSelectorOption";

class ArtistSelector extends Component {
    constructor() {
        super();

        this.state = { selectedArtistId: '' };

        this.onArtistSelected = this.onArtistSelected.bind(this);
    }

    componentWillMount() {
        // Load in the users artists
        this.props.getUserArtistChanges(this.props.userId);

        this.setInitialArtist(this.props);
    }

    componentWillReceiveProps(nextProps) {
        this.setInitialArtist(nextProps);
    }

    setInitialArtist(props) {
        // Set default artist Id - just use the first artist
        if (this.state.selectedArtistId === '') {

            if (props.initialArtistId) {
                this.onArtistSelected(props.initialArtistId, true);
            }
            else if (Object.keys(props.artists).length > 0) {
                const defaultArtistId = Object.keys(props.artists)[0];
                this.onArtistSelected(defaultArtistId, true);
            }
        }
    }

    onArtistSelected(artistId, isInitialSelection = false) {
        // save state and update parent - NB: could just keep state in parent and make this stateless
        this.setState({ selectedArtistId: artistId }, () => {
            if (isInitialSelection) {
                if (this.props.onInitialArtistSelected) this.props.onInitialArtistSelected(artistId);
            }
            else {
                this.props.onArtistSelected(artistId);
            }
        });
    }

    render() {
        const { artists } = this.props;
        const { selectedArtistId } = this.state;

        if (selectedArtistId === '') return null;

        return (
            <div>
                {
                    _.map(artists, (artistData, artistId) => {
                        return <ArtistSelectorOption
                            key={artistId}
                            isSelected={selectedArtistId === artistId}
                            artistId={artistId}
                            onSelected={this.onArtistSelected}
                            firstName={artistData.firstName}
                            lastName={artistData.lastName}/>
                    })
                }
            </div>
        )
    }
}

const
    mapStateToProps = (state) => {
        return {
            userId: state.user.uid,
            artists: state.artists
        }
    };
const mapActionsToProps = { getUserArtistChanges };

export default connect(mapStateToProps, mapActionsToProps)(ArtistSelector);

/*
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
*/