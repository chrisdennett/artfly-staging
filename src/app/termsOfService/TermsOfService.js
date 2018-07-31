import React from 'react';
import { connect } from 'react-redux';
// actions
import { UpdateUrl } from "../../actions/UrlActions";
// comps
import { TempScreenAppBar } from "../appBar/AppBar";

const TermsOfService = ({ UpdateUrl }) => {
    return (
        <div className={'termsOfServicePage'}>
            <TempScreenAppBar title={'Terms of Service'}
                              isFixed={true}
                              onCloseClick={() => UpdateUrl('/')}/>

            <div style={{ padding: 20, marginTop: 60, maxWidth: 650 }}>

                <h2>Terms of Service</h2>
                <section>
                    <div className='terms--plainEnglishBit'>
                        By being a member and using ArtFly, you agree to everything on this page. We have to do this
                        to protect both you and us and make running this website possible. If you break these terms,
                        you can't use ArtFly anymore.
                    </div>
                    <div className='terms--legalBit'>
                        These Terms of Service (the “<strong>Terms of Service</strong>”) are a contract between you,
                        the user, and ArtFly run by Chris Dennett from 30 The Gill, Ulverston, Cumbria, LA12 7BP
                        (“<strong>ArtFly</strong>”). ArtFly operates ArtFly.io (the
                        “<strong>ArtFly Site</strong>”) and the Artwork creation services therein. By using the
                        ArtFly Site and any services accessible from the ArtFly Site, you are agreeing to be bound by
                        these Terms of Service. If you do not agree to these Terms of Service or any part thereof, your
                        only remedy is to not use the ArtFly Site or any services or products offered on the ArtFly Site
                        or on any other platform, including mobile applications, offered by ArtFly (collectively, the
                        “Service” or “Services”). VIOLATION OF ANY OF THE TERMS OF SERVICE BELOW WILL RESULT IN THE
                        TERMINATION OF YOUR RIGHT TO USE THE SERVICE, AND ANY ACCOUNT THAT YOU MAY HAVE CREATED AS PART
                        OF THE SERVICE. YOU AGREE TO USE THE SERVICE AT YOUR OWN RISK. ArtFly reserves the right to
                        refuse service to anyone for any reason at any time.
                    </div>
                </section>

                <h3>Your Account</h3>
                <section>
                    <div className='terms--plainEnglishBit'>
                        Your account is your responsibility. If your account is compromised (e.g. someone uses the
                        password you posted on Facebook!) we'll try to help, but we
                        can't guarantee we can fix any damages.
                    </div>
                    <div className='terms--legalBit'>
                        In order to open an account on the ArtFly Site (the “<strong>Account</strong>”), you must
                        (i) agree to these Terms of Service, and (ii) provide any other information required by ArtFly
                        during the registration process. You will update this information to maintain its accuracy
                        during the time you are using the Service. You are responsible for maintaining the security
                        of your account and password. ArtFly cannot and will not be liable for any loss or damage from
                        your failure to comply with this security obligation. You are also responsible for all content,
                        images, or text that you may post on the ArtFly Site (the “<strong>Content</strong>”) and
                        activity that occurs under your Account (even when Content is posted by others who have access
                        to your Account). Any information submitted by you shall be subject to ArtFly’s <a
                        href="http://artfly.io/privacyPolicy/">Privacy Policy</a>. Accounts
                        registered by “bots” or other
                        automated methods are not permitted.
                    </div>

                </section>

                <h3>Our License to You</h3>
                <section>
                    <div className='terms--plainEnglishBit'>
                        Don't copy ArtFly itself.
                    </div>
                    <div className='terms--legalBit'>
                        ArtFly hereby grants you a non-exclusive, non-transferable, worldwide right to access and
                        use
                        the ArtFly Site, solely with supported browsers through the Internet for your own internal
                        purposes, subject to these Terms of Service. You may not permit the ArtFly Site to be used
                        by or
                        for the benefit of unauthorized third parties. Nothing in the Terms of Service shall be
                        construed to grant you any right to transfer or assign rights to access or use the ArtFly
                        Site.
                        All rights not expressly granted to you are reserved by ArtFly and its licensors. You shall
                        not
                        (i) modify or make derivative works based upon the ArtFly Site; (ii) reverse engineer or
                        access
                        the ArtFly Site in order to (a) build a competitive product or service, (b) build a product
                        using similar features, functions or graphics of the ArtFly Site, or (c) copy any features,
                        functions or graphics of the ArtFly Site. You further acknowledge and agree that, as between
                        the
                        parties, ArtFly owns all right, title, and interest in and to the ArtFly Site, including all
                        intellectual property rights therein.
                    </div>

                </section>

                <h3>Your License to Us</h3>
                <section>
                    <div className='terms--plainEnglishBit'>
                        All Artworks and Galleries are public.
                    </div>
                    <div className='terms--legalBit'>
                        By submitting Artworks and Gallery content to the ArtFly Site, you grant ArtFly and visitors
                        to ArtFly the right to view and share your galleries and artworks. Don't put anything on ArtFly
                        where that wouldn't be OK. <br/>
                    </div>
                </section>
                <section>
                    <div className='terms--plainEnglishBit'>
                        Don't put nasty or copyright-infringing things on ArtFly.
                    </div>
                    <div className='terms--legalBit'>
                        Additionally, by uploading Content to the ArtFly Site, you warrant that you have not and
                        will not contribute any Content that (a) infringes, violates or otherwise interferes with any
                        copyright or trademark of another party, (b) reveals any trade secret, unless the trade secret
                        belongs to you or you have the owner's permission to disclose it, (c) infringes any intellectual
                        property right of another or the privacy or publicity rights of another, (d) is libelous,
                        defamatory, abusive, threatening, harassing, hateful, offensive or otherwise violates any law or
                        right of any third party, (e) creates an impression that you know is incorrect, misleading, or
                        deceptive, including by impersonating others or otherwise misrepresenting your affiliation with
                        a person or entity; (f) contains other people's private or personally identifiable information
                        without their express authorization and permission, and/or
                        (g) contains or links to a virus, trojan horse, worm, time bomb or other computer
                        programming
                        routine or engine that is intended to damage, detrimentally interfere with, surreptitiously
                        intercept or expropriate any system, data or information. ArtFly reserves the right in its
                        discretion to remove any Content from the ArtFly Site, suspend or terminate your account at
                        any
                        time, or pursue any other remedy or relief available under equity or law.
                    </div>
                </section>
                <section>
                    <div className='terms--plainEnglishBit'>
                        Don't use ArtFly to do bad things. If you do, we'll remove your account and you personally
                        are
                        responsible for any trouble you cause.
                    </div>
                    <div className='terms--legalBit'>
                        You are responsible for your use of the Service, for any Content you provide, and for any
                        consequences thereof, including the use of your Content by other users and third party
                        partners.
                        You understand that your Content may be republished and if you do not have the right to
                        submit
                        Content for such use, it may subject you to liability. ArtFly will not be responsible or
                        liable
                        for any use of your Content in accordance with these Terms of Service.
                    </div>
                </section>

                <h3>Your Responsibilities</h3>
                <section>
                    <div className='terms--plainEnglishBit'>
                        You need to be 18 or older to sign up for ArtFly. We need these rules to be legally binding
                        and
                        you have to be 18 or older for that to be possible.
                    </div>
                    <div className='terms--legalBit'>
                        The Services are available only to individuals who have the capacity to form legally binding
                        contracts under the law applicable to these Terms of Service. Furthermore, our services are
                        not
                        available to minors (under 18 years of age). If you do not qualify as an authorized user,
                        you
                        are not permitted to use the Services and no contract will be formed between you and ArtFly.
                    </div>
                </section>
                <section>
                    <div className='terms--plainEnglishBit'>
                        If you are under 13, you can't use ArtFly (sorry).<br/>
                        If you are 13 or over but under 18, have your legal guardian sign up for you.
                    </div>
                    <div className='terms--legalBit'>
                        ArtFly relies upon parents or guardians 18 years of age or older to determine if the ArtFly
                        Site
                        and Services are appropriate for the viewing, access, or participation by such individuals
                        under
                        the age of 18. We do not seek or knowingly collect any personal information about children
                        under
                        13 years of age. If we become aware that we have unknowingly collected personal information
                        from
                        a child under the age of 13, we will make commercially reasonable efforts to delete such
                        information from our database.
                    </div>
                </section>
                <section>
                    <div className='terms--plainEnglishBit'>
                        Follow all laws that apply to you, based on where you live or anything else.
                    </div>
                    <div className='terms--legalBit'>
                        You are responsible for all activity occurring under your Accounts and are solely
                        responsible
                        for compliance with all applicable local, state, national and foreign laws, treaties and
                        regulations relating to your use of the ArtFly Site, including those related to the
                        protection
                        of intellectual property, data privacy, international communications and the transmission of
                        technical or personal data.
                    </div>

                </section>
                <section>
                    <div className='terms--plainEnglishBit'>
                        If your account is hacked, <a href="mailto:chris@artfly.io">let us know</a> right away.
                    </div>
                    <div className='terms--legalBit'>
                        You shall: (i) <a href='mailto:chris@artfly.io'>notify ArtFly</a> immediately of any
                        unauthorized use of any password or account or any other known or suspected breach of
                        security;
                        and (ii) report to ArtFly immediately and use reasonable efforts to stop immediately any
                        copying
                        or distribution of Content that is known or suspected by you.
                    </div>

                </section>
                <section>
                    <div className='terms--plainEnglishBit'>
                        BYO electricity, internet, computer, web browser, etc.
                    </div>
                    <div className='terms--legalBit'>
                        You are responsible for obtaining and maintaining any equipment and ancillary services
                        needed to
                        connect to, access or otherwise use the ArtFly Site, including, without limitation, modems,
                        hardware, server, software, Internet browsers operating system, networking, web servers,
                        long
                        distance and local telephone service, but excluding the ArtFly Site itself (collectively,
                        “<strong>Equipment</strong>”). You shall be responsible for ensuring that such Equipment is
                        compatible with the ArtFly Site. You shall also be responsible for the use, and maintaining
                        the
                        security, of the Equipment.
                    </div>

                </section>
                <section>
                    <div className='terms--plainEnglishBit'>
                        We don't monitor every single thing on ArtFly. It's up to you to do right.
                    </div>
                    <div className='terms--legalBit'>
                        All Content, whether publicly posted or privately transmitted, is the sole responsibility of
                        the
                        person who originated such Content. We may not monitor or control the Content posted via the
                        Services. Any use of or reliance on any Content or materials posted via the Services or
                        obtained
                        by you through the Services is at your own risk. We do not endorse, support, represent or
                        guarantee the completeness, truthfulness, accuracy, or reliability of any Content or
                        communications posted via the Services or endorse any opinions expressed via the Services.
                        You
                        understand that by using the Services, you may be exposed to Content that might be
                        offensive,
                        harmful, inaccurate or otherwise inappropriate. Under no circumstances will ArtFly be liable
                        in
                        any way for any Content, including, but not limited to, any errors or omissions in any
                        Content,
                        or any loss or damage of any kind incurred as a result of the use of any Content made
                        available
                        via the Services or broadcast elsewhere.
                    </div>
                </section>

                <h3>Impermissible Acts</h3>
                <p>As a condition to your use of the ArtFly Site, you agree not to:</p>
                <section>
                    <div className='terms--plainEnglishBit'>
                        Don't be nasty.
                    </div>
                    <div className='terms--legalBit'>
                        upload, post, email, transmit or otherwise make available any information, materials or
                        other
                        content that is illegal, harmful, threatening, abusive, harassing, defamatory, obscene,
                        pornographic, offensive, invades another’s privacy, or promotes bigotry, racism, hatred or
                        harm
                        against any individual or group;
                    </div>
                </section>
                <section>
                    <div className='terms--plainEnglishBit'>
                        Don't be horrible.
                    </div>
                    <div className='terms--legalBit'>
                        phish, collect, upload, post, email, transmit or otherwise make available any login data
                        and/or
                        passwords for other web sites, software or services;
                    </div>
                </section>
                <section>
                    <div className='terms--plainEnglishBit'>
                        Don't be a mean.
                    </div>
                    <div className='terms--legalBit'>
                        forge headers or otherwise manipulate identifiers in order to disguise the origin of any
                        content
                        transmitted through the ArtFly Site;
                    </div>
                </section>
                <section>
                    <div className='terms--plainEnglishBit'>
                        Don't break intellectual property rights.
                    </div>
                    <div className='terms--legalBit'>
                        upload, post, email, transmit or otherwise make available any information, materials or
                        other
                        content that infringes another’s rights, including any intellectual property rights;
                    </div>
                </section>
                <section>
                    <div className='terms--plainEnglishBit'>
                        Don't attack the site with viruses.
                    </div>
                    <div className='terms--legalBit'>
                        interfere with or disrupt the ArtFly Site, or any servers or networks connected to the
                        ArtFly
                        Site, or disobey any requirements, procedures, policies or regulations of networks connected
                        to
                        the ArtFly Site;
                        upload, post, email, transmit or otherwise make available any material that contains
                        software
                        viruses or any other computer code, files or programs designed to interrupt, destroy or
                        limit
                        the functionality of any computer software or hardware or telecommunications equipment;
                    </div>
                </section>
                <section>
                    <div className='terms--plainEnglishBit'>
                        Don't be a rip off the site.
                    </div>
                    <div className='terms--legalBit'>
                        reproduce, duplicate or copy or exploit any other portion of the ArtFly Site, without the
                        express written permission of ArtFly;
                    </div>
                </section>
                <section>
                    <div className='terms--plainEnglishBit'>
                        Don't collect ArtFly user data.
                    </div>
                    <div className='terms--legalBit'>
                        obtain, collect, store or modify the personal information about other users;
                    </div>
                </section>
                <section>
                    <div className='terms--plainEnglishBit'>
                        Don't be a pretend to be ArtFly or a bestie of ArtFly if you're not!
                    </div>
                    <div className='terms--legalBit'>
                        modify, adapt or hack the ArtFly Site or falsely imply that some other site is associated
                        with
                        the ArtFly Site or ArtFly; or
                    </div>
                </section>
                <section>
                    <div className='terms--plainEnglishBit'>
                        Don't break laws.
                    </div>
                    <div className='terms--legalBit'>
                        use the ArtFly Site for any illegal or unauthorized purpose. You must not, in the use of the
                        ArtFly Site, violate any laws in your jurisdiction (including but not limited to copyright
                        laws).
                    </div>
                </section>
                <section>
                    <div className='terms--plainEnglishBit'>
                        We might pop into your account to help with a support request, but we otherwise don't go
                        snooping around.
                        If we are legally required to provide information to the government that they request, we
                        will,
                        but not otherwise.
                    </div>
                    <div className='terms--legalBit'>
                        We reserve the right at all times (but will not have an obligation) to remove or refuse to
                        distribute any Content on the Service and to terminate users. We also
                        reserve the right to access, read, preserve, and disclose any information as we reasonably
                        believe is necessary to (i) satisfy any applicable law, regulation, legal process or
                        governmental request, (ii) enforce the Terms of Service, including investigation of
                        potential
                        violations hereof, (iii) detect, prevent, or otherwise address fraud, security or technical
                        issues, (iv) respond to user support requests, or (v) protect the rights, property or safety
                        of
                        ArtFly, its users and the public.
                    </div>
                </section>

                <h3>Feedback</h3>
                <section>
                    <div className='terms--plainEnglishBit'>
                        If you send us an idea, we might use it, in which case it's protected by all the same rules
                        on
                        this page.
                    </div>
                    <div className='terms--legalBit'>
                        In the course of using the ArtFly Site, you may provide ArtFly with feedback, including but
                        not
                        limited to suggestions, observations, errors, problems, and defects regarding the ArtFly
                        Site
                        (collectively “<strong>Feedback</strong>”). You hereby grant ArtFly a worldwide,
                        irrevocable,
                        perpetual, royalty-free, transferable and sub-licensable, non-exclusive right to use, copy,
                        modify, distribute, display, perform, create derivative works from and otherwise exploit all
                        such Feedback.
                    </div>
                </section>

                <h3>Payment, Refunds, Upgrading and Downgrading</h3>
                Sales are done through Paddle so the legal terms are with them. Paddle's terms can be found here: <a
                href={'https://paddle.com/legal-buyers/'}>Paddle terms</a>

                <section>
                    <div className='terms--plainEnglishBit'>
                        VAT is included..
                        If you are on a paid plan, Paddle will re-bill automatically every 30 days.
                    </div>
                </section>
                <section>
                    <div className='terms--plainEnglishBit'>
                        If you downgrade from a paid to free plan, the maximum artworks allowed will decrease so
                        artworks will be deleted.
                    </div>
                    <div className='terms--legalBit'>
                        DOWNGRADING YOUR ARTFLY PLAN MAY CAUSE THE LOSS OF CONTENT (ARTWORKS), FEATURES, OR CAPACITY
                        OF
                        YOUR ACCOUNT. ARTFLY DOES NOT ACCEPT ANY LIABILITY FOR SUCH LOSS.`
                    </div>
                </section>

                <h3>Violation of these Terms of Service</h3>
                <section>
                    <div className='terms--plainEnglishBit'>
                        We will delete anything that violates these rules. We have the right to take legal action
                        against violations of these rules.
                    </div>
                    <div className='terms--legalBit'>
                        ArtFly reserves the right to investigate and prosecute violations of any of these Terms of
                        Service to the fullest extent of the law. ArtFly may involve and cooperate with law
                        enforcement
                        authorities in prosecuting users who violate the Terms of Service. You acknowledge that
                        ArtFly
                        has no obligation to pre-screen or monitor your access to or use of the ArtFly Site or any
                        information, materials or other content provided or made available through the ArtFly Site,
                        but
                        has the right to do so. You hereby agree that ArtFly may, in the exercise of ArtFly’s sole
                        discretion, remove or delete any entries, information, materials or other content that
                        violates
                        these Terms of Service or that is otherwise objectionable.
                    </div>
                </section>

                <h3>Cancellation and Termination</h3>
                <section>
                    <div className='terms--plainEnglishBit'>
                        If you don't want a ArtFly account anymore, it's up to you to delete it. You can do it right
                        from the profile page on the site.
                    </div>
                    <div className='terms--legalBit'>
                        You are solely responsible for properly canceling your account. You can cancel your account
                        at any time by logging in to your account and going to the Profile page,
                        clicking the Delete Account button and following the steps. You may cancel your payment
                        plan but keep your account by signing in, going to the Profile page, clicking your membership,
                        and clicking the Cancel Subscription button. An email or phone request to cancel your account
                        shall
                        not result in cancellation.
                    </div>
                </section>
                <section>
                    <div className='terms--plainEnglishBit'>
                        If you delete your account, everything in it is gone forever.
                    </div>
                    <div className='terms--legalBit'>
                        Any cancellation of your Account will result in the deactivation or deletion of your Account
                        or your access to your Account, and the forfeiture and relinquishment of all Content in your
                        Account after any remaining subscription term ends.
                        This information cannot be recovered from ArtFly once your Account is cancelled.
                        Please be aware that ArtFly may for a time retain residual information in our backup and/or
                        archival copies of our database. We will make reasonable commercial efforts to delete your
                        information as soon as possible after you communicate that intention to us.
                    </div>
                </section>
                <section>
                    <div className='terms--plainEnglishBit'>
                        If you are a paid user and delete your account, you will not be re-billed.
                    </div>
                    <div className='terms--legalBit'>
                        Cancellations will take effect immediately. Upon the commencement of a new Service period
                        the
                        Service will terminate without additional notice, and you will not be charged for any
                        subsequent
                        Service periods. You will not be provided any refunds for unused time on your Service
                        period.
                    </div>
                </section>
                <section>
                    <div className='terms--plainEnglishBit'>
                        Don't use ArtFly for asset storage for non-ArtFly things.
                    </div>
                    <div className='terms--legalBit'>
                        ArtFly, in its sole discretion, has the right to suspend or terminate your Account if (1)
                        you
                        breach these Terms of Service or (2) your bandwidth usage significantly exceeds the average
                        bandwidth of other users of the Service. In each such case ArtFly may refuse to provide you
                        any
                        current or future use of the ArtFly Site, or any other Service. Any termination of your
                        Account
                        will result in the deactivation or deletion of your Account or your access to your Account,
                        and
                        the forfeiture and relinquishment of all Content in your Account. This information cannot be
                        recovered from ArtFly once your account is terminated; however ArtFly may for a time retain
                        residual information in our backup and/or archival copies of our database.
                    </div>
                </section>

                <h3>Modifications to the ArtFly Site and Prices</h3>


                <section>
                    <div className='terms--plainEnglishBit'>
                        The last thing we plan on doing is shutting down, but if we have to we have to.
                    </div>
                    <div className='terms--legalBit'>
                        ArtFly reserves the right at any time and from time to time to modify or discontinue,
                        temporarily or permanently, the ArtFly Site and Service (or any part thereof) with or
                        without
                        notice.
                    </div>
                </section>
                <section>
                    <div className='terms--plainEnglishBit'>
                        If we change prices we'll give you 30 days of notice first.
                    </div>
                    <div className='terms--legalBit'>
                        Prices of all ArtFly Sites, including but not limited to monthly subscription plan fees to
                        the
                        ArtFly Site, are subject to change upon 30 days notice from ArtFly. Such notice may be
                        provided
                        at any time by posting the changes to the ArtFly Site.
                    </div>
                </section>
                <section>
                    <div className='terms--plainEnglishBit'>
                        Hopefully any change we make to the site is for the better, but if we change something you
                        don't
                        like, it will be up to you to decide if you want to stay on.
                    </div>
                    <div className='terms--legalBit'>
                        ArtFly shall not be liable to you or to any third party for any modification, price change,
                        suspension or discontinuance of the ArtFly Site.
                    </div>

                </section>
                <section>
                    <div className='terms--plainEnglishBit'>
                        This page might change from time to time. We'll let you know through the in-app notification
                        system of any major changes.
                    </div>
                    <div className='terms--legalBit'>
                        ArtFly reserves the right to update and change the Terms of Service from time to time
                        without
                        notice. Any new features that augment or enhance the current ArtFly Site, including the
                        release
                        of new tools and resources, shall be subject to the Terms of Service. Continued use of the
                        ArtFly Site after any such changes shall constitute your consent to such changes.
                    </div>

                </section>

                <h3>Copyright and Content Ownership</h3>
                <section>
                    <div className='terms--plainEnglishBit'>
                        The things you make on ArtFly are yours, "ArtFly" is ours.
                    </div>
                    <div className='terms--legalBit'>
                        All right, title, and interest in and to the Services (excluding Content provided by you),
                        are
                        and will remain the exclusive property of ArtFly and its licensors. The Services are
                        protected
                        by copyright, trademark, and other laws of both the United States and foreign countries.
                        Nothing
                        in the Terms of Service gives you a right to use the ArtFly name or any of the ArtFly
                        trademarks, logos, domain names, and other distinctive brand features. You acknowledge that
                        the
                        ownership in any intellectual property rights (including, for the avoidance of doubt,
                        patents,
                        copyright, rights in databases, trademarks and trade names whether registered or
                        unregistered
                        and subsisting anywhere in the world) in the Services belongs to ArtFly or its third party
                        licensors. Accordingly, any part of the Services may not be used, transferred, copied or
                        reproduced in whole or in part in any manner other than for the purposes of utilizing the
                        Services.
                    </div>

                </section>

                <h3>Notification of Claims of Infringement</h3>
                <section>
                    <div className='terms--plainEnglishBit'>
                        If you need to report a copyright infringement, drop us an email.
                    </div>
                    <div className='terms--legalBit'>
                        If you believe that your work has been copied in a way that constitutes copyright
                        infringement, or your intellectual property rights have been otherwise violated, please notify
                        ArtFly’s
                        agent for notice of claims of copyright or other intellectual property infringement (“Agent”),
                        at <a href='mailto:chris@artfly.io'>chris@artfly.io</a> or:
                        <p>ArtFly<br/>
                            30 The Gill, Ulverston, Cumbria<br/>
                            LA12 7BP<br/>
                            UK</p>
                        <p>Please provide us with a notice including:</p>
                        <ul>
                            <li>Identification of the material on the ArtFly Site that you claim is infringing, with
                                enough detail so that we may locate it on the ArtFly Site;
                            </li>
                            <li>A statement by you that you have a good faith belief that the disputed use is not
                                authorized by the copyright owner, its agent, or the law;<br/>
                                A statement by you declaring under penalty of perjury that (1) the above information
                                in your notice is accurate, and (2) that you are the owner of the copyright interest
                                involved or that you are authorized to act on behalf of that owner;
                            </li>
                            <li>Your address, telephone number, and email address; and</li>
                            <li>Your physical or electronic signature.</li>
                        </ul>
                    </div>

                </section>

                <h3>Disclaimer of Warranties</h3>
                <section>
                    <div className='terms--plainEnglishBit'>
                        There might be downtime. There might be bugs. The features might not always meet your exact
                        needs.
                    </div>
                    <div className='terms--legalBit'>
                        THE SERVICES, AND ALL MATERIALS, INFORMATION, AND SERVICES INCLUDED IN THE ARTFLY SITE ARE
                        PROVIDED ON AN “AS IS” AND “AS AVAILABLE” BASIS, WITH NO WARRANTIES WHATSOEVER. ARTFLY AND
                        ITS
                        LICENSORS EXPRESSLY DISCLAIM TO THE FULLEST EXTENT PERMITTED BY LAW ALL EXPRESS, IMPLIED,
                        AND
                        STATUTORY WARRANTIES, INCLUDING, WITHOUT LIMITATION, THE WARRANTIES OF MERCHANTABILITY,
                        FITNESS
                        FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT OF PROPRIETARY RIGHTS. ARTFLY AND ITS
                        LICENSORS
                        DISCLAIM ANY WARRANTIES REGARDING THE SECURITY, RELIABILITY, TIMELINESS, AND PERFORMANCE OF
                        THE
                        SERVICES. ARTFLY DOES NOT WARRANT THAT (I) THE SERVICE WILL MEET YOUR SPECIFIC
                        REQUIREMENTS,
                        (II) THE SERVICE WILL BE UNINTERRUPTED, TIMELY, SECURE OR ERROR-FREE, (III) THE RESULTS THAT
                        MAY
                        BE OBTAINED FROM THE USE OF THE SERVICE WILL BE ACCURATE OR RELIABLE, (IV) THE QUALITY OF
                        ANY
                        PRODUCTS, SERVICES, INFORMATION, OR OTHER MATERIAL PURCHASED OR OBTAINED BY YOU THROUGH THE
                        SERVICE WILL MEET YOUR EXPECTATIONS, AND (V) ANY ERRORS IN THE ARTFLY SITE WILL BE
                        CORRECTED.
                        ARTFLY AND ITS LICENSORS DISCLAIM, ANY WARRANTIES FOR ANY INFORMATION, CONTENT OR ADVICE
                        OBTAINED THROUGH THE SERVICES. ARTFLY AND ITS LICENSORS DISCLAIM ANY WARRANTIES FOR
                        SERVICES OR
                        GOODS RECEIVED THROUGH OR ADVERTISED ON THE ARTFLY SERVICES OR RECEIVED THROUGH ANY LINKS
                        PROVIDED BY THE ARTFLY SITE.
                    </div>

                </section>
                <section>
                    <div className='terms--plainEnglishBit'>
                        You use ArtFly by your own free will and are responsible for your own actions.
                    </div>
                    <div className='terms--legalBit'>
                        YOU UNDERSTAND AND AGREE THAT YOUR USE OF THE FORMS AND CONTENT ON THE ARTFLY SITE AND THE
                        SERVICE IS AT YOUR OWN DISCRETION AND RISK AND THAT YOU WILL BE SOLELY RESPONSIBLE FOR LOSS
                        OF
                        DATA THAT RESULTS FROM THE SUBMISSION OR DOWNLOAD OF SUCH CONTENT.
                    </div>

                </section>
                <section>
                    <div className='terms--plainEnglishBit'>
                        We actually respond to emails from any user the best we can, but with priority given to PRO
                        users.
                    </div>
                    <div className='terms--legalBit'>
                        Technical support is only provided to paying Account holders and is only available via
                        email. We
                        will use commercially reasonable efforts to respond within a reasonable amount of time
                        during
                        regular business hours.
                    </div>

                </section>
                <section>
                    <div className='terms--plainEnglishBit'>
                        If you live somewhere where this doesn't apply, it doesn't apply.
                    </div>
                    <div className='terms--legalBit'>
                        SOME STATES OR OTHER JURISDICTIONS DO NOT ALLOW THE EXCLUSION OF IMPLIED WARRANTIES, SO THE
                        ABOVE EXCLUSIONS MAY NOT APPLY TO YOU. YOU MAY ALSO HAVE OTHER RIGHTS THAT VARY FROM STATE
                        TO
                        STATE AND JURISDICTION TO JURISDICTION.
                    </div>

                </section>

                <h3>Limitation of Liability</h3>
                <section>
                    <div className='terms--plainEnglishBit'>
                        We can't be liable for misuse of ArtFly or for ArtFly not meeting your needs.
                    </div>
                    <div className='terms--legalBit'>
                        UNDER NO CIRCUMSTANCES SHALL ARTFLY OR ITS LICENSORS BE LIABLE TO YOU ON ACCOUNT OF THAT
                        USER’S
                        USE OR MISUSE OF OR RELIANCE ON THE SERVICES OR ARTFLY SITE ARISING FROM ANY CLAIM RELATING
                        TO
                        THIS AGREEMENT OR THE SUBJECT MATTER HEREOF. SUCH LIMITATION OF LIABILITY SHALL APPLY TO
                        PREVENT
                        RECOVERY OF DIRECT, INDIRECT, INCIDENTAL, CONSEQUENTIAL, SPECIAL, EXEMPLARY, AND PUNITIVE
                        DAMAGES WHETHER SUCH CLAIM IS BASED ON WARRANTY, CONTRACT, TORT (INCLUDING NEGLIGENCE), OR
                        OTHERWISE, (EVEN IF ARTFLY OR ITS LICENSORS HAVE BEEN ADVISED OF THE POSSIBILITY OF SUCH
                        DAMAGES). SUCH LIMITATION OF LIABILITY SHALL APPLY WHETHER THE DAMAGES ARISE FROM USE OR
                        MISUSE
                        OF AND RELIANCE ON THE SERVICES OR ARTFLY SITE, FROM INABILITY TO USE THE SERVICES OR
                        ARTFLY
                        SITE, OR FROM THE INTERRUPTION, SUSPENSION, OR TERMINATION OF THE SERVICES OR ARTFLY SITE
                        (INCLUDING SUCH DAMAGES INCURRED BY THIRD PARTIES).
                    </div>

                </section>
                <section>
                    <div className='terms--plainEnglishBit'>
                        For example, if you try and somehow run a business through ArtFly and we have some downtime,
                        we can't be responsible for your loss of profit.
                    </div>
                    <div className='terms--legalBit'>
                        THIS LIMITATION SHALL ALSO APPLY, WITHOUT LIMITATION, TO THE COSTS OF PROCUREMENT OF
                        SUBSTITUTE GOODS OR SERVICES, LOST PROFITS, OR LOST DATA. SUCH LIMITATION SHALL FURTHER APPLY
                        WITH RESPECT TO THE PERFORMANCE OR NON-PERFORMANCE OF THE SERVICES OR ARTFLY SITE OR ANY
                        INFORMATION OR MERCHANDISE THAT APPEARS ON, OR IS LINKED OR RELATED IN ANY WAY TO, THE ARTFLY
                        SERVICES. SUCH LIMITATION SHALL APPLY NOTWITHSTANDING ANY FAILURE OF ESSENTIAL PURPOSE OF ANY
                        LIMITED REMEDY AND TO THE FULLEST EXTENT PERMITTED BY LAW.
                    </div>

                </section>
                <section>
                    <div className='terms--plainEnglishBit'>
                        If this doesn't apply to you because of where you live, it doesn't apply to you.
                    </div>
                    <div className='terms--legalBit'>
                        SOME STATES OR OTHER JURISDICTIONS DO NOT ALLOW THE EXCLUSION OR LIMITATION OF LIABILITY FOR
                        INCIDENTAL OR CONSEQUENTIAL DAMAGES, SO THE ABOVE LIMITATIONS AND EXCLUSIONS MAY NOT APPLY
                        TO YOU.
                    </div>

                </section>
                <section>
                    <div className='terms--plainEnglishBit'>
                        The apocalypse may delay play
                    </div>
                    <div className='terms--legalBit'>
                        Without limiting the foregoing, under no circumstances shall ArtFly or its licensors be held
                        liable for any delay or failure in performance resulting directly or indirectly from acts of
                        nature, forces, or causes beyond its reasonable control, including, without limitation,
                        Internet failures, computer equipment failures, telecommunication equipment failures, other
                        equipment failures, electrical power failures, strikes, labor disputes, riots, insurrections,
                        civil disturbances, shortages of labor or materials, fires, floods, storms, explosions, acts of
                        God, war, governmental actions, orders of domestic or foreign courts or tribunals,
                        non-performance of third parties, or loss of or fluctuations in heat, light, or air
                        conditioning.
                    </div>

                </section>

                <h3>Indemnification</h3>
                <section>
                    <div className='terms--plainEnglishBit'>
                        If you get in trouble with the law for something you did on ArtFly, that's on you and you
                        agree that it isn't ArtFly itself's fault. If we receive notification of an infringement by you,
                        we'll pass it along to you.
                    </div>
                    <div className='terms--legalBit'>
                        You acknowledge that you will be solely and fully responsible for all liabilities incurred
                        through the use of the Services. To the maximum extent permitted by applicable law, you
                        agree to hold harmless and indemnify ArtFly and its employees, officers, agents, or other
                        partners from and against any third party claim arising from or in any way related to your use
                        of the Services, including any liability or expense arising from all claims, losses, damages
                        (actual and/or consequential), suits, judgments, litigation costs and attorneys' fees, of every
                        kind and nature including but not limited to any liability arising from or resulting by your
                        data imputed into ArtFly including infringement of intellectual property laws or civil or
                        criminal claims. ArtFly shall use good faith efforts to provide you with written notice of such
                        claim, suit or action. In addition, you expressly waive and relinquish any and all rights and
                        benefits which you may have under any other state or federal statute or common law principle of
                        similar effect, to the fullest extent permitted by law.
                    </div>

                </section>
            </div>

        </div>
    )
};

export default connect(null, { UpdateUrl })(TermsOfService);