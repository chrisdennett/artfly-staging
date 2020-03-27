import React from 'react';
import { connect } from 'react-redux';
// styles
import './errorScreen_styles.css';
// ui
import { Typography } from '@rmwc/typography';
import { Button } from '@rmwc/button';
// actions
import { UpdateUrl } from "../../actions/UrlActions";
// comps
import HomeIconButton from '../../pages/home/homeIconButton/HomeIconButton';

const ErrorScreen = ({ onReportProblem }) => {

    return (
        <div className={'errorScreen'}>
            <HomeIconButton logoWidth={50} logoHeight={50} />

            <Typography use={"headline4"} className={'errorScreen--title'}>
                Arrrrgh! Something's gone wrong.
            </Typography>

            <Typography use='body1' className={'errorScreen--body'}>
                I'm really sorry about that.  The error report has been sent,
                but if you'd like to add extra details click the button below.
            </Typography>

            <Button raised onClick={onReportProblem} >
                Report feedback
            </Button>

            <Button onClick={() => UpdateUrl('/')} className={'errorScreen--homeButt'}>
                Go to homepage
            </Button>

            <Typography use='body1' className={'errorScreen--footer'}>
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
    )

}

export default connect(null, { UpdateUrl })(ErrorScreen);