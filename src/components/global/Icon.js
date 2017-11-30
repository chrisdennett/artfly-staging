import React from 'react';
// icons
import IconSettings from './icons/IconSettings';
import IconAddArt from "./icons/IconAddArt";
import IconSignOut from "./icons/IconSignOut";
import IconEditArt from "./icons/IconEditArt";
import IconHome from "./icons/IconHome";

const Icon = function ({type}) {

    let ReturnIcon;

    switch (type){
        case 'home': ReturnIcon = <IconHome />; break;
        case 'editArt': ReturnIcon = <IconEditArt />; break;
        case 'addArt': ReturnIcon = <IconAddArt />; break;
        case 'settings': ReturnIcon = <IconSettings />; break;
        case 'signOut': ReturnIcon = <IconSignOut />; break;

        default: ReturnIcon = <IconSettings />; break;
    }

    return (ReturnIcon);
};

export default Icon;