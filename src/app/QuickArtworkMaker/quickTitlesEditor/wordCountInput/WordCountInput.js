import React from 'react';
// styles
import './wordCountInput_styles.css';

const WordCountInput = function ({ label, max, onChange, value, isMultiline = false }) {

    const submittedText = value;
    let formattedText;

    if(submittedText.length > max){
        formattedText = submittedText.substr(0,max);
    }
    else{
        formattedText = submittedText;
    }

    const totalCharacters = formattedText.length;
    const closeToLimit = totalCharacters > max - 3;
    const warningClass = closeToLimit ? 'wordCountInput--titleBar--count--warning' : '';

    const submitChange = (e) => {
        let value = e.target.value;
        if(value.length > max){
            value = value.substr(0,max);
        }
        onChange(value);
    };

    return (
        <div className={'wordCountInput'}>
            <div className={'wordCountInput--titleBar'}>
                {label}: <span className={`wordCountInput--titleBar--count ${warningClass}`}>chars {totalCharacters} of {max}</span>
            </div>

            {isMultiline &&
            <textarea rows="6"
                      cols="50"
                      onChange={submitChange}
                      value={formattedText}/>
            }

            {!isMultiline &&
            <input type="text"
                   onChange={submitChange}
                   value={formattedText}/>
            }
        </div>
    )
};

export default WordCountInput;