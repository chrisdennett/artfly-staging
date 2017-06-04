import React, { Component } from "react";
import "./photo-selector-styles.css";

// The role of this component is to:
// - create a custom file input button with a given label and id
// - send it's id and the selected file to a callback function when selected
class PhotoSelector extends Component {

    handleImageChange(event){
        event.preventDefault();
        const imgFile = event.target.files[0];
        this.props.onPhotoSelected(imgFile, this.props.id);
    }

    render() {
        return (
            <span>
                <input className="inputfile"
                       onChange={this.handleImageChange.bind(this)}
                       type="file" name={this.props.id} id={this.props.id} />

                <label disabled={this.props.disabled}
                       className={this.props.disabled ? 'disabled' : ''}
                       htmlFor={this.props.id}>{this.props.label}</label>
            </span>
        );
    }
}

export default PhotoSelector;