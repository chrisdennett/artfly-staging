import React from 'react';
// comps
import AppBar from "../../components/appBar/AppBar";
import Footer from "../../components/footer/Footer";

const Support = () => {
    return (
        <div className={'standard-page'}>
            <AppBar title={'Support'}/>

            <div className={'standard-page--content'}>
            Here is some content for ya.
            </div>
            <Footer/>
        </div>
    )
};

export default Support;