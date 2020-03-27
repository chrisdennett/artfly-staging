// externals
import React, { Component } from 'react';
// material ui
import { Icon } from '@rmwc/icon';
import { Elevation } from '@rmwc/elevation';
import { Ripple } from '@rmwc/ripple';
import { Theme } from '@rmwc/theme';
// styles
import './photoSelector_styles.css';

class PhotoSelector extends Component {

    constructor(props) {
        super(props);

        this.onFileSelect = this.onFileSelect.bind(this);
        this.onInputClick = this.onInputClick.bind(this);
    }

    // called when file selected
    onFileSelect(e) {
        e.preventDefault();

        if (e.target.files[0]) {
            const imgFile = e.target.files[0];
            this.props.onPhotoSelected(imgFile);
        }
    }

    // called when input started
    onInputClick() {
        const { onInputClick, id } = this.props;
        if (onInputClick) {
            onInputClick(id);
        }
    }

    render() {
        // ids important if there are more than one on a page together
        const { id = '123', children, disabled = false } = this.props;

        // const defaultClass = children ? 'quickPhotoSelector--customInputButton' : 'quickPhotoSelector--inputButton';

        return (
            <label htmlFor={id} className={'quickPhotoSelector--label'}>

                <input className='quickPhotoSelector--input'
                       disabled={disabled}
                       onClick={this.onInputClick}
                       onChange={this.onFileSelect}
                       type="file"
                       accept="image/*;capture=camera"
                       name={id}
                       id={id}/>

                <div className={'quickPhotoSelector--customInputButton'}>
                    {children}
                </div>

                {!children &&
                <div className={'quickPhotoSelector--inputButton'}>
                    <Ripple>
                        <Theme use="primaryBg onSecondary" wrap>
                            <Elevation z={10} className={'quickPhotoSelector--inputButton--iconHolder'}>
                                <Icon icon="add_a_photo"/>
                            </Elevation>
                        </Theme>
                    </Ripple>
                </div>
                }
            </label>
        )
    }
}

export default PhotoSelector;