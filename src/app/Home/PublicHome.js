import React from 'react';
// styles
import './publicHome.css';
// components
import SignInContainer from "../SignIn/SignInContainer";
// import SignInContainer from "../SignIn/SignInContainer";
// import Link from "../global/Link";
// import LinkButt from "../global/LinkButt";

const PublicHome = function () {
    return (
        <div>
            <SignInContainer/>

            <div className='pubicHome--betaSection'>
                <svg height="40" width="40" viewBox="0 0 100 94">
                    <path
                        d="M97.06 50H85.3V27.69l6.491-6.491a2.94 2.94 0 1 0-4.159-4.159l-6.491 6.491h-7.422c-.01-13-10.53-23.53-23.54-23.53-13 0-23.53 10.52-23.53 23.53H18.86l-7.962-7.962a2.941 2.941 0 1 0-4.16 4.159L14.7 27.69V50H2.94a2.941 2.941 0 0 0-.001 5.881h11.76v4.412c0 6.734 2.069 12.99 5.604 18.18l-10.62 10.63a2.94 2.94 0 1 0 4.159 4.159l10.22-10.22c5.868 5.933 14.01 9.615 22.99 9.615h5.882c8.984 0 17.12-3.682 22.99-9.614l10.22 10.22a2.94 2.94 0 1 0 4.159-4.159l-10.61-10.64a32.164 32.164 0 0 0 5.603-18.18v-4.412h11.76a2.941 2.941 0 0 0 0-5.882zM50.18 5.88c9.746 0 17.65 7.901 17.65 17.65H32.54c0-9.746 7.901-17.65 17.65-17.65zm2.757 80.88V43.38a2.206 2.206 0 0 0-2.206-2.206H49.26a2.206 2.206 0 0 0-2.206 2.206v43.38c-14.6 0-26.47-11.87-26.47-26.47V29.41h58.82v30.88c0 14.6-11.87 26.47-26.47 26.47z"/>
                </svg>


                <p className='pubicHome--smallP'>ArtFly is currently in private beta.</p>
                <p className='pubicHome--smallP'>I'm hoping it'll become a place to encourage creativity, especially for
                    kids.</p>
                <p className='pubicHome--smallP'>An online gallery and art maker to encourage and celebrate every artwork, big or
                    small.</p>

            </div>

            <div className='pubicHome--featuresSection'>
                <h2>A place to create, display and share</h2>
                <p>Here's how it'll work:</p>

                <div className='pubicHome--featureSection--feature'>
                    <p>Add a Photo of the artwork</p>
                </div>

                <div className='pubicHome--featureSection--feature'>
                    <p>Trim and frame it</p>
                </div>

                <div className='pubicHome--featureSection--feature'>
                    <p>Hang it in your gallery and share it</p>
                </div>

                <div className='pubicHome--featureSection--feature'>
                    <p>Use your artwork to develop new creations in the ArtFly studio</p>
                </div>

            </div>
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

        </div>
    )
};

export default PublicHome;