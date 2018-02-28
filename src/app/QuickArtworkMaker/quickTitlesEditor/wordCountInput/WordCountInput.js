import React from 'react';
// styles
import './wordCountInput_styles.css';

const WordCountInput = function ({ label, max, onChange, value, isMultiline = false }) {

    const totalCharacters = value.length;
    const overLimit = totalCharacters > max;
    const warningClass = overLimit ? 'wordCountInput--titleBar--count--warning' : '';

    return (
        <div className={'wordCountInput'}>
            <div className={'wordCountInput--titleBar'}>
                {label}: <span className={`wordCountInput--titleBar--count ${warningClass}`}>chars {value.length} of {max}</span>
            </div>

            {isMultiline &&
            <textarea rows="6"
                      cols="50"
                      onChange={onChange}
                      value={value}/>
            }

            {!isMultiline &&
            <input type="text"
                   onChange={onChange}
                   value={value}/>
            }
        </div>
    )
};

export default WordCountInput;