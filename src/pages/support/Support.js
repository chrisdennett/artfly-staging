import React from 'react';
import { connect } from 'react-redux';
// styles
import './support_styles.css';
// ui
import { Button, ButtonIcon } from 'rmwc/Button';
import { Typography } from 'rmwc/Typography';
// comps
import AppBar from "../../components/appBar/AppBar";
import Footer from "../../components/footer/Footer";

const Support = ({ account }) => {

    const accountId = account.accountId ?
        <code style={{ backgroundColor: '#fff', padding: 10 }}>{account.accountId}</code> : '';

    const emailStr = `mailto:chris@artfly.io?subject=ArtFly Support Query&body=AccountID:${account.accountId ? account.accountId : 'NONE'}`;

    return (
        <div className={'standard-page'}>
            <AppBar title={'Support'} />

            <div className={'standard-page--content'}>

                <Typography use={'headline6'}>
                    Reporting a problem
                </Typography>

                <Typography use={'body1'} tag={'p'}>
                    Try to include as much information as possible about the problem so I can get to the solution as
                    quickly as possible. This type of thing:
                </Typography>

                <Typography use={'body1'}>
                    <ul>
                        <li>Can your repeat the problem? If so, can you tell me the steps to follow.</li>
                        <li>A link to the page going wrong</li>
                        <li>Device: E.g. laptop, iPhone</li>
                        <li>Browser: E.g. Chrome, Safari</li>
                    </ul>
                </Typography>

                <Typography use={'body1'} tag={'p'}>
                    Email your query to me and I'll look into it as soon as I can.
                </Typography>

                <Typography use={'body1'} tag={'p'}>
                    If you have an account, your ID {accountId} will be automatically copied to the email to help me
                    look into the problem.
                </Typography>

                <Button raised tag={'a'} href={emailStr}>
                    <ButtonIcon icon="email" /> chris@artfly.io
                </Button>

                <Typography use='body1' className={'support--browserSuggestions'}>
                    I'd recommend using one of these browsers:
                <ul>
                        <li>
                            <Button tag={'a'} href={'https://www.google.com/chrome/'}>Chrome</Button>
                            (used by 72% of people)
                    </li>
                        <li>
                            <Button tag={'a'} href={'https://www.mozilla.org/en-GB/firefox/new/'} >Firefox</Button>
                            (used by 10% of people)
                    </li>
                    </ul>
                </Typography>

            </div>
            <Footer />
        </div>
    )
};

const mapStateToProps = (state) => {
    return {
        account: state.account
    }
};

export default connect(mapStateToProps)(Support);