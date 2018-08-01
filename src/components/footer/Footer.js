import React from 'react';
import { connect } from 'react-redux';
// ui
import { Button } from 'rmwc/Button';
// actions
import { UpdateUrl } from "../../actions/UrlActions";

const Footer = ({ UpdateUrl }) => {
    return (
        <div style={{
            backgroundColor: '#1b1b1b',
            color: '#fff',
            padding: 42, textAlign: 'center'
        }}>
            <Button style={{ color: '#fff' }} onClick={() => UpdateUrl('/termsOfService')}>Terms of Service</Button>
            |
            <Button style={{ color: '#fff' }} onClick={() => UpdateUrl('/privacyPolicy')}>Privacy Policy</Button>
        </div>
    )
};

export default connect(null, { UpdateUrl })(Footer);