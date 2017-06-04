import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { createNewArtist } from '../actions';

class AddNewArtistForm extends Component {

    constructor(props){
        super(props);
        this.state = {formOpen: false};
    }

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

    onAddNewArtistClick(){
        this.setState({formOpen: true});
    }

    onNewArtistFormSubmit(values){
        this.props.createNewArtist(this.props.userId, values);
        // console.log("values: ", values);
    }

    onFormCancel(){
        this.setState({formOpen: false});
    }

    render() {
        const { handleSubmit } = this.props; // handleSubmit is added to props by redux-form

        if(this.state.formOpen){
            return (
                <div>
                    {/*
                    TODO: add redux form in here with name and biog
                    this component will need userId from props to call an event, but I think that's all
                    */}
                    <form onSubmit={handleSubmit(this.onNewArtistFormSubmit.bind(this))}>
                        <Field
                            name="artistName"
                            label="Artist Name: "
                            component={this.renderField}
                        />
                        <Field
                            name="biog"
                            label="Artist biog: "
                            component={this.renderField}
                        />
                        <button type="submit" className="btn btn-primary">Submit</button>
                        <button onClick={this.onFormCancel.bind(this)} className="btn btn-danger">Cancel</button>
                    </form>
                </div>
            )
        }

        return (
            <div>
                <button onClick={this.onAddNewArtistClick.bind(this)}>Add new artist</button>
            </div>
        );
    }
}

const validate = values => {
    const errors = {};

    if (!values.artistName) {
        errors.artistName = 'Required'
    } else if (values.artistName.length > 15) {
        errors.artistName = 'Must be 15 characters or less'
    }

    if (!values.biog) {
        errors.biog = 'Required'
    } else if (values.biog.length > 200) {
        errors.artistName = 'Must be 200 characters or less'
    }

    return errors
};

// Decorate with reduxForm(). It will read the initialValues prop provided by connect()
AddNewArtistForm = reduxForm({
    form: 'NewArtistForm', // a unique identifier for this form
    validate
})(AddNewArtistForm);

// You have to connect() to any reducers that you wish to connect to yourself
AddNewArtistForm = connect(
    state => ({
        initialValues: {
            artistName: "Secret artist",
            biog: "One of the best artists know to humankind."
        }
    })
    , { createNewArtist }
)(AddNewArtistForm);

export default AddNewArtistForm;