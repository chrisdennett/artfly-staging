import React, { Component } from "react";
import { connect } from 'react-redux';

import "./photo-selector-styles.css";
import { selectPhoto } from "./PhotoSelectorActions";

// The role of this component is to:
// - create a custom file input button with a given label and id
// - send it's id and the selected file to a callback function when selected
class PhotoSelector extends Component {

    handleImageChange(event) {
        event.preventDefault();

        if (event.target.files[0]) {

            const imgFile = event.target.files[0];
            const reader = new FileReader();

            reader.onload = function (event) {
                const imgSrc = event.target.result;
                this.props.selectPhoto(imgSrc);
                this.props.history.push(`/artwork-editor/new`);
                // console.log("imgSrc: ", imgSrc);
            }.bind(this);

            reader.readAsDataURL(imgFile);
        }
    }

    render() {
        const id = !this.props.id ? "123" : this.props.id;

        return (
            <span>
                <input className="inputfile"
                       onChange={this.handleImageChange.bind(this)}
                       type="file" accept="image/*"
                       name={this.props.id} id={id}/>

                {/*<input className="inputfile"
                       onChange={this.handleImageChange.bind(this)}
                       type="file" accept="image/*" capture="camera"
                       name={this.props.id} id={this.props.id}/>*/}

                <label disabled={this.props.disabled}
                       className={this.props.disabled ? 'disabled' : ''}
                       htmlFor={id}>
                    Add Artwork
                </label>
            </span>
        );
    }
}

const PhotoSelectorContainer = connect(
    null, { selectPhoto }
)(PhotoSelector);

export default PhotoSelectorContainer;