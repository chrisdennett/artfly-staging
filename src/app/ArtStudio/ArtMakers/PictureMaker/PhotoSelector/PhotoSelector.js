// externals
import React, { Component } from 'react';
// styles
import './PhotoSelectorStyles.css';

class PhotoSelector extends Component {

    constructor(){
        super();

        this.onFileSelect = this.onFileSelect.bind(this);
        this.onInputClick = this.onInputClick.bind(this);
    }

    onFileSelect(e) {
        e.preventDefault();

        if (e.target.files[0]) {
            const imgFile = e.target.files[0];
            this.props.onPhotoSelected(imgFile);
        }
    }

    onInputClick(e){
        const {onInputClick, id} = this.props;
        if(onInputClick){
            onInputClick(id);
        }
    }

    render() {
        const { id='123', firstName, lastName } = this.props;

        return (
            <div className={'photoSelector'}>
                <input className='photoSelector--input'
                       onClick={this.onInputClick}
                       onChange={this.onFileSelect}
                       type="file"
                       accept="image/*"
                       name={id}
                       id={id}/>

                <label htmlFor={id}>
                    <div className={'photoSelector--customInputButton'}>
                        <div>
                            <svg height="93.06" width="93.06" viewBox="0 0 93.062921 93.062921">
                                <circle className={'photoSelector--iconBg'} cy="46.53" cx="46.53" r="46.53"/>
                                <g className={'photoSelector--icon'}>
                                    <path
                                        d="M75 46.4l-10.14-9.509a.644.644 0 0 0-.911.032l-1.458 1.565a.644.644 0 0 0 .033.911l6.357 5.961H56.5l-3.43 6.861H38.45l-3.43-6.86H22.65l6.357-5.962a.655.655 0 0 0 .033-.91l-1.47-1.566a.654.654 0 0 0-.91-.032L16.52 46.4a5.134 5.134 0 0 0-1.63 3.752v10.63a5.147 5.147 0 0 0 5.146 5.146h51.46a5.147 5.147 0 0 0 5.146-5.146v-10.63c0-1.426-.59-2.777-1.63-3.752z"/>
                                    <path d="M46 14.5l13.72 13.72h-9.38v13.72h-8.861V28.22h-9.203z"/>
                                </g>
                            </svg>
                            <p className={'photoSelector--text'}>{firstName} {lastName}</p>
                        </div>
                    </div>

                </label>
            </div>
        )
    }
}

export default PhotoSelector;