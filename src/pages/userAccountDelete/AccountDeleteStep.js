import React, { Component } from 'react';
// ui
import { Typography } from 'rmwc/Typography';
import { ListDivider } from 'rmwc/List';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    DialogButton
} from '@rmwc/dialog';
import {
    Card,
    CardPrimaryAction,
    CardAction,
    CardActions,
    CardActionButtons
} from 'rmwc/Card';

class AccountDeleteStep extends Component {

    constructor(props) {
        super(props);

        this.state = { deleteConfirmDialogIsOpen: false }
    }

    render() {

        const { completed, number, title, description, onDeleteConfirm, disabled, actionLabel = 'Delete' } = this.props;
        const completedStyle = { textDecoration: 'line-through' };
        const showDeleteButt = !disabled && !completed;

        return (
            <div>
                <Dialog
                    open={this.state.deleteConfirmDialogIsOpen}
                    onClose={() => this.setState({ deleteConfirmDialogIsOpen: false })}
                >
                    <DialogTitle>{title}</DialogTitle>
                    <DialogContent>{description}</DialogContent>
                    <DialogActions>
                        <DialogButton action="close"
                            onClick={() => this.setState({ deleteConfirmDialogIsOpen: false })}
                        >
                            Cancel
                        </DialogButton>
                        <DialogButton action="accept"
                            isDefaultAction
                            onClick={() => onDeleteConfirm()}
                        >
                            confirm {actionLabel}
                        </DialogButton>
                    </DialogActions>
                </Dialog>

                <Card style={{ width: '100%', marginTop: 20 }}>
                    <Typography
                        use="subtitle1"
                        tag="div"
                        style={{ padding: '0.5rem 1rem' }}
                        theme="text-secondary-on-background"
                    >
                        Step {number}:
                        {completed &&
                            <span> Complete</span>
                        }
                    </Typography>

                    <ListDivider />
                    <CardPrimaryAction>
                        <div style={{ padding: '0 1rem 0 1rem' }}>
                            <Typography use="headline6" tag="h2" style={completed ? completedStyle : {}}>
                                {title}
                            </Typography>
                            <Typography
                                use="subtitle2"
                                tag="h3"
                                theme="text-secondary-on-background"
                                style={{ marginTop: '-1rem' }}>
                                {description}
                            </Typography>
                        </div>
                    </CardPrimaryAction>
                    <CardActions style={{ justifyContent: 'flex-end' }}>
                        <CardActionButtons>
                            {showDeleteButt &&
                                <CardAction theme={'secondary-bg on-secondary'}
                                    onClick={() => this.setState({ deleteConfirmDialogIsOpen: true })}>
                                    {actionLabel}
                                </CardAction>
                            }

                            {completed &&
                                <Typography use="button" style={{ color: '#ccc' }}>
                                    Complete
                            </Typography>
                            }

                            {disabled &&
                                <Typography use="button" style={{ color: '#ccc' }}>
                                    Complete step {number - 1} first
                            </Typography>
                            }
                        </CardActionButtons>
                    </CardActions>
                </Card>
            </div>
        )
    }
}

export default AccountDeleteStep;
