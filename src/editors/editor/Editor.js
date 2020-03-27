import React, { Component } from "react";
import Measure from 'react-measure';
// styles
import './editor_styles.css';
// comps
import LoadingThing from "../../components/loadingThing/LoadingThing";
import { copyToCanvas } from "../canvasCreators";
import EditorCanvas from "../editorCanvas/EditorCanvas";

class Editor extends Component {

    constructor(props) {
        super(props);

        this.state = { dimensions: null };

        this.drawEditedCanvas = this.drawEditedCanvas.bind(this);
    }

    componentDidMount() {
        this.drawEditedCanvas();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        this.drawEditedCanvas();
    }

    drawEditedCanvas() {
        const { sourceCanvas, editData, editFunction, frameSpriteSheet } = this.props;

        if (!sourceCanvas || !editData || !frameSpriteSheet) return;

        // if the editor isn't changing the canvas - e.g. label
        // editor, then just show the source canvas.
        if (!editFunction) {
            copyToCanvas(sourceCanvas, this.canvas);
            return;
        }

        const editedCanvas = editFunction(sourceCanvas, editData, frameSpriteSheet);
        copyToCanvas(editedCanvas, this.canvas);
    }

    render() {
        const { editData, onChange, sourceCanvas, Controls } = this.props;

        if (!editData) {
            return <LoadingThing />
        }

        return (
            <div className={'labApp artworkEditorBg'}>

                <Measure
                    bounds
                    onResize={contentRect => {
                        this.setState({ dimensions: contentRect.bounds })
                    }}
                >
                    {({ measureRef }) => (
                        <div ref={measureRef} style={{ flex: 1 }} />
                    )}
                </Measure>

                <EditorCanvas sourceLoaded={!!sourceCanvas}
                    sourceCanvas={sourceCanvas}
                    dimensions={this.state.dimensions}
                    canvasInit={c => this.canvas = c}
                />

                <Controls onChange={onChange} editData={editData} sourceCanvas={sourceCanvas} />

            </div>
        );
    }
}

export default Editor;