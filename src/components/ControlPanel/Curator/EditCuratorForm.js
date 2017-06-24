import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
// import { updateCurator } from '../../User/UserActions';

class EditCuratorForm extends Component {

    renderField(field) {
        // pulling meta out of field.  And also pulling touched and error out of meta.
        const { meta: { touched, error } } = field;
        const className = `form-group ${touched && error ? 'has-danger' : ''}`;

        return (
            <div className={className}>
                <label>{field.label}</label>
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
        );
    }

    onFormSubmit(values) {
        this.props.onFormSubmit(values.curatorName);
    }

    onFormCancel() {
        this.props.onFormCancel();
    }

    render() {
        const { handleSubmit } = this.props; // handleSubmit is added to props by redux-form

        return (
            <div>
                <form onSubmit={handleSubmit(this.onFormSubmit.bind(this))}>
                    <Field
                        name="curatorName"
                        label="Curator: "
                        component={this.renderField}
                    />
                    <button type="submit">Submit</button>
                    <button type="button" onClick={this.onFormCancel.bind(this)}>Cancel</button>
                </form>
            </div>
        )
    }
}

const validate = values => {
    const errors = {};

    if (!values.curatorName) {
        errors.curatorName = 'Required'
    }
    else if (values.curatorName.length > 25) {
        errors.curatorName = 'Must be 25 characters or less'
    }

    return errors
};

// Decorate with reduxForm(). It will read the initialValues prop provided by connect()
EditCuratorForm = reduxForm({
    form: 'EditCuratorForm', // a unique identifier for this form
    validate
})(EditCuratorForm);

// You have to connect() to any reducers that you wish to connect to yourself
EditCuratorForm = connect(
    state => ({
        initialValues: {
            curatorName: state.user.curator
         }
    }),
    {
        /* actions go in here.*/
    }
)(EditCuratorForm);

export default EditCuratorForm;