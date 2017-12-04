import { Component } from "react";
import history from './history'

class Redirect extends Component {
    componentDidMount(){
        const redirectPath = this.props.to || '/';
        history.push(redirectPath);
    }
    render(){
        return null;
    }
}

export default Redirect;