import React, { Component } from "react";
// material ui
import { Button, ButtonIcon } from 'rmwc/Button';
import { TextField } from 'rmwc/TextField';

class UserEmailOptions extends Component {

    constructor(props) {
        super(props);

        this.state = { inEditMode: false, unsavedEmail: '' }
    }

    render() {
        const { userEmail, updateUser, userId } = this.props;
        const { inEditMode, unsavedEmail } = this.state;
        let currentEmailValue = unsavedEmail.length > 0 ? unsavedEmail : userEmail;
        if (currentEmailValue === null) currentEmailValue = '';
        const hasUnsavedChanges = unsavedEmail.length > 0 && userEmail !== unsavedEmail;

        return (
            <div>

                {!inEditMode &&
                <div className={'userProfile--detail'}>
                    <div className={'userProfile--detail--type'}>Email:</div>
                    <div className={'userProfile--detail--value'}>{userEmail}</div>
                </div>
                }

                {inEditMode &&
                <div className={'userProfile--detail--col'} style={{ padding: 0 }}>
                    <TextField type={'email'}
                               className={'userProfile--email'}
                               outlined
                               onChange={(e) => this.setState({ unsavedEmail: e.target.value })}
                               value={currentEmailValue}
                               label='Email address:'/>

                    {hasUnsavedChanges &&
                    <div className={'userProfile--detail--buttons'}>
                        <Button>Cancel</Button>
                        <Button raised
                                onClick={() => updateUser(userId, { email: currentEmailValue })}
                                theme="secondary-bg on-secondary">
                            <ButtonIcon>save</ButtonIcon>
                            Save
                        </Button>
                    </div>
                    }
                </div>
                }
            </div>
        );
    }
}

export default UserEmailOptions;