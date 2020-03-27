import React, { Component } from 'react';
// styles
import './editSideSelector_styles.css';
// ui
import { Drawer, DrawerAppContent } from '@rmwc/drawer';
import { IconButton } from '@rmwc/icon-button';
// comps
import EditDashboard from "./editDashboard/EditDashboard";

class EditSideSelector extends Component {
    constructor(props) {
        super(props);

        this.state = { isShowingAddEdit: false, editAddDialogIsOpen: false };
    }

    // triggers ui elements such as sliders to resize properly
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.isOpen !== prevProps.isOpen) {
            window.dispatchEvent(new Event('resize'));
        }
    }

    render() {
        const { isOpen, children, ...rest } = this.props;
        const { isShowingAddEdit } = this.state;

        const contentMargin = isOpen ? 65 : 0;
        const toggleOpenIcon = isShowingAddEdit ? 'check' : 'add';

        return (
            <div className={'squaresBg editSideSelector'}>

                <Drawer dismissible={true}
                    style={{
                        width: isShowingAddEdit ? '100%' : 'inherit',
                        background: 'none',
                        borderRight: 'none',
                        overflow: 'hidden',
                        height: '100%',

                    }}
                    open={isOpen}>
                    <div className={"editSideSelector--openEditButton"}>
                        <IconButton icon={toggleOpenIcon}
                            label="show add edit menu"
                            onClick={() => this.setState({ isShowingAddEdit: !isShowingAddEdit })}
                        />
                    </div>
                    <EditDashboard {...rest}
                        onClose={() =>
                            this.setState({ isShowingAddEdit: false })
                        }
                        showAdd={isShowingAddEdit} />
                </Drawer>

                <DrawerAppContent style={{ minHeight: '100%', marginLeft: contentMargin }}>
                    {children}
                </DrawerAppContent>
            </div>
        )
    }
}

export default EditSideSelector;