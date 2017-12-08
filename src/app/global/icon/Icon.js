import React from 'react';
// icons
import IconSettings from './icons/IconSettings';
import IconAddArt from "./icons/IconAddArt";
import IconSignOut from "./icons/IconSignOut";
import IconEditArt from "./icons/IconEditArt";
import IconHome from "./icons/IconHome";
import IconSignIn from "./icons/IconSignIn";
import IconLogo from "./icons/IconLogo";

const Icon = function ({type, fill, stroke}) {

    let ReturnIcon;

    switch (type){
        case 'logo': ReturnIcon = <IconLogo fill={fill} stroke={stroke}/>; break;
        case 'home': ReturnIcon = <IconHome fill={fill} stroke={stroke}/>; break;
        case 'editArt': ReturnIcon = <IconEditArt fill={fill} stroke={stroke}/>; break;
        case 'addArt': ReturnIcon = <IconAddArt fill={fill} stroke={stroke}/>; break;
        case 'settings': ReturnIcon = <IconSettings fill={fill} stroke={stroke}/>; break;
        case 'signIn': ReturnIcon = <IconSignIn fill={fill} stroke={stroke}/>; break;
        case 'signOut': ReturnIcon = <IconSignOut fill={fill} stroke={stroke}/>; break;

        default: ReturnIcon = <IconSettings />; break;
    }

    return (ReturnIcon);
};

export default Icon;