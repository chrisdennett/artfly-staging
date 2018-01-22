import React from 'react';
// styles
import './formField_styles.css';

const FormRenderField = (field) => {
    const { meta: { touched, error } } = field;
    const className = `form-group ${touched && error ? 'form-group-has-danger' : ''}`;

    /*The es6 {...field.input} links all events to reduxForm
     It's a shortcut for dong onChange={field.input.onChange} for all events
    */

    return (
        <div className={className}>
            {field.label &&
            <label className={'form-label'}>{field.label}</label>
            }

            <input
                className="form-input"
                type="text"
                {...field.input}
            />
            {/*<div className="text-help">
                {touched ? error : ''}
            </div>*/}
        </div>
    )
};

export default FormRenderField;