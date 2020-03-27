import React from "react";
import Measure from 'react-measure';
// styles
import './labelEditor_styles.css';
// ui
import { TextField, TextFieldHelperText } from '@rmwc/textfield';
import ArtistSelector from "../../components/artistSelector/ArtistSelector";
import { copyToCanvas } from "../canvasCreators";
import ArtworkLabel from "../../components/artworkLabel/ArtworkLabel";
import EditorCanvas from "../editorCanvas/EditorCanvas";

const MAX_TITLE_LENGTH = 33;

class LabelEditor extends React.Component {

    constructor(props) {
        super(props);

        this.state = { dimensions: null };
    }

    componentDidMount() {
        this.updateCanvas()
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        this.updateCanvas();
    }

    updateCanvas() {
        const { sourceCanvas } = this.props;
        if (!sourceCanvas) return;

        copyToCanvas(sourceCanvas, this.canvas);
    }

    render() {
        const { editData, onChange, sourceCanvas } = this.props;
        const { dimensions } = this.state;
        const { artist, title, age } = editData;

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
                    dimensions={dimensions}
                    canvasInit={c => this.canvas = c}
                />

                <div className={'artworkLabelHolder'} style={{ marginBottom: 30 }}>
                    <ArtworkLabel artist={artist}
                        title={title}
                        age={age} />
                </div>

                <div className={'editor--controls labelEditor'}>

                    <TextField
                        label='Title'
                        value={title ? title : ''}
                        onChange={e => onChange({ ...editData, title: restrictDigitsTo(e.target.value, MAX_TITLE_LENGTH) })} />

                    <TextFieldHelperText persistent style={{ alignSelf: 'flex-end' }}>
                        {title ? title.length : 0} of {MAX_TITLE_LENGTH}
                    </TextFieldHelperText>

                    <ArtistSelector
                        currentArtist={artist}
                        onChange={newArtist => onChange({ ...editData, artist: newArtist })} />

                    <TextField
                        type='number'
                        label="Age"
                        value={age ? age : ''}
                        onChange={e => onChange({ ...editData, age: validateAgeInput(e.target.value) })} />

                </div>
            </div >
        );
    }
};

export default LabelEditor;

// const getCanvasDimensions = ({ availableHeight, availableWidth, loadedImageHeight, loadedImageWidth }) => {

//     const hToWRatio = loadedImageWidth / loadedImageHeight;
//     const wToHRatio = loadedImageHeight / loadedImageWidth;

//     const maxW = loadedImageWidth ? Math.min(availableWidth, loadedImageWidth) : availableWidth;
//     const maxH = loadedImageHeight ? Math.min(availableHeight, loadedImageHeight) : availableHeight;

//     let w = maxW;
//     let h = w * wToHRatio;

//     if (h > maxH) {
//         h = maxH;
//         w = h * hToWRatio;
//     }

//     const x = (availableWidth - w) / 2;
//     const y = (availableHeight - h) / 2;

//     return { w, h, x, y };
// }

// HELPER FUNCTIONS
const validateAgeInput = (ageInput) => {
    if (ageInput <= 0) {
        return null;
    }

    const testStr = ageInput + '';
    const restrictedStr = restrictDigitsTo(testStr, 3);
    return parseInt(restrictedStr);
}

const restrictDigitsTo = (testStr, max) => {
    if (testStr.length > max) {
        return testStr.slice(0, max);
    }

    return testStr;
}