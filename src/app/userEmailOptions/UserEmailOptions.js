import React, { Component } from "react";
import { Button, ButtonIcon } from 'rmwc/Button';
import { TextField } from 'rmwc/TextField';
import { Switch } from 'rmwc/Switch'
import { Icon } from 'rmwc/Icon';

class UserEmailOptions extends Component {

    constructor(props) {
        super(props);

        this.state = { inEditMode: true, unsavedEmail: '' }
    }

    render() {
        const { userEmail, allowEmailUpdates=false, updateUser, userId } = this.props;
        const { inEditMode, unsavedEmail } = this.state;
        let currentEmailValue = unsavedEmail.length > 0 ? unsavedEmail : userEmail;
        if (currentEmailValue === null) currentEmailValue = '';
        const hasUnsavedChanges = unsavedEmail.length > 0 && userEmail !== unsavedEmail;

        return (
            <div>
                <div className={'userProfile--detail--col'} style={{ padding: 0 }}>
                    {inEditMode &&
                    <TextField type={'email'}
                               className={'userProfile--email'}
                               outlined
                               onChange={(e) => this.setState({ unsavedEmail: e.target.value })}
                               value={currentEmailValue}
                               label='Email address:'/>
                    }

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


                {userEmail &&
                <div className={'userProfile--detail'}>
                    <div className={'userProfile--detail--type'}>Get brill email updates:</div>
                    <div className={'userProfile--detail--value'}>
                        <Switch
                            checked={allowEmailUpdates}
                            onChange={() => updateUser(userId, { allowEmailUpdates: !allowEmailUpdates })}>

                            {!allowEmailUpdates &&
                            <Icon use="sentiment_very_dissatisfied" className={'mood-icon'}/>
                            }

                            {allowEmailUpdates &&
                            <Icon use="sentiment_very_satisfied" className={'mood-icon'}/>
                            }

                        </Switch>
                    </div>
                </div>
                }
            </div>
        );
    }
}

export default UserEmailOptions;