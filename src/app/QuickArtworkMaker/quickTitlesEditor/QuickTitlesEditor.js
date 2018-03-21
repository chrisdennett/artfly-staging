import React, { Component } from "react";
// styles
import './quickTitles_styles.css';
// comps
import QuickArtwork from "../quickArtwork/QuickArtwork";
import Butt from "../../global/Butt/Butt";
import WordCountInput from "./wordCountInput/WordCountInput";
import ToolControlPanel from "../../global/toolControlPanel/ToolControlPanel";

class QuickTitlesEditor extends Component {

    constructor(props) {
        super(props);

        const maxTitleLength = 24;
        const maxArtistLength = 24;
        const maxDescriptionLength = 170;
        const maxDateLength = 24;

        this.state = {initialData:null, maxTitleLength, maxArtistLength, maxDescriptionLength, maxDateLength };

        this.onDescriptionChange = this.onDescriptionChange.bind(this);
        this.onTitleChange = this.onTitleChange.bind(this);
        this.onArtistChange = this.onArtistChange.bind(this);
        this.onDateChange = this.onDateChange.bind(this);
        this.onDoneClick = this.onDoneClick.bind(this);
        this.onClearClick = this.onClearClick.bind(this);
        this.onCancelClick = this.onCancelClick.bind(this);
    }

    componentWillMount() {
        this.setState({initialData: this.props.titlesData});
    }

    onTitleChange(value) {
        const newTitlesData = {...this.props.titlesData, title:value};
        this.props.onDataChange({titlesData:newTitlesData});
    }

    onArtistChange(value) {
        const newTitlesData = {...this.props.titlesData, artist:value};
        this.props.onDataChange({titlesData:newTitlesData});
        // this.setState({ artist: value });
    }

    onDescriptionChange(value) {
        const newTitlesData = {...this.props.titlesData, description:value};
        this.props.onDataChange({titlesData:newTitlesData});
        // this.setState({ description: value });
    }

    onDateChange(value) {
        // this.setState({ date: value });
        const newTitlesData = {...this.props.titlesData, date:value};
        this.props.onDataChange({titlesData:newTitlesData});
    }

    onDoneClick() {
        /*const { title, artist, description, date } = this.state;
        const titlesPresent = title.length > 0 || artist.length > 0 || description.length > 0;
        const titlesData = titlesPresent ? { title, artist, description, date } : null;*/
        this.props.onDone();
    }

    onClearClick() {
        this.setState({ title: '', artist: '', description: '', date: '' });
    }

    onCancelClick(){
        this.props.onCancel();
    }

    render() {
        const { titlesData } = this.props;
        const { maxTitleLength, maxArtistLength, maxDescriptionLength } = this.state;
        const {title, artist, description, date} = titlesData;
        // const titlesPresent = title.length > 0 || artist.length > 0 || description.length > 0;
        // const titlesData = titlesPresent ? { title, artist, description, date } : null;
        // const modifiedArtworkData = {...artworkData, titlesData};

        /*const showArtwork = width > 800;
        let controlsClass = 'quickTitles--controls--holder--partView';
        if(!showArtwork){
            controlsClass = 'quickTitles--controls--holder--fullView'
        }*/

        return (
            <div className={'quickTitles'}>

                <ToolControlPanel>

                </ToolControlPanel>

                <div className={`quickTitles--controls--holder quickTitles--controls--holder--partView`}>
                    <div className={'quickTitles--controls'}>
                        <h2>Artwork Titles:</h2>

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

                        <div className={'quickTitles--controls--helpText'}>
                            If you'd like a bit of help coming up with a fancy description, I've made the <a href={'https://lab.artfly.io/art-pifflator/'}
                               target='_blank'
                               rel="noopener noreferrer">
                                Art Pifflator
                            </a> to help.  Use it to generate some text, then come back and paste it in.
                        </div>

                        <div className={'quickTitles--controls--butts'}>
                            <Butt fullWidth={true} label={'DONE'} green onClick={this.onDoneClick}/>
                            <Butt fullWidth={true} label={'CLEAR ALL'} onClick={this.onClearClick}/>
                            <Butt fullWidth={true} label={'CANCEL'} red onClick={this.onCancelClick}/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default QuickTitlesEditor;