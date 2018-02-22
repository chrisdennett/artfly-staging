// externals
import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
// styles
import './artistSelectorStyles.css';
// actions
import { getUserArtistChanges, updateArtworkArtist } from '../../../../../actions/UserDataActions'
// components
import ArtistSelectorOption from "./ArtistSelectorOption";
import ArtworkCard from "../ArtworkCard/ArtworkCard";
import { faCheck, faTimes } from "@fortawesome/fontawesome-pro-solid";
import ControlPanelButt from "../../../../global/Butt/ControlPanelButt";

class ArtistSelector extends Component {
    constructor() {
        super();

        this.state = { selectedArtistId: '' };

        this.onArtistSelected = this.onArtistSelected.bind(this);
        this.uploadChanges = this.uploadChanges.bind(this);
        this.onCancel = this.onCancel.bind(this);
    }

    componentWillMount() {
        // Load in the users artists
        this.props.getUserArtistChanges(this.props.userId);

        this.setInitialArtist(this.props);
    }

    componentDidMount() {
        this.props.setToolControls([
            <ControlPanelButt key={'doDelete'} isSelected={true} label={'SAVE'} icon={faCheck} onClick={this.uploadChanges}/>,
            <ControlPanelButt key={'doNotDelete'} isSelected={true} label={'CANCEL'} icon={faTimes} onClick={this.onCancel}/>
        ]);
    }

    componentWillUnmount() {
        this.props.clearToolControls();
    }


    componentWillReceiveProps(nextProps) {
        this.setInitialArtist(nextProps);
    }

    setInitialArtist(props) {
        if (this.state.selectedArtistId === '') {
            // if provided
            if (props.initialArtistId) {
                this.onArtistSelected(props.initialArtistId);
            }
            // Set default artist Id - just use the first artist
            else if (Object.keys(props.artists).length > 0) {
                const defaultArtistId = Object.keys(props.artists)[0];
                this.onArtistSelected(defaultArtistId);
            }
        }
    }

    onArtistSelected(artistId) {
        this.setState({ selectedArtistId: artistId });
    }

    uploadChanges() {
        const { artworkId, onUpdateComplete } = this.props;
        const { selectedArtistId } = this.state;

        this.props.updateArtworkArtist(artworkId, selectedArtistId, () => {
            onUpdateComplete(artworkId);
        });
    }

    onCancel() {
        this.props.onCancel();
    }

    render() {
        const { artists, artist, artwork } = this.props;
        const { selectedArtistId } = this.state;

        if (selectedArtistId === '') return null;

        const currentSelectedArtist = selectedArtistId ? artists[selectedArtistId] : artist;

        return (
            <div className={'artistSelector'}>

                <ArtworkCard artist={currentSelectedArtist} artwork={artwork}/>

                <div className={'artistSelector--artists'}>
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
const mapActionsToProps = { getUserArtistChanges, updateArtworkArtist };

export default connect(mapStateToProps, mapActionsToProps)(ArtistSelector);