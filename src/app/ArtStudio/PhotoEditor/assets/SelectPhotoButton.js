// externals
import React from 'react';
import styled from 'styled-components';
import { P } from "../../../global/Themes";

const SelectPhotoButton = function ({ onClick, onPhotoSelect, uid, disabled, ...rest }) {

    const id = !uid ? "123" : uid;

    return (
        <div {...rest}>
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
                    <CustomInputContent>
                        <svg height="93.06" width="93.06" viewBox="0 0 93.062921 93.062921">
                            <circle cy="46.53" cx="46.53" r="46.53" fill="#b298fe" color="#000"/>
                            <g fill="#3d3457">
                                <path d="M75 46.4l-10.14-9.509a.644.644 0 0 0-.911.032l-1.458 1.565a.644.644 0 0 0 .033.911l6.357 5.961H56.5l-3.43 6.861H38.45l-3.43-6.86H22.65l6.357-5.962a.655.655 0 0 0 .033-.91l-1.47-1.566a.654.654 0 0 0-.91-.032L16.52 46.4a5.134 5.134 0 0 0-1.63 3.752v10.63a5.147 5.147 0 0 0 5.146 5.146h51.46a5.147 5.147 0 0 0 5.146-5.146v-10.63c0-1.426-.59-2.777-1.63-3.752z"/>
                                <path d="M46 14.5l13.72 13.72h-9.38v13.72h-8.861V28.22h-9.203z"/>
                            </g>
                        </svg>
                        <P style={{color:'hsl(250,98%,80%)'}}>Add Photo...</P>
                    </CustomInputContent>
                </CustomInputButton>

            </label>
        </div>
    )
};

export default SelectPhotoButton;

const CustomInputButton = styled.div`
    background: hsl(250,28%,30%);
    cursor: pointer;
    max-width: 600px;
    border-radius: 10px;
    padding: 20px;
    margin: 0;
    outline: none;
    text-align: center;
`;

const CustomInputContent = styled.div`
    margin: 2rem auto;
    color: #fff;
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