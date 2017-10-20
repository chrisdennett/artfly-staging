// externals
import React, { Component } from "react";
import styled from 'styled-components';
// components
import Title from "./assets/Title";
import SignInContainer from "../SignIn/SignInContainer";
// import Link from "../global/Link";
// import LinkButt from "../global/LinkButt";

const PageWrapper = styled.div`
    background-color: papayawhip;
    height: 100vh;
`;

const Heading = styled.div`
    padding: 5rem 10px 2rem 10px;
`;

const MaxWidthSection = styled.div`
    max-width: 960px;
    margin: 0 auto;
    padding: 0 1rem;
`;

const WarningBox = styled.div`
    padding: 30px 0;
    text-align: center;
    color: white;
    background-color: palevioletred;
    border-top: 2px solid rgba(0,0,0,0.1);
    border-bottom: 2px solid rgba(0,0,0,0.1);
    margin: 60px 0;
`;

const TagLine = styled.p`
    text-align: center;
    margin: 10px 0;
    color: rgba(0,0,0,0.5);
    font-size: 1.6rem;
    
    @media (max-width: 600px) {
		font-size: 1.3rem;
		}
`;

const WarningHeader = styled.h2`
    margin-top: 20px;
    padding: 30px 10px;
`;

const WarningSection = styled.p`
    margin-top: 20px;
    padding: 30px 10px 0 10px;
    
    border-top: dashed white 1px;
`;

const EmailLink = styled.a`
    color: white;
    padding: 3px 5px;
    border-radius: 5px;
    
    &:hover {
			background: rgba(0,0,0,0.2);
		}
`;

class Home extends Component {
    render() {
        return (
            <PageWrapper>
                <MaxWidthSection>
                    <Heading>
                        <Title/>

                        <TagLine>Don't let artistic creations languish in a drawer. <br/>Let the
                            Art Fly free!</TagLine>
                    </Heading>
                </MaxWidthSection>

                <WarningBox>
                    <WarningHeader>Artfly's not quite ready for everyone yet.</WarningHeader>
                    <WarningSection>If you're helping with testing — Thank you — sign in below:</WarningSection>
                    <SignInContainer/>
                    <WarningSection>If you'd like to help with testing or find out more: <EmailLink
                        href={'mailto:chris@gmail.com'} target={'_blank'}>drop me an email</EmailLink>.</WarningSection>
                </WarningBox>

                {/*<MaxWidthSection>
                    <h2>What will it be for</h2>
                    <p>When done it'll be a place for storing, sharing and encouraging your children's boundless
                        creativity</p>
                    <ul>
                        <li>Somewhere I can quickly and easily</li>
                    </ul>

                </MaxWidthSection>*/}

                {/* <MaxWidthSection>
                        <h2>Some early screen shots:</h2>

                        <img style={{ maxWidth: '100%' }} src={'../gallery-example.png'} alt={`gallery`}/>

                        <h2>How it will work</h2>
                        <p></p>
                        <ul>
                            <li>Snap a photo of the artwork.</li>
                            <li>Add a frame and a room.</li>
                            <li>Build your own gallery.</li>
                            <li>Share with the world.</li>
                        </ul>
                    </MaxWidthSection>*/}
            </PageWrapper>
        );
    }
}

export default Home;