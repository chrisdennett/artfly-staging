import React, { Component } from "react";
import { Button, ButtonIcon } from 'rmwc/Button';
import { Switch } from 'rmwc/Switch';
import { TextField } from 'rmwc/TextField';

class UserEmailOptions extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        const { userEmail, allowEmailUpdates, updateUser, userId } = this.props;

        const emailButtonText = userEmail ? 'Change email' : 'Add email';

        return (
            <div>
                <div className={'userProfile--detail'} style={{padding:0}}>
                    <div className={'userProfile--detail--type'}>
                        <TextField type={'email'}
                                   outlined
                                   className={'userProfile--emailTextfield'}
                                   label={'Email address:'}/>
                    </div>

                    <div className={'userProfile--detail--value'}>
                        <Button raised><ButtonIcon>email</ButtonIcon>{emailButtonText}</Button>
                    </div>

                </div>
                {userEmail &&
                <div className={'userProfile--detail'}>
                    <div className={'userProfile--detail--type'}>Let me send you email updates:</div>
                    <div className={'userProfile--detail--value'}>
                        <Switch
                            checked={allowEmailUpdates}
                            onChange={e => updateUser(userId, { allowEmailUpdates: e.target.checked })}>
                            Allow email updates
                        </Switch>
                    </div>
                </div>
                }
            </div>
        );
    }
}

export default UserEmailOptions;