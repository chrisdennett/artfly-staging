// externals
import React from 'react';
import styled from 'styled-components';

const SelectPhotoButton = function ({ onClick, onPhotoSelect, uid, disabled }) {

    const id = !uid ? "123" : uid;

    return (
        <div>
            <DefaultInput className="inputfile"
                          onClick={onClick}
                          onChange={onPhotoSelect}
                          type="file"
                          accept="image/*"
                          name={id}
                          id={id}/>

            <label disabled={disabled}
                   className={disabled ? 'disabled' : ''}
                   htmlFor={id}>

                <CustomInputButton>
                    <svg width={55} height={50} viewBox="5 0 55 50">
                        <path fill={'#fff'}
                              d="M45.3 36.11H22.14c-1.476 0-2.672-1.183-2.672-2.643v-15.86c0-1.46 1.196-2.643 2.672-2.643H45.3c1.476 0 2.672 1.183 2.672 2.643v15.86c0 1.46-1.196 2.643-2.672 2.643zM25.7 18.05c-1.722 0-3.118 1.381-3.118 3.084s1.396 3.084 3.118 3.084 3.118-1.381 3.118-3.084-1.396-3.084-3.118-3.084zm-2.672 14.54h21.38v-6.167l-4.872-4.819a.673.673 0 0 0-.945 0l-7.544 7.462-3.09-3.057a.673.673 0 0 0-.946 0l-3.98 3.938v2.643z"/>
                    </svg>

                    <span>Add Photo</span>
                </CustomInputButton>

            </label>
        </div>
    )
};

export default SelectPhotoButton;

const CustomInputButton = styled.div`
    background: rgba(0,0,0,0.3);
    cursor: pointer;
    width: 100%;
    padding: 20px;
    margin: 0;
    border: #fff 1px solid;
    border-radius: 5px;
    outline: none;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const DefaultInput = styled.input`
    width: 0.1px;
    height: 0.1px;
    opacity: 0;
    overflow: hidden;
    position: absolute;
    z-index: -1;
`;

/*
.inputfile {
    width: 0.1px;
    height: 0.1px;
    opacity: 0;
    overflow: hidden;
    position: absolute;
    z-index: -1;
}

.inputfile + label {
    display: inline-block;
    margin: 0;
    cursor: pointer;
    line-height: 0;
}

.inputfile + label * {
    pointer-events: none;
}
*/