// externals
import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
// import md5 from 'md5';
// components
import FormRenderField from '../global/FormRenderField'
import Butt from "../global/Butt/Butt";
import Page from '../global/Page';

class NewUserForm extends Component {

    render() {
        const { handleSubmit } = this.props; // handleSubmit is added to props by redux-form

        const normalStyle = { margin: '0 0 0 0' };
        const asideStyle = { fontSize: '1em', opacity: 0.7, margin: '0 0 20px 0' };

        /*const secretKey = "hello";
        const hash = md5(secretKey);
        console.log("hash: ", hash);*/

        return (
            <Page title={'Hello!'} hue={261} saturation={56} brightness={58}>

                <p>If you've got here and you're not a beta </p>

                <div style={{backgroundColor: '#cfaf2f', padding: 20, borderRadius:10}}>
                    <Field
                        name="betakey"
                        label="Beta Testing unlock key: "
                        component={FormRenderField}
                    />
                </div>

                <h2>Welcome to ArtFly. Let's set you up.</h2>
                <form onSubmit={handleSubmit((values) => this.props.addNewUser(this.props.userId, values))}>
                    <Field
                        name="email"
                        label="Email: "
                        component={FormRenderField}
                    />

                    <h2>Add an Artist.</h2>
                    <p style={normalStyle}>You need at least one artist to get going.</p>
                    <p style={asideStyle}>(You can add more artists later on the 'Settings' page)</p>
                    <Field
                        name="firstName"
                        label="First Name: "
                        component={FormRenderField}
                    />
                    <Field
                        name="lastName"
                        label="Last Name: "
                        component={FormRenderField}
                    />
                    <section className={'page-main-section'}>
                        <Butt fullWidth={true} label={'Set up'} type="submit"/>
                        <Butt fullWidth={true} label={'Cancel'} type="button" onClick={this.props.signOutUser}/>
                    </section>
                </form>
            </Page>
        );
    }
}

const validate = values => {
    const errors = {};

    if (!values.firstName) {
        errors.firstName = 'Required'
    }
    else if (values.firstName.length > 15) {
        errors.firstName = 'Must be 15 characters or less'
    }

    if (!values.lastName) {
        errors.lastName = 'Required'
    }
    else if (values.lastName.length > 15) {
        errors.lastName = 'Must be 15 characters or less'
    }

    if (!values.email) {
        errors.email = 'Required'
    }
    else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address'
    }

    return errors
};

// Decorate with reduxForm(). It will read the initialValues prop provided by connect()
NewUserForm = reduxForm({
    form: 'NewUserForm', // a unique identifier for this form
    validate
})(NewUserForm);

export default NewUserForm