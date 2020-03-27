import React from 'react';
import { createPixelNumberCanvas } from "./createPixelNumberCanvas";
import { copyToCanvas } from "../../canvasCreators";
import { mmToPixels } from "../../../components/global/UTILS";
import { downloadSheetsZip } from "../saveZipFile";
import { DialogActions, DialogButton } from "@rmwc/dialog";
import Button from "@rmwc/button";

class PixelNumbersCanvas extends React.Component {

    constructor(props) {
        super(props);
        this.onDownloadSheetsClick = this.onDownloadSheetsClick.bind(this);

    }

    onDownloadSheetsClick(){
        downloadSheetsZip(this.canvas);
    }


    componentDidMount() {
        this.updateCanvas();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        this.updateCanvas();
    }

    updateCanvas = () => {
        const numberedCanvas = createPixelNumberCanvas(this.props.sourceCanvas, {...this.props.editData,  sheetNumber:this.props.sheetNumber});
        copyToCanvas(numberedCanvas, this.canvas);
    };

    render() {
        return (
            <React.Fragment>
                <Button onClick={this.onDownloadSheetsClick}>Download sheets</Button>
            <canvas ref={c => this.canvas = c}
                    width={mmToPixels(210)} height={mmToPixels(297)}
                    style={{ maxWidth: '100%' }}
            />
            </React.Fragment>
        )
    }
};

export default PixelNumbersCanvas;