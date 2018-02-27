import React, { Component } from "react";
// styles
import './quickTitles_styles.css';
// comps
import QuickArtwork from "../quickArtwork/QuickArtwork";
import Butt from "../../global/Butt/Butt";

class QuickTitlesEditor extends Component {

    constructor(props) {
        super(props);

        this.state = { title: '', artist: '', description: '' };

        this.onDescriptionChange = this.onDescriptionChange.bind(this);
        this.onTitleChange = this.onTitleChange.bind(this);
        this.onArtistChange = this.onArtistChange.bind(this);
        this.onDoneClick = this.onDoneClick.bind(this);
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

    onDoneClick(){
        console.log("this.state: ", this.state);
    }

    render() {
        const { height, width, cropData, masterCanvas, widthToHeightRatio, heightToWidthRatio } = this.props;
        const { title, artist, description } = this.state;
        const titlesPresent = title.length > 0 || artist.length > 0 || description.length > 0;
        const titles = titlesPresent ? {title, artist, description} : null;

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
                        <div>
                            Title:
                        </div>
                        <input type="text"
                               onChange={this.onTitleChange}
                               value={title}/>

                        <div>
                            Artist:
                        </div>
                        <input type="text"
                               onChange={this.onArtistChange}
                               value={artist}/>

                        <div>
                            Description:
                        </div>
                        <textarea rows="6"
                                  cols="50"
                                  onChange={this.onDescriptionChange}
                                  value={description}/>

                        <div>
                            <Butt label={'DONE'} onClick={this.onDoneClick}/>
                            <Butt label={'CANCEL'}/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default QuickTitlesEditor;