import React from 'react';
// import Typography from '@material-ui/core/Typography';
import { Typography } from '@rmwc/typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';

class ItemSelector extends React.Component {
    state = {
        anchorEl: null
    };

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        if (this.props.items !== nextProps.items) {
            return true;
        }
        if (this.props.selectedData !== nextProps.selectedData) {
            return true;
        }
        if (this.state.anchorEl !== nextState.anchorEl) {
            return true;
        }
        return false;
    }

    handleClickListItem = event => {
        this.setState({ anchorEl: event.currentTarget });
    };

    handleMenuItemClick = (itemData) => {
        this.setState({ anchorEl: null }, () => {
            this.props.onSelect(itemData);
        });
    };

    handleClose = () => {
        this.setState({ anchorEl: null });
    };

    render() {
        const { anchorEl } = this.state;
        const { items, ItemComponent, selectedData, label, labelWidth = 105 } = this.props;

        return (
            <React.Fragment>
                <Typography use="button"
                    style={{ width: labelWidth }}>
                    {`${label}: `}
                </Typography>

                <List component="nav"
                    style={{ backgroundColor: 'white', padding: 0, borderRadius: 3, border: 'solid 1px rgba(0,0,0,0.1)' }}>
                    <ListItem
                        style={{ padding: 11 }}
                        button
                        aria-haspopup="true"
                        aria-controls="lock-menu"
                        aria-label={label}
                        onClick={this.handleClickListItem}
                    >
                        <ItemComponent data={selectedData} />
                    </ListItem>
                </List>
                <Menu
                    id="lock-menu"
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={this.handleClose}
                >
                    {items.map((item, index) => (
                        <MenuItem
                            key={item.key}
                            selected={index === this.state.selectedIndex}
                            onClick={() => this.handleMenuItemClick(item)}
                        >
                            <ItemComponent data={item} />

                        </MenuItem>
                    ))}
                </Menu>
            </React.Fragment>
        )
    }
};

export default ItemSelector;