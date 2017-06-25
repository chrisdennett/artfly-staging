import React, { Component } from "react";
import { connect } from 'react-redux';

import EditGalleryForm from './EditGalleryForm';
import { updateGallery } from '../../User/UserActions';

class GalleryDetails extends Component {

    constructor(props) {
        super(props);
        this.state = { inEditingMode: false }
    }

    onEditButtClick() {
        this.setState({ inEditingMode: true })
    }

    onCancelEdit() {
        this.setState({ inEditingMode: false })
    }

    onFormSubmit(newName) {
        this.props.updateGallery(this.props.galleryId, newName, () => {
            this.setState({ inEditingMode: false })
        });
    }

    render() {
        let content;

        if (this.state.inEditingMode) {
            content = (
                <EditGalleryForm userId={this.props.userId}
                                 onFormSubmit={this.onFormSubmit.bind(this)}
                                 onFormCancel={this.onCancelEdit.bind(this)}/>
            );
        }
        else {
            content = (
                <div>
                    <span>Gallery: </span><span>{this.props.name}</span>
                    <button onClick={this.onEditButtClick.bind(this)}>Edit</button>
                </div>
            );
        }

        return content;
    }
}

export default connect(null, { updateGallery })(GalleryDetails);
