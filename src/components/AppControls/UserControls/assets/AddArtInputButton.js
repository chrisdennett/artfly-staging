// externals
import React, { Component } from 'react';
// components
import history from '../../../global/history';
import AddArtModal from "../../../AddArtModal/AddArtModal";

class AddArtInputButton extends Component {

    constructor(props) {
        super(props);
        this.onCancel = this.onCancel.bind(this);
        this.onSaveComplete = this.onSaveComplete.bind(this);

        this.state = { modalOpen: false, imgSrc: null };
    }

    onClick(event){
        if(this.props.maxArtworksReached){
            event.preventDefault();
            history.push('/settings');
        }
    }

    handleImageChange(event) {
        event.preventDefault();

        // this.props.clearImageUpload();
        this.setState({ modalOpen: true });

        if (event.target.files[0]) {
            this.setState({ imgIsSelected: true });

            const imgFile = event.target.files[0];
            const reader = new FileReader();

            reader.onload = function (event) {
                const imgSrc = event.target.result;
                this.setState({ imgSrc: imgSrc });
            }.bind(this);

            reader.readAsDataURL(imgFile);
        }
    }

    onSaveComplete(newArtworkData){
        this.setState({ modalOpen: false, imgSrc: null });
        history.push(`/gallery/${newArtworkData.artistId}/artwork/${newArtworkData.artworkId}`);
    }

    onCancel() {
        this.setState({ modalOpen: false, imgSrc: null });
    }

    render() {
        const id = !this.props.id ? "123" : this.props.id;

        return (
            <span>
                <AddArtModal imgSrc={this.state.imgSrc} isOpen={this.state.modalOpen} onSaveComplete={this.onSaveComplete} onCancel={this.onCancel}/>

                <input className="inputfile"
                       onClick={this.onClick.bind(this)}
                       onChange={this.handleImageChange.bind(this)}
                       type="file" accept="image/*"
                       name={this.props.id} id={id}/>

                <label disabled={this.props.disabled}
                       className={this.props.disabled ? 'disabled' : ''}
                       htmlFor={id}>

                    <div className={'sketch-butt'}>
                        <svg width={'100%'} height={'100%'} viewBox="0 0 67 65">
                            <rect height="65" width="67" fill="#fff"/>
                            <path
                                d="M45.3 36.11H22.14c-1.476 0-2.672-1.183-2.672-2.643v-15.86c0-1.46 1.196-2.643 2.672-2.643H45.3c1.476 0 2.672 1.183 2.672 2.643v15.86c0 1.46-1.196 2.643-2.672 2.643zM25.7 18.05c-1.722 0-3.118 1.381-3.118 3.084s1.396 3.084 3.118 3.084 3.118-1.381 3.118-3.084-1.396-3.084-3.118-3.084zm-2.672 14.54h21.38v-6.167l-4.872-4.819a.673.673 0 0 0-.945 0l-7.544 7.462-3.09-3.057a.673.673 0 0 0-.946 0l-3.98 3.938v2.643z"/>
                            <rect ry="5.467" height="30.05" width="38.24" stroke="#000" y="10.51" x="14.6"
                                  strokeWidth="6"
                                  fill="none" color="#000"/>
                            <text>
                                <tspan fontWeight="900" fontSize="11.86" y="57" x="8.617"
                                       fontFamily="'Source Code Pro'">add
                                    art
                                </tspan>
                            </text>
                        </svg>
                    </div>

                </label>
            </span>
        )
    }
}

export default AddArtInputButton;