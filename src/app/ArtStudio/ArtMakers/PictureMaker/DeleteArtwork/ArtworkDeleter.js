// externals
import React, { Component } from "react";
import { connect } from 'react-redux';
import { faCheck, faTimes } from '@fortawesome/fontawesome-free-solid';
// styles
import './deleteArtwork_styles.css';
// actions
import { deleteArtwork } from '../../../../../actions/UserDataActions';
// components
import ControlPanelButt from "../../../../global/Butt/ControlPanelButt";
import ArtworkCard from '../ArtworkCard/ArtworkCard';

class ArtworkDeleter extends Component {

    constructor() {
        super();

        this.onDeleteConfirm = this.onDeleteConfirm.bind(this);
        this.onDeleteCancel = this.onDeleteCancel.bind(this);

        this.state = { artworkDeleting: false }
    }

    componentDidMount() {
        this.props.setToolControls([
            <ControlPanelButt key={'doDelete'} label={'DELETE IT'} icon={faCheck} onClick={this.onDeleteConfirm}/>,
            <ControlPanelButt key={'doNotDelete'} label={'DON\'T DO IT'} icon={faTimes} onClick={this.onDeleteCancel}/>
        ]);
    }

    componentWillUnmount() {
        this.props.clearToolControls();
    }

    onDeleteCancel() {
        this.props.onDeleteArtworkCancel();
    }

    onDeleteConfirm() {
        this.setState({ artworkDeleting: true }, () => {

            const { artist, artworkId } = this.props;
            const { artistId } = artist;

            this.props.deleteArtwork(artworkId, artistId, () => {
                this.props.onDeleteArtworkComplete();
            });
        });
    }

    render() {
        const { artwork, artist } = this.props;

        return (
            <div className={'deleteArtwork'}>
                {this.state.artworkDeleting &&
                <div>
                    Deleting artwork...
                </div>
                }

                {this.state.artworkDeleting === false &&
                <div>
                    <p className={'deleteArtwork--question'}>Are you sure you want to delete this artwork?</p>
                    <ArtworkCard artwork={artwork} artist={artist}/>
                    {/* <div className='cropAndRotate--controls'>
                        <ControlPanelButt label={'DELETE IT'} icon={faCheck} onClick={this.onDeleteConfirm}/>
                        <ControlPanelButt label={'DON\'T DO IT'} icon={faTimes} onClick={this.onDeleteCancel}/>
                    </div>*/}
                </div>}
            </div>
        );
    }
}

const mapActionsToProps = { deleteArtwork };

export default connect(null, mapActionsToProps)(ArtworkDeleter);