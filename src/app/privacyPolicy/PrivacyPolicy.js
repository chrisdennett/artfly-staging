import React from 'react';
import { connect } from 'react-redux';
// ui
import { Typography } from 'rmwc/Typography';
import { Button } from 'rmwc/Button';
// comps
import { TempScreenAppBar } from "../appBar/AppBar";
// actions
import { UpdateUrl } from "../../actions/UrlActions";

const PrivacyPolicy = ({ UpdateUrl }) => {
    return (
        <div className={'privacyPolicyPage'}>
            <TempScreenAppBar title={'Privacy Policy'}
                              isFixed={true}
                              onCloseClick={() => UpdateUrl('/')}/>


            <div style={{ padding: 20, marginTop: 60, maxWidth: 650 }}>
                <Typography style={{marginBottom:0, paddingBottom:0}} use={'headline4'} tag={'h2'}>Privacy Policy</Typography>
                <Typography style={{marginTop:5, color:'#7a7a7a'}} use={'subheading1'} tag={'p'}>Last updated: 31st July 2018</Typography>

                <Typography use={'headline6'} tag={'h2'}>Who we are</Typography>
                <Typography use={'body1'}>
                    <p>
                        ArtFly.io is a website run by Chris Dennett in Ulverston, Cumbria, UK.  I may use terms like we, us, our when describing ArtFly because I'm hoping one day they'll be more of us, but for now it's just me!
                    </p>
                    <p>
                        If you have any questions about how we (see what I mean) collect, store and use you information please contact us (there I go again) using the email below:
                    </p>
                    <p>
                        Contact email: <a href={'mailto:chris@artfly.io'}>chris@artfly.io</a>
                    </p>
                </Typography>

                <Typography use={'headline6'} tag={'h2'}>Cookies</Typography>
                <Typography use={'body1'}>
                    <p>ArtFly uses cookies and similar web browser technologies, like localStorage, to help make it
                        easier to use the site. For example, we use them to help keep you signed in and remember if you've clicked the "Okay" on the cookie popup.</p>

                    <p>We also use <a href={'https://marketingplatform.google.com/about/analytics/'}  rel="noopener noreferrer" target={'_blank'}>Google
                        Analytics</a> cookies to gather information about how the site is used by visitors. For example, we
                        may measure how often one of ArtFly's features is used to see if it's worth improving. We use this information to help plan
                        development of new features.</p>
                </Typography>

                <Typography use={'headline6'} tag={'h2'}>Artwork and Gallery data</Typography>
                <Typography use={'body1'}>
                    <p>All the Artworks and Galleries you create on ArtFly are open to all to see.</p>
                </Typography>



                <Typography use={'headline6'} tag={'h2'}>Data for users who sign up</Typography>
                <Typography use={'body1'}>
                    <p>If you sign up for an ArtFly free or paid account we store you log in details, name and email
                        address as well as you're current subscription plan.</p>
                    <p>Your log in information and current subscription </p>
                    <p>If you want to remove all you data from ArtFly you can do so through the <Button
                        onClick={() => UpdateUrl('/accountDelete')}>Account Delete Page</Button> once logged in.</p>
                </Typography>

                <Typography use={'headline6'} tag={'h2'}>Subscriptions / Payments</Typography>
                <Typography use={'body1'}>

                    <p>ArtFly uses a company called <a href={'https://paddle.com/'} target={'_blank'} rel="noopener noreferrer">Paddle</a> to
                        secure all payment information. You can find their <a
                            href={'https://paddle.com/privacy-buyers/'} target={'_blank'} rel="noopener noreferrer">Privacy Policy</a> and <a
                            href={'https://paddle.com/legal-buyers/'} target={'_blank'} rel="noopener noreferrer">Terms & Conditions</a></p>

                </Typography>

            </div>
        </div>
    )
};


export default connect(null, { UpdateUrl })(PrivacyPolicy);