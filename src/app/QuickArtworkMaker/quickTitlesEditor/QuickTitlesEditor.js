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

        const maxTitleLength = 24;
        const maxArtistLength = 24;
        const maxDescriptionLength = 150;
        const maxDateLength = 24;

        this.state = { title: '', artist: '', description: '', date: '', maxTitleLength, maxArtistLength, maxDescriptionLength, maxDateLength };

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

    onTitleChange(value) {
        this.setState({ title: value});
    }

    onArtistChange(value) {
        this.setState({ artist: value });
    }

    onDescriptionChange(value) {
        this.setState({ description: value });
    }

    onDateChange(value) {
        this.setState({ date: value });
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
        const { title, artist, description, date, maxTitleLength, maxArtistLength, maxDescriptionLength } = this.state;
        const titlesPresent = title.length > 0 || artist.length > 0 || description.length > 0;
        const titles = titlesPresent ? { title, artist, description, date } : null;

        const showArtwork = width > 800;
        let controlsClass = 'quickTitles--controls--holder--partView';
        if(!showArtwork){
            controlsClass = 'quickTitles--controls--holder--fullView'
        }

        return (
            <div className={'quickTitles'}>

                {showArtwork &&
                <QuickArtwork height={height}
                              width={width}
                              isFixed={true}
                              titles={titles}
                              cropData={cropData}
                              masterCanvas={masterCanvas}
                              widthToHeightRatio={widthToHeightRatio}
                              heightToWidthRatio={heightToWidthRatio}
                />
                }

                <div className={`quickTitles--controls--holder ${controlsClass}`}>
                    <div className={'quickTitles--controls'}>
                        <h2>Artwork Details:</h2>

                        <WordCountInput label={'Title'}
                                        max={maxTitleLength}
                                        onChange={this.onTitleChange}
                                        value={title}/>

                        <WordCountInput label={'Artist'}
                                        max={maxArtistLength}
                                        onChange={this.onArtistChange}
                                        value={artist}/>

                        <WordCountInput label={'Date'}
                                        max={24}
                                        onChange={this.onDateChange}
                                        value={date}/>

                        <WordCountInput label={'Description'}
                                        max={maxDescriptionLength}
                                        isMultiline={true}
                                        onChange={this.onDescriptionChange}
                                        value={description}/>

                        <div className={'quickTitles--controls--butts'}>
                            <Butt fullWidth={true} label={'DONE'} green onClick={this.onDoneClick}/>
                            <Butt fullWidth={true} label={'CLEAR ALL'} onClick={this.onClearClick}/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default QuickTitlesEditor;