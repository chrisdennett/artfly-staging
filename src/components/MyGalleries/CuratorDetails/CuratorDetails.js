import React, { Component } from "react";
import { connect } from 'react-redux';

import EditCuratorForm from './EditCuratorForm';
import { updateCurator } from '../../User/UserActions';

class CuratorDetails extends Component {

    constructor(props) {
        super(props);
        this.state = { inEditingMode: false }
    }

    onEditButtClick() {
        this.setState({ inEditingMode: true })
    }

    onCancelEdit() {
        this.setState({ inEditingMode: false })
    }

    onFormSubmit(newName) {
        this.props.updateCurator(this.props.userId, newName, () => {
            this.setState({ inEditingMode: false })
        });
    }

    render() {
        let content;

        if (this.state.inEditingMode) {
            content = (
                <EditCuratorForm userId={this.props.userId}
                                 onFormSubmit={this.onFormSubmit.bind(this)}
                                 onFormCancel={this.onCancelEdit.bind(this)}/>
            );
        }
        else {
            content = (
                <div>
                    <span>Curator: </span><span>{this.props.name}</span>
                    <button onClick={this.onEditButtClick.bind(this)}>Edit</button>
                </div>
            );
        }

        return content;
    }
}

export default connect(null, { updateCurator })(CuratorDetails);
