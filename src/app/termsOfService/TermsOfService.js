import React from 'react';
import { connect } from 'react-redux';
// actions
import { UpdateUrl } from "../../actions/UrlActions";
// comps
import { TempScreenAppBar } from "../appBar/AppBar";

const TermsOfService = ({ UpdateUrl }) => {
    return (
        <div className={'privacyPolicyPage'}>
            <TempScreenAppBar title={'Terms of Service'}
                              isFixed={true}
                              onCloseClick={() => UpdateUrl('/')}/>

            <div style={{ padding: 20, marginTop: 60, maxWidth: 650 }}>

                <table className="info-table">
                    <thead>
                    <th>
                        Official legally binding stuff
                    </th>
                    <th>
                        Plain English
                    </th>
                    </thead>
                    <tbody>
                    <tr>
                        <td>
                            These Terms of Service (the “<strong>Terms of Service</strong>”) are a contract between you,
                            the
                            user, and ArtFly run by Chris Dennett from 30 The Gill, Ulverston, Cumbria, LA12 7BP
                            (“<strong>ArtFly</strong>”). ArtFly operates ArtFly.io (the
                            “<strong>ArtFly Site</strong>”) and the Artwork creation services therein. By using the
                            ArtFly
                            Site
                            and any services accessible from the ArtFly Site, you are agreeing to be bound by these
                            Terms of
                            Service. If you do not agree to these Terms of Service or any part thereof, your only remedy
                            is
                            to not use the ArtFly Site or any services or products offered on the ArtFly Site or on any
                            other platform, including mobile applications, offered by ArtFly (collectively, the
                            “Service” or
                            “Services”). VIOLATION OF ANY OF THE TERMS OF SERVICE BELOW WILL RESULT IN THE TERMINATION
                            OF
                            YOUR RIGHT TO USE THE SERVICE, AND ANY ACCOUNT THAT YOU MAY HAVE CREATED AS PART OF THE
                            SERVICE.
                            YOU AGREE TO USE THE SERVICE AT YOUR OWN RISK. ArtFly reserves the right to refuse service
                            to
                            anyone for any reason at any time.
                        </td>
                        <td>
                            By being a member and using ArtFly, you agree to everything on this page. We have to do this
                            to
                            protect both you and us and make running this website possible. If you break these terms,
                            you
                            can't use ArtFly anymore.
                        </td>
                    </tr>
                    </tbody>
                </table>
                <h3>Your Account</h3>
                <table className="info-table">
                    <thead>
                    <th>
                        Official legally binding stuff
                    </th>
                    <th>
                        Plain English
                    </th>
                    </thead>
                    <tbody>
                    <tr>
                        <td>
                            In order to open an account on the ArtFly Site (the “<strong>Account</strong>”), you must
                            (i)
                            agree to these Terms of Service, and (ii) provide any other information required by ArtFly
                            during the registration process. You will update this information to maintain its accuracy
                            during the time you are using the Service. You are responsible for maintaining the security
                            of
                            your account and password. ArtFly cannot and will not be liable for any loss or damage from
                            your
                            failure to comply with this security obligation. You are also responsible for all content,
                            images,
                            or text that you may post on the ArtFly Site (the
                            “<strong>Content</strong>”) and activity that occurs under your Account (even when Content
                            is
                            posted by others who have access to your Account). Any information submitted by you shall be
                            subject to ArtFly’s <a href="http://artfly.io/privacyPolicy/">Privacy Policy</a>. Accounts
                            registered by “bots” or other
                            automated methods are not permitted.
                        </td>
                        <td>
                            Your account is your responsibility. If your account is compromised (e.g. someone uses the
                            password you posted on Facebook!) we'll try to help, but we
                            can't guarantee we can fix any damages.
                        </td>
                    </tr>
                    </tbody>
                </table>
                <h3>Our License to You</h3>
                <table className="info-table">
                    <thead>
                    <th>
                        Official legally binding stuff
                    </th>
                    <th>
                        Plain English
                    </th>
                    </thead>
                    <tbody>
                    <tr>
                        <td>
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
                        </td>
                        <td>
                            Don't copy ArtFly itself.
                        </td>
                    </tr>
                    </tbody>
                </table>
                <h3>Your License to Us</h3>
                <table className="info-table">
                    <thead>
                    <th>
                        Official legally binding stuff
                    </th>
                    <th>
                        Plain English
                    </th>
                    </thead>
                    <tbody>
                    <tr>
                        <td>
                            By submitting Artworks and Gallery content to the ArtFly Site, you grant ArtFly and visitors
                            to
                            ArtFly
                            the right to view and share your galleries and artworks. Don't put anything on ArtFly where
                            that
                            wouldn't be OK. <br/>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            Your galleries and Artworks are public.
                        </td>
                    </tr>
                    <tr>
                        <td>
                            Additionally, by uploading Content to the ArtFly Site, you warrant that you have not and
                            will
                            not contribute any Content that (a) infringes, violates or
                            otherwise interferes with any copyright or trademark of another party, (b) reveals any trade
                            secret, unless the trade secret belongs to you or you have the owner's permission to
                            disclose
                            it, (c) infringes any intellectual property right of another or the privacy or publicity
                            rights
                            of another, (d) is libelous, defamatory, abusive, threatening, harassing, hateful, offensive
                            or
                            otherwise violates any law or right of any third party, (e) creates an impression that you
                            know
                            is incorrect, misleading, or deceptive, including by impersonating others or otherwise
                            misrepresenting your affiliation with a person or entity; (f) contains other people's
                            private or
                            personally identifiable information without their express authorization and permission,
                            and/or
                            (g) contains or links to a virus, trojan horse, worm, time bomb or other computer
                            programming
                            routine or engine that is intended to damage, detrimentally interfere with, surreptitiously
                            intercept or expropriate any system, data or information. ArtFly reserves the right in its
                            discretion to remove any Content from the ArtFly Site, suspend or terminate your account at
                            any
                            time, or pursue any other remedy or relief available under equity or law.
                        </td>
                        <td>
                            Don't put nasty or copyright-infringing things on ArtFly.
                        </td>
                    </tr>
                    <tr>
                        <td>
                            You are responsible for your use of the Service, for any Content you provide, and for any
                            consequences thereof, including the use of your Content by other users and third party
                            partners.
                            You understand that your Content may be republished and if you do not have the right to
                            submit
                            Content for such use, it may subject you to liability. ArtFly will not be responsible or
                            liable
                            for any use of your Content in accordance with these Terms of Service.
                        </td>
                        <td>
                            Don't use ArtFly to do bad things. If you do, we'll remove your account and you personally
                            are
                            responsible for any trouble you cause.
                        </td>
                    </tr>
                    </tbody>
                </table>
                <h3>Your Responsibilities</h3>
                <table className="info-table">
                    <thead>
                    <th>
                        Official legally binding stuff
                    </th>
                    <th>
                        Plain English
                    </th>
                    </thead>
                    <tbody>
                    <tr>
                        <td>
                            The Services are available only to individuals who have the capacity to form legally binding
                            contracts under the law applicable to these Terms of Service. Furthermore, our services are
                            not
                            available to minors (under 18 years of age). If you do not qualify as an authorized user,
                            you
                            are not permitted to use the Services and no contract will be formed between you and ArtFly.
                        </td>
                        <td>
                            You need to be 18 or older to sign up for ArtFly. We need these rules to be legally binding
                            and
                            you have to be 18 or older for that to be possible.
                        </td>
                    </tr>
                    <tr>
                        <td>
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
                        </td>
                        <td>
                            If you are under 13, you can't use ArtFly (sorry).<br/>
                            If you are 13 or over but under 18, have your legal guardian sign up for you.
                        </td>
                    </tr>
                    <tr>
                        <td>
                            You are responsible for all activity occurring under your Accounts and are solely
                            responsible
                            for compliance with all applicable local, state, national and foreign laws, treaties and
                            regulations relating to your use of the ArtFly Site, including those related to the
                            protection
                            of intellectual property, data privacy, international communications and the transmission of
                            technical or personal data.
                        </td>
                        <td>
                            Follow all laws that apply to you, based on where you live or anything else.
                        </td>
                    </tr>
                    <tr>
                        <td>
                            You shall: (i) <a href='mailto:chris@artfly.io'>notify ArtFly</a> immediately of any
                            unauthorized use of any password or account or any other known or suspected breach of
                            security;
                            and (ii) report to ArtFly immediately and use reasonable efforts to stop immediately any
                            copying
                            or distribution of Content that is known or suspected by you.
                        </td>
                        <td>
                            If your account is hacked, <a href="mailto:chris@artfly.io">let us know</a> right away.
                        </td>
                    </tr>
                    <tr>
                        <td>
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
                        </td>
                        <td>
                            BYO electricity, internet, computer, web browser, etc.
                        </td>
                    </tr>
                    <tr>
                        <td>
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
                        </td>
                        <td>
                            We don't monitor every single thing on ArtFly. It's up to you to do right.
                        </td>
                    </tr>
                    </tbody>
                </table>
                <h3>Impermissible Acts</h3>
                <p>As a condition to your use of the ArtFly Site, you agree not to:</p>
                <table className="info-table">
                    <thead>
                    <th>
                        Official legally binding stuff
                    </th>
                    <th>
                        Plain English
                    </th>
                    </thead>
                    <tbody>
                    <tr>
                        <td>
                            upload, post, email, transmit or otherwise make available any information, materials or
                            other
                            content that is illegal, harmful, threatening, abusive, harassing, defamatory, obscene,
                            pornographic, offensive, invades another’s privacy, or promotes bigotry, racism, hatred or
                            harm
                            against any individual or group;
                        </td>
                        <td>
                            Don't be nasty.
                        </td>
                    </tr>
                    <tr>
                        <td>
                            phish, collect, upload, post, email, transmit or otherwise make available any login data
                            and/or
                            passwords for other web sites, software or services;
                        </td>
                        <td>
                            Don't be horrible.
                        </td>
                    </tr>
                    <tr>
                        <td>
                            forge headers or otherwise manipulate identifiers in order to disguise the origin of any
                            content
                            transmitted through the ArtFly Site;
                        </td>
                        <td>
                            Don't be a mean.
                        </td>
                    </tr>
                    <tr>
                        <td>
                            upload, post, email, transmit or otherwise make available any information, materials or
                            other
                            content that infringes another’s rights, including any intellectual property rights;
                        </td>
                        <td>
                            Don't break intellectual property rights.
                        </td>
                    </tr>
                    <tr>
                        <td>
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
                        </td>
                        <td>
                            Don't attack the site with viruses.
                        </td>
                    </tr>
                    <tr>
                        <td>
                            reproduce, duplicate or copy or exploit any other portion of the ArtFly Site, without the
                            express written permission of ArtFly;
                        </td>
                        <td>
                            Don't be a rip off the site.
                        </td>
                    </tr>
                    <tr>
                        <td>
                            obtain, collect, store or modify the personal information about other users;
                        </td>
                        <td>
                            Don't collect ArtFly user data.
                        </td>
                    </tr>
                    <tr>
                        <td>
                            modify, adapt or hack the ArtFly Site or falsely imply that some other site is associated
                            with
                            the ArtFly Site or ArtFly; or
                        </td>
                        <td>
                            Don't be a pretend to be ArtFly or a bestie of ArtFly if you're not!
                        </td>
                    </tr>
                    <tr>
                        <td>
                            use the ArtFly Site for any illegal or unauthorized purpose. You must not, in the use of the
                            ArtFly Site, violate any laws in your jurisdiction (including but not limited to copyright
                            laws).
                        </td>
                        <td>
                            Don't break laws.
                        </td>
                    </tr>
                    <tr>
                        <td>
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
                        </td>
                        <td>
                            We might pop into your account to help with a support request, but we otherwise don't go
                            snooping around.
                            If we are legally required to provide information to the government that they request, we
                            will,
                            but not otherwise.
                        </td>
                    </tr>
                    </tbody>
                </table>
                <h3>Feedback</h3>
                <table className="info-table">
                    <thead>
                    <th>
                        Official legally binding stuff
                    </th>
                    <th>
                        Plain English
                    </th>
                    </thead>
                    <tbody>
                    <tr>
                        <td>
                            In the course of using the ArtFly Site, you may provide ArtFly with feedback, including but
                            not
                            limited to suggestions, observations, errors, problems, and defects regarding the ArtFly
                            Site
                            (collectively “<strong>Feedback</strong>”). You hereby grant ArtFly a worldwide,
                            irrevocable,
                            perpetual, royalty-free, transferable and sub-licensable, non-exclusive right to use, copy,
                            modify, distribute, display, perform, create derivative works from and otherwise exploit all
                            such Feedback.
                        </td>
                        <td>
                            If you send us an idea, we might use it, in which case it's protected by all the same rules
                            on
                            this page.
                        </td>
                    </tr>
                    </tbody>
                </table>
                <h3>Payment, Refunds, Upgrading and Downgrading</h3>
                Sales are done through Paddle so the legal terms are with them.  Paddle's terms can be found here: <a href={'https://paddle.com/legal-buyers/'} >Paddle terms</a>
                <table className="info-table">
                    <thead>
                    <th>
                        Official legally binding stuff
                    </th>
                    <th>
                        Plain English
                    </th>
                    </thead>
                    <tbody>
                    <tr>
                        <td>

                        </td>
                        <td>
                            If you are on a paid plan, Paddle will re-bill automatically every 30 days.
                        </td>
                    </tr>
                    <tr>
                        <td>

                        </td>
                        <td>
                            VAT is included
                        </td>
                    </tr>
                    <tr>
                        <td>
                            DOWNGRADING YOUR ARTFLY PLAN MAY CAUSE THE LOSS OF CONTENT (ARTWORKS), FEATURES, OR CAPACITY OF
                            YOUR ACCOUNT. ARTFLY DOES NOT ACCEPT ANY LIABILITY FOR SUCH LOSS.`
                        </td>
                        <td>
                            If you downgrade from a paid to free plan, the maximum artworks allowed will decrease so artworks will be deleted.
                        </td>
                    </tr>
                    </tbody>
                </table>
                <h3>Violation of these Terms of Service</h3>
                <table className="info-table">
                    <thead>
                    <th>
                        Official legally binding stuff
                    </th>
                    <th>
                        Plain English
                    </th>
                    </thead>
                    <tbody>
                    <tr>
                        <td>
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
                        </td>
                        <td>
                            We will delete anything that violates these rules. We have the right to take legal action
                            against violations of these rules.
                        </td>
                    </tr>
                    </tbody>
                </table>
                <h3>Cancellation and Termination</h3>
                <table className="info-table">
                    <thead>
                    <th>
                        Official legally binding stuff
                    </th>
                    <th>
                        Plain English
                    </th>
                    </thead>
                    <tbody>
                    <tr>
                        <td>
                            You are solely responsible for properly canceling your account. You can cancel your account
                            at
                            any time by logging in to your account and going to the Settings page, the Profile tab, and
                            clicking the Delete Account link and confirming the dialog box. You may cancel your payment
                            plan
                            but keep your account by logging in, going to the Settings page, the PRO account tab, and
                            clicking the Cancel Plan link. An email or phone request to cancel your account shall not
                            result
                            in cancellation.
                        </td>
                        <td>
                            If you don't want a ArtFly account anymore, it's up to you to delete it. You can do it right
                            from the site.
                        </td>
                    </tr>
                    <tr>
                        <td>
                            Any cancellation of your Account will result in the deactivation or deletion of your Account
                            or
                            your access to your Account, and the forfeiture and relinquishment of all Content in your
                            Account. This information cannot be recovered from ArtFly once your Account is cancelled.
                            Please
                            be aware that ArtFly may for a time retain residual information in our backup and/or
                            archival
                            copies of our database. We will make reasonable commercial efforts to delete your
                            information as
                            soon as possible after you communicate that intention to us.
                        </td>
                        <td>
                            If you delete your account, everything in it is gone forever.
                        </td>
                    </tr>
                    <tr>
                        <td>
                            Cancellations will take effect immediately. Upon the commencement of a new Service period
                            the
                            Service will terminate without additional notice, and you will not be charged for any
                            subsequent
                            Service periods. You will not be provided any refunds for unused time on your Service
                            period.
                        </td>
                        <td>
                            If you are a PRO user and delete your account, you will not be re-billed.
                        </td>
                    </tr>
                    <tr>
                        <td>
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
                        </td>
                        <td>
                            Don't use ArtFly for asset storage for non-ArtFly things.
                        </td>
                    </tr>
                    </tbody>
                </table>
                <h3>Modifications to the ArtFly Site and Prices</h3>
                <table className="info-table">
                    <thead>
                    <th>
                        Official legally binding stuff
                    </th>
                    <th>
                        Plain English
                    </th>
                    </thead>
                    <tbody>
                    <tr>
                        <td>
                            ArtFly reserves the right at any time and from time to time to modify or discontinue,
                            temporarily or permanently, the ArtFly Site and Service (or any part thereof) with or
                            without
                            notice.
                        </td>
                        <td>
                            The last thing we plan on doing is shutting down, but if we have to we have to.
                        </td>
                    </tr>
                    <tr>
                        <td>
                            Prices of all ArtFly Sites, including but not limited to monthly subscription plan fees to
                            the
                            ArtFly Site, are subject to change upon 30 days notice from ArtFly. Such notice may be
                            provided
                            at any time by posting the changes to the ArtFly Site.
                        </td>
                        <td>
                            If we change prices we'll give you 30 days of notice first.
                        </td>
                    </tr>
                    <tr>
                        <td>
                            ArtFly shall not be liable to you or to any third party for any modification, price change,
                            suspension or discontinuance of the ArtFly Site.
                        </td>
                        <td>
                            Hopefully any change we make to the site is for the better, but if we change something you
                            don't
                            like, it will be up to you to decide if you want to stay on.
                        </td>
                    </tr>
                    <tr>
                        <td>
                            ArtFly reserves the right to update and change the Terms of Service from time to time
                            without
                            notice. Any new features that augment or enhance the current ArtFly Site, including the
                            release
                            of new tools and resources, shall be subject to the Terms of Service. Continued use of the
                            ArtFly Site after any such changes shall constitute your consent to such changes.
                        </td>
                        <td>
                            This page might change from time to time. We'll let you know through the in-app notification
                            system of any major changes.
                        </td>
                    </tr>
                    </tbody>
                </table>
                <h3>Copyright and Content Ownership</h3>
                <table className="info-table">
                    <thead>
                    <th>
                        Official legally binding stuff
                    </th>
                    <th>
                        Plain English
                    </th>
                    </thead>
                    <tbody>
                    <tr>
                        <td>
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
                        </td>
                        <td>
                            The things you make on ArtFly are yours, "ArtFly" is ours.
                        </td>
                    </tr>
                    </tbody>
                </table>
                <h3>Notification of Claims of Infringement</h3>
                <table className="info-table">
                    <thead>
                    <th>
                        Official legally binding stuff
                    </th>
                    <th>
                        Plain English
                    </th>
                    </thead>
                    <tbody>
                    <tr>
                        <td>
                            If you believe that your work has been copied in a way that constitutes copyright
                            infringement,
                            or your intellectual property rights have been otherwise violated, please notify ArtFly’s
                            agent
                            for notice of claims of copyright or other intellectual property infringement (“Agent”),
                            at <a
                            href='mailto:chris@artfly.io'>chris@artfly.io</a> or:
                            <p>ArtFly<br/>
                                919 NW Bond St. Suite 203<br/>
                                Bend OR 97702<br/>
                                United States</p>
                            <p>Please provide our Agent with a notice including:</p>
                            <ul>
                                <li>Identification of the material on the ArtFly Site that you claim is infringing, with
                                    enough detail so that we may locate it on the ArtFly Site;
                                </li>
                                <li>A statement by you that you have a good faith belief that the disputed use is not
                                    authorized by the copyright owner, its agent, or the law;<br/>
                                    A statement by you declaring under penalty of perjury that (1) the above information
                                    in
                                    your notice is accurate, and (2) that you are the owner of the copyright interest
                                    involved or that you are authorized to act on behalf of that owner;
                                </li>
                                <li>Your address, telephone number, and email address; and</li>
                                <li>Your physical or electronic signature.</li>
                            </ul>
                        </td>
                        <td>
                            If you need to report a copyright infringement, drop us a line.
                        </td>
                    </tr>
                    </tbody>
                </table>
                <h3>Disclaimer of Warranties</h3>
                <table className="info-table">
                    <thead>
                    <th>
                        Official legally binding stuff
                    </th>
                    <th>
                        Plain English
                    </th>
                    </thead>
                    <tbody>
                    <tr>
                        <td>
                            THE SERVICES, AND ALL MATERIALS, INFORMATION, AND SERVICES INCLUDED IN THE CODEPEN SITE ARE
                            PROVIDED ON AN “AS IS” AND “AS AVAILABLE” BASIS, WITH NO WARRANTIES WHATSOEVER. CODEPEN AND
                            ITS
                            LICENSORS EXPRESSLY DISCLAIM TO THE FULLEST EXTENT PERMITTED BY LAW ALL EXPRESS, IMPLIED,
                            AND
                            STATUTORY WARRANTIES, INCLUDING, WITHOUT LIMITATION, THE WARRANTIES OF MERCHANTABILITY,
                            FITNESS
                            FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT OF PROPRIETARY RIGHTS. CODEPEN AND ITS
                            LICENSORS
                            DISCLAIM ANY WARRANTIES REGARDING THE SECURITY, RELIABILITY, TIMELINESS, AND PERFORMANCE OF
                            THE
                            SERVICES. CODEPEN DOES NOT WARRANT THAT (I) THE SERVICE WILL MEET YOUR SPECIFIC
                            REQUIREMENTS,
                            (II) THE SERVICE WILL BE UNINTERRUPTED, TIMELY, SECURE OR ERROR-FREE, (III) THE RESULTS THAT
                            MAY
                            BE OBTAINED FROM THE USE OF THE SERVICE WILL BE ACCURATE OR RELIABLE, (IV) THE QUALITY OF
                            ANY
                            PRODUCTS, SERVICES, INFORMATION, OR OTHER MATERIAL PURCHASED OR OBTAINED BY YOU THROUGH THE
                            SERVICE WILL MEET YOUR EXPECTATIONS, AND (V) ANY ERRORS IN THE CODEPEN SITE WILL BE
                            CORRECTED.
                            CODEPEN AND ITS LICENSORS DISCLAIM, ANY WARRANTIES FOR ANY INFORMATION, CONTENT OR ADVICE
                            OBTAINED THROUGH THE SERVICES. CODEPEN AND ITS LICENSORS DISCLAIM ANY WARRANTIES FOR
                            SERVICES OR
                            GOODS RECEIVED THROUGH OR ADVERTISED ON THE CODEPEN SERVICES OR RECEIVED THROUGH ANY LINKS
                            PROVIDED BY THE CODEPEN SITE.
                        </td>
                        <td>
                            There might be downtime. There might be bugs. The features might not always meet your exact
                            needs.
                        </td>
                    </tr>
                    <tr>
                        <td>
                            YOU UNDERSTAND AND AGREE THAT YOUR USE OF THE FORMS AND CONTENT ON THE CODEPEN SITE AND THE
                            SERVICE IS AT YOUR OWN DISCRETION AND RISK AND THAT YOU WILL BE SOLELY RESPONSIBLE FOR LOSS
                            OF
                            DATA THAT RESULTS FROM THE SUBMISSION OR DOWNLOAD OF SUCH CONTENT.
                        </td>
                        <td>
                            You use ArtFly by your own free will and are responsible for your own actions.
                        </td>
                    </tr>
                    <tr>
                        <td>
                            Technical support is only provided to paying Account holders and is only available via
                            email. We
                            will use commercially reasonable efforts to respond within a reasonable amount of time
                            during
                            regular business hours.
                        </td>
                        <td>
                            We actually respond to emails from any user the best we can, but with priority given to PRO
                            users.
                        </td>
                    </tr>
                    <tr>
                        <td>
                            SOME STATES OR OTHER JURISDICTIONS DO NOT ALLOW THE EXCLUSION OF IMPLIED WARRANTIES, SO THE
                            ABOVE EXCLUSIONS MAY NOT APPLY TO YOU. YOU MAY ALSO HAVE OTHER RIGHTS THAT VARY FROM STATE
                            TO
                            STATE AND JURISDICTION TO JURISDICTION.
                        </td>
                        <td>
                            If you live somewhere where this doesn't apply, it doesn't apply.
                        </td>
                    </tr>
                    </tbody>
                </table>
                <h3>Limitation of Liability</h3>
                <table className="info-table">
                    <thead>
                    <th>
                        Official legally binding stuff
                    </th>
                    <th>
                        Plain English
                    </th>
                    </thead>
                    <tbody>
                    <tr>
                        <td>
                            UNDER NO CIRCUMSTANCES SHALL CODEPEN OR ITS LICENSORS BE LIABLE TO YOU ON ACCOUNT OF THAT
                            USER’S
                            USE OR MISUSE OF OR RELIANCE ON THE SERVICES OR CODEPEN SITE ARISING FROM ANY CLAIM RELATING
                            TO
                            THIS AGREEMENT OR THE SUBJECT MATTER HEREOF. SUCH LIMITATION OF LIABILITY SHALL APPLY TO
                            PREVENT
                            RECOVERY OF DIRECT, INDIRECT, INCIDENTAL, CONSEQUENTIAL, SPECIAL, EXEMPLARY, AND PUNITIVE
                            DAMAGES WHETHER SUCH CLAIM IS BASED ON WARRANTY, CONTRACT, TORT (INCLUDING NEGLIGENCE), OR
                            OTHERWISE, (EVEN IF CODEPEN OR ITS LICENSORS HAVE BEEN ADVISED OF THE POSSIBILITY OF SUCH
                            DAMAGES). SUCH LIMITATION OF LIABILITY SHALL APPLY WHETHER THE DAMAGES ARISE FROM USE OR
                            MISUSE
                            OF AND RELIANCE ON THE SERVICES OR CODEPEN SITE, FROM INABILITY TO USE THE SERVICES OR
                            CODEPEN
                            SITE, OR FROM THE INTERRUPTION, SUSPENSION, OR TERMINATION OF THE SERVICES OR CODEPEN SITE
                            (INCLUDING SUCH DAMAGES INCURRED BY THIRD PARTIES).
                        </td>
                        <td>
                            We can't be liable for misuse of ArtFly or for ArtFly not meeting your needs.
                        </td>
                    </tr>
                    <tr>
                        <td>
                            THIS LIMITATION SHALL ALSO APPLY, WITHOUT LIMITATION, TO THE COSTS OF PROCUREMENT OF
                            SUBSTITUTE
                            GOODS OR SERVICES, LOST PROFITS, OR LOST DATA. SUCH LIMITATION SHALL FURTHER APPLY WITH
                            RESPECT
                            TO THE PERFORMANCE OR NON-PERFORMANCE OF THE SERVICES OR CODEPEN SITE OR ANY INFORMATION OR
                            MERCHANDISE THAT APPEARS ON, OR IS LINKED OR RELATED IN ANY WAY TO, THE CODEPEN SERVICES.
                            SUCH
                            LIMITATION SHALL APPLY NOTWITHSTANDING ANY FAILURE OF ESSENTIAL PURPOSE OF ANY LIMITED
                            REMEDY
                            AND TO THE FULLEST EXTENT PERMITTED BY LAW.
                        </td>
                        <td>
                            For example, if you try and somehow run a business through ArtFly and we have some downtime,
                            we
                            can't be responsible for your loss of profit.
                        </td>
                    </tr>
                    <tr>
                        <td>
                            SOME STATES OR OTHER JURISDICTIONS DO NOT ALLOW THE EXCLUSION OR LIMITATION OF LIABILITY FOR
                            INCIDENTAL OR CONSEQUENTIAL DAMAGES, SO THE ABOVE LIMITATIONS AND EXCLUSIONS MAY NOT APPLY
                            TO
                            YOU.
                        </td>
                        <td>
                            If this doesn't apply to you because of where you live, it doesn't apply to you.
                        </td>
                    </tr>
                    <tr>
                        <td>
                            Without limiting the foregoing, under no circumstances shall ArtFly or its licensors be held
                            liable for any delay or failure in performance resulting directly or indirectly from acts of
                            nature, forces, or causes beyond its reasonable control, including, without limitation,
                            Internet
                            failures, computer equipment failures, telecommunication equipment failures, other equipment
                            failures, electrical power failures, strikes, labor disputes, riots, insurrections, civil
                            disturbances, shortages of labor or materials, fires, floods, storms, explosions, acts of
                            God,
                            war, governmental actions, orders of domestic or foreign courts or tribunals,
                            non-performance of
                            third parties, or loss of or fluctuations in heat, light, or air conditioning.
                        </td>
                        <td>
                            Should a meteor strike the Earth right at our data center, we might go down.
                        </td>
                    </tr>
                    </tbody>
                </table>
                <h3>Indemnification</h3>
                <table className="info-table">
                    <thead>
                    <th>
                        Official legally binding stuff
                    </th>
                    <th>
                        Plain English
                    </th>
                    </thead>
                    <tbody>
                    <tr>
                        <td>
                            You acknowledge that you will be solely and fully responsible for all liabilities incurred
                            through the use of the Services. To the maximum extent permitted by applicable law, you
                            agree to
                            hold harmless and indemnify ArtFly and its employees, officers, agents, or other partners
                            from
                            and against any third party claim arising from or in any way related to your use of the
                            Services, including any liability or expense arising from all claims, losses, damages
                            (actual
                            and/or consequential), suits, judgments, litigation costs and attorneys' fees, of every kind
                            and
                            nature including but not limited to any liability arising from or resulting by your data
                            imputed
                            into ArtFly including infringement of intellectual property laws or civil or criminal
                            claims.
                            ArtFly shall use good faith efforts to provide you with written notice of such claim, suit
                            or
                            action. In addition, you expressly waive and relinquish any and all rights and benefits
                            which
                            you may have under any other state or federal statute or common law principle of similar
                            effect,
                            to the fullest extent permitted by law.
                        </td>
                        <td>
                            If you get in trouble with the law for something you did on ArtFly, that's on you and you
                            agree
                            that it isn't ArtFly itself's fault. If we receive notification of an infringement by you,
                            we'll
                            pass it along to you.
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
};

export default connect(null, { UpdateUrl })(TermsOfService);