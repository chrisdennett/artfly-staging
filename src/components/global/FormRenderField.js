import React from 'react';

const FormRenderField = function (field) {
    const { meta: { touched, error } } = field;
    const className = `form-group ${touched && error ? 'has-danger' : ''}`;
    return (
        <div className={className}>
            <label className={'form-field'}>{field.label}</label>
            {/*The es6 {...field.input} links all events to reduxForm
             It's a shortcut for dong onChange={field.input.onChange} for all events
             */}
            <input
                className="form-control"
                type="text"
                {...field.input}
            />
            <div className="text-help">
                { touched ? error : '' }
            </div>
        </div>
    )
};

export default FormRenderField;