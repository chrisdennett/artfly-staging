import React, { Component } from "react";
// styles
import './quickTitles_styles.css';
// comps
import QuickArtwork from "../quickArtwork/QuickArtwork";
import Butt from "../../global/Butt/Butt";
import WordCountInput from "./wordCountInput/WordCountInput";

class QuickTitlesEditor extends Component {

    constructor(props) {
        super(props);

        this.state = { title: '', artist: '', description: '', date: '' };

        this.onDescriptionChange = this.onDescriptionChange.bind(this);
        this.onTitleChange = this.onTitleChange.bind(this);
        this.onArtistChange = this.onArtistChange.bind(this);
        this.onDateChange = this.onDateChange.bind(this);
        this.onDoneClick = this.onDoneClick.bind(this);
        this.onClearClick = this.onClearClick.bind(this);
    }

    componentWillMount() {
        if (this.props.initialTitles) {
            this.setState({ ...this.props.initialTitles });
        }
    }

    onTitleChange(e) {
        this.setState({ title: e.target.value });
    }

    onArtistChange(e) {
        this.setState({ artist: e.target.value });
    }

    onDescriptionChange(e) {
        this.setState({ description: e.target.value });
    }

    onDateChange(e) {
        this.setState({ date: e.target.value });
    }

    onDoneClick() {
        const { title, artist, description, date } = this.state;
        const titlesPresent = title.length > 0 || artist.length > 0 || description.length > 0;
        const titles = titlesPresent ? { title, artist, description, date } : null;
        this.props.onDone(titles);
    }

    onClearClick() {
        this.setState({ title: '', artist: '', description: '', date: '' });
    }

    render() {
        const { height, width, cropData, masterCanvas, widthToHeightRatio, heightToWidthRatio } = this.props;
        const { title, artist, description, date } = this.state;
        const titlesPresent = title.length > 0 || artist.length > 0 || description.length > 0;
        const titles = titlesPresent ? { title, artist, description, date } : null;

        return (
            <div className={'quickTitles'}>
                <QuickArtwork height={height}
                              width={width}
                              isFixed={true}
                              titles={titles}
                              cropData={cropData}
                              masterCanvas={masterCanvas}
                              widthToHeightRatio={widthToHeightRatio}
                              heightToWidthRatio={heightToWidthRatio}
                />

                <div className={'quickTitles--controls--holder'}>
                    <div className={'quickTitles--controls'}>
                        <h2>Artwork Details:</h2>

                        <WordCountInput label={'Title'}
                                        max={24}
                                        onChange={this.onTitleChange}
                                        value={title}/>

                        <WordCountInput label={'Artist'}
                                        max={24}
                                        onChange={this.onArtistChange}
                                        value={artist}/>

                        <WordCountInput label={'Date'}
                                        max={24}
                                        onChange={this.onDateChange}
                                        value={date}/>

                        <WordCountInput label={'Description'}
                                        max={144}
                                        isMultiline={true}
                                        onChange={this.onDescriptionChange}
                                        value={description}/>

                        <div className={'quickTitles--controls--butts'}>
                            <Butt fullWidth={true} label={'DONE'} green onClick={this.onDoneClick}/>
                            <Butt fullWidth={true} label={'CLEAR'} onClick={this.onClearClick}/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default QuickTitlesEditor;