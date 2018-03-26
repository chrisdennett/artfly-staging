import React, { Component } from "react";
// ref: https://stackoverflow.com/questions/44341293/custom-mailchimp-signup-form-in-react
// styles
import './signUpForm_styles.css';

class SignUpForm extends Component {
    constructor(props) {
        super(props);

        this.state = { emailValue: '' };
    }

    render() {
        return (
            <form action="https://artfly.us17.list-manage.com/subscribe/post"
                  method="POST" noValidate>
                <input type="hidden" name="u" value="5424efae70ec7f11ae2b175d6"/>
                <input type="hidden" name="id" value="6c7175f979"/>
                <label htmlFor='MERGE0' className={'signUpForm--label'}>
                    <input
                        type="email"
                        placeholder={'email address'}
                        className={'signUpForm--input'}
                        name="EMAIL"
                        id="MERGE0"
                        value={this.state.emailValue}
                        onChange={ (e)=>{this.setState({emailValue: e.target.value});} }
                        autoCapitalize="off"
                        autoCorrect="off"
                    />
                </label>

                <input type="submit"
                       value="Get Email Updates"
                       name="subscribe"
                       id="mc-embedded-subscribe"
                       className={'signUpForm--submitButt'}/>

                <div style={{position: 'absolute', left: '-5000px'}} aria-hidden='true' aria-label="Please leave the following three fields empty">
                    <label htmlFor="b_name">Name: </label>
                    <input type="text" name="b_name" tabIndex="-1" value="" placeholder="Freddie" id="b_name"/>

                    <label htmlFor="b_email">Email: </label>
                    <input type="email" name="b_email" tabIndex="-1" value="" placeholder="youremail@gmail.com" id="b_email"/>

                    <label htmlFor="b_comment">Comment: </label>
                    <textarea name="b_comment" tabIndex="-1" placeholder="Please comment" id="b_comment"></textarea>
                </div>
            </form>
        )
    }
}

export default SignUpForm