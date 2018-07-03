import { Component } from "react";
import { connect } from 'react-redux';
// actions
import {UpdateUrl} from "../../actions/UrlActions";

class Redirect extends Component {
    componentDidMount(){
        const redirectPath = this.props.to || '/';
        this.props.UpdateUrl(redirectPath, 'Redirect comp');
    }
    render(){
        return null;
    }
}

export default connect(null, {UpdateUrl})(Redirect);