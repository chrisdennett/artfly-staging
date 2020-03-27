import React from 'react';
//
import { Select, SelectHelperText } from '@rmwc/select';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    DialogButton
} from '@rmwc/dialog';
import { Button } from '@rmwc/button';
import PixelNumbersCanvas from "./PixelNumbersCanvas";
import { downloadSheetsZip } from "../saveZipFile";

class PixelNumberSheets extends React.Component {

    constructor(props) {
        super(props);
        this.state = { standardDialogOpen: false, currentSheetNumber: 1 };
    }

    render() {
        return (
            <div>
                <Dialog
                    open={this.state.standardDialogOpen}
                    onClose={evt => {
                        this.setState({ standardDialogOpen: false });
                    }}
                >
                    <DialogTitle>Dialog Title</DialogTitle>
                    <DialogContent style={{overflow:'hidden'}}>

                        <PixelNumbersCanvas
                            editData={this.props.editData}
                            sheetNumber={this.state.currentSheetNumber}
                            sourceCanvas={this.props.sourceCanvas}/>

                        <div>
                            <Select
                                label="Standard"
                                value={this.state.currentSheetNumber}
                                options={[
                                    {
                                        label: 'Sheet 1',
                                        value: '1'
                                    },
                                    {
                                        label: 'Sheet 2',
                                        value: '2'
                                    },
                                    {
                                        label: 'Sheet 3',
                                        value: '3'
                                    },
                                    {
                                        label: 'Sheet 4',
                                        value: '4'
                                    },
                                    {
                                        label: 'Sheet 5',
                                        value: '5'
                                    },
                                    {
                                        label: 'Sheet 6',
                                        value: '6'
                                    },
                                    {
                                        label: 'Sheet 7',
                                        value: '7'
                                    },
                                    {
                                        label: 'Sheet 8',
                                        value: '8'
                                    },
                                    {
                                        label: 'Sheet 9',
                                        value: '9'
                                    },
                                ]}
                                onChange={e => this.setState({ currentSheetNumber: e.target.value })}
                            />
                        </div>

                    </DialogContent>

                    <DialogActions>
                        <DialogButton action="accept"
                                      isDefaultAction>Done</DialogButton>
                    </DialogActions>
                </Dialog>

                <Button
                    raised
                    onClick={() => this.setState({ standardDialogOpen: true })}
                >
                    Open standard Dialog
                </Button>
            </div>
        )
    }
}

export default PixelNumberSheets;