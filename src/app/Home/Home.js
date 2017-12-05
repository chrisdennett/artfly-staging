// externals
import React, { Component } from "react";
import styled from 'styled-components';
// components
import Title from "./assets/Title";
import Page from "../global/Page";
// import SignInContainer from "../SignIn/SignInContainer";
// import Link from "../global/Link";
// import LinkButt from "../global/LinkButt";

class Home extends Component {
    render() {
        return (
            <Page title={'Home'}>

                <Heading>
                    <div>
                        <Title/>
                    </div>
                    <TagLine>Artworks don't belong in a drawer, bin or hard drive. <br/>There's a better place...</TagLine>
                </Heading>


                <BetaSection>
                    <svg height="40" width="40" viewBox="0 0 100 94">
                        <path
                            d="M97.06 50H85.3V27.69l6.491-6.491a2.94 2.94 0 1 0-4.159-4.159l-6.491 6.491h-7.422c-.01-13-10.53-23.53-23.54-23.53-13 0-23.53 10.52-23.53 23.53H18.86l-7.962-7.962a2.941 2.941 0 1 0-4.16 4.159L14.7 27.69V50H2.94a2.941 2.941 0 0 0-.001 5.881h11.76v4.412c0 6.734 2.069 12.99 5.604 18.18l-10.62 10.63a2.94 2.94 0 1 0 4.159 4.159l10.22-10.22c5.868 5.933 14.01 9.615 22.99 9.615h5.882c8.984 0 17.12-3.682 22.99-9.614l10.22 10.22a2.94 2.94 0 1 0 4.159-4.159l-10.61-10.64a32.164 32.164 0 0 0 5.603-18.18v-4.412h11.76a2.941 2.941 0 0 0 0-5.882zM50.18 5.88c9.746 0 17.65 7.901 17.65 17.65H32.54c0-9.746 7.901-17.65 17.65-17.65zm2.757 80.88V43.38a2.206 2.206 0 0 0-2.206-2.206H49.26a2.206 2.206 0 0 0-2.206 2.206v43.38c-14.6 0-26.47-11.87-26.47-26.47V29.41h58.82v30.88c0 14.6-11.87 26.47-26.47 26.47z"/>
                    </svg>


                    <SmallTextParagraph>ArtFly is currently in private beta.</SmallTextParagraph>
                    <SmallTextParagraph>I'm hoping it'll become a place to encourage creativity, especially for
                        kids.</SmallTextParagraph>
                    <SmallTextParagraph>An online gallery and art maker to encourage and celebrate every artwork, big or
                        small.</SmallTextParagraph>

                </BetaSection>

                <FeaturesSection>
                    <h2>A place to create, display and share</h2>
                    <p>Here's how it'll work:</p>

                    <Feature>
                        <p>Add a Photo of the artwork</p>
                    </Feature>

                    <Feature>
                        <p>Trim and frame it</p>
                    </Feature>

                    <Feature>
                        <p>Hang it in your gallery and share it</p>
                    </Feature>

                    <Feature>
                        <p>Use your artwork to develop new creations in the ArtFly studio</p>
                    </Feature>

                </FeaturesSection>

                <FooterSection>
                    <h3>About us</h3>
                    <FooterParagraph>
                        ArtFly is a massive global corporate monster run by the high-powered business types below from the sprawling metroplis of Ulverson, Cumbria, UK.
                    </FooterParagraph>
                    <PersonTile>
                        Chris
                    </PersonTile>
                    <PersonTile>
                        Jennie
                    </PersonTile>
                    <PersonTile>
                        Holly
                    </PersonTile>
                    <PersonTile>
                        Dot
                    </PersonTile>
                </FooterSection>

                {/*<div style={{ backgroundColor: '#fff7d7' }}>
                    hello
                </div>*/}

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
            </Page>
        );
    }
}

export default Home;

const Heading = styled.div` 
    padding: 5rem 10px 4rem 10px;
`;

const SmallTextParagraph = styled.p`
    font-size: 1.1rem;
`;

const BetaSection = styled.div`
    text-align: center;
    color: rgba(0,0,0,0.7);
    padding: 4rem 0;
    border-top: 2px solid rgba(0,0,0,0.1);
`;

const FeaturesSection = styled.div`
    color: rgba(0,0,0,0.7);
    padding: 4rem 2rem;
    border-top: 2px solid rgba(0,0,0,0.1);
    border-bottom: 2px solid rgba(0,0,0,0.1);
`;

const Feature = styled.div`
padding: 30px;
`;

const TagLine = styled.div`
    text-align: center;
    padding-top: 10px;
    color: rgba(0,0,0,0.5);
    font-size: 1.2rem;
    line-height: 1.6rem;
    
    @media (max-width: 600px) {
		font-size: 1.3rem;
		}
`;

const PersonTile = styled.div`

`;

const FooterSection = styled.div`
    border-top: 2px solid rgba(0,0,0,0.1);
    padding: 4rem;
`;

const FooterParagraph = styled.p`
    font-size: 1rem;
    margin-bottom: 1rem;
`;

/*
const EmailLink = styled.a`
    color: white;
    padding: 3px 5px;
    border-radius: 5px;
    
    &:hover {
			background: rgba(0,0,0,0.2);
		}
`;*/
