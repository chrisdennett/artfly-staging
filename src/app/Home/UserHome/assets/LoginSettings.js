import React from 'react';
import Butt from "../../../global/Butt/Butt";
import IconSignOut from "../../../global/icon/icons/IconSignOut";

const LoginSettings = function ({signOutUser}) {
    return (
        <div style={{marginBottom:20}}>
            <Butt svgIcon={<IconSignOut width={25} height={25}/>} label={'Sign out'} onClick={signOutUser}/>
        </div>
    )
};

export default LoginSettings;