import React from 'react';
import { connect } from 'react-redux';
import Autosuggest from 'react-autosuggest';
// styles
import './artistSelector_styles.css'
// reselectors
import { getUserArtists, getCurrentArtistParam } from '../../selectors/Selectors';
// ui
import { IconButton } from '@rmwc/icon-button';
import { Select } from '@rmwc/select';
import { isUndefined } from 'util';
import { containsNonBlankText } from '../global/UTILS';

// Teach Autosuggest how to calculate suggestions for any given input value.
const getSuggestions = (value, artists) => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;

    return inputLength === 0 ? [] : artists.filter(artist =>
        artist.name.toLowerCase().slice(0, inputLength) === inputValue
    );
};

// When suggestion is clicked, Autosuggest needs to populate the input
// based on the clicked suggestion. Teach Autosuggest how to calculate the
// input value for every given suggestion.
const getSuggestionValue = suggestion => suggestion.name;

// Use your imagination to render suggestions.
const renderSuggestion = suggestion => (
    <div>
        {suggestion.name}
    </div>
);

class ArtistSelector extends React.Component {
    constructor(props) {
        super(props);

        // Autosuggest is a controlled component.
        // This means that you need to provide an input value
        // and an onChange handler that updates this value (see below).
        // Suggestions also need to be provided to the Autosuggest,
        // and they are initially empty because the Autosuggest is closed.
        this.state = {
            showNewArtistField: false,
            suggestions: []
        };
    }

    componentDidMount() {
        const { currentArtist, initialArtist, onChange } = this.props;

        if (currentArtist) return;

        if (initialArtist) {
            onChange(initialArtist);
        }
    }

    onChange = (event, { newValue }) => {
        this.props.onChange(newValue);
    };

    // Autosuggest will call this function every time you need to update suggestions.
    // You already implemented this logic above, so just use it.
    onSuggestionsFetchRequested = ({ value }) => {
        this.setState({
            suggestions: getSuggestions(value, this.props.artists)
        });
    };

    // Autosuggest will call this function every time you need to clear suggestions.
    onSuggestionsClearRequested = () => {
        this.setState({
            suggestions: []
        });
    };

    clearArtist = () => {
        this.props.onChange('');
    };

    onAddNewArtist = () => {
        this.setState({ showNewArtistField: true });
        this.props.onChange('');
    };

    render() {
        const { suggestions, showNewArtistField } = this.state;
        const { artists, currentArtist } = this.props;

        if (!artists) return null;

        const hasArtistValue = !isUndefined(currentArtist) && containsNonBlankText(currentArtist);
        const selected = hasArtistValue ? currentArtist : '';
        const currentArtistInArtistList = artists.filter(artist => artist.name === selected).length > 0;
        const hasArtists = artists && artists.length > 0;
        const showArtistSelector = hasArtists && !showNewArtistField;

        // Autosuggest will pass through all these props to the input.
        const inputProps = {
            placeholder: 'Artist',
            value: selected,
            onChange: this.onChange
        };

        const selectorArr = artists ? artists.map(artist => ({ label: artist.name })) : [];

        return (
            <div>
                {
                    showArtistSelector &&
                    <div style={{ display: 'flex' }}>
                        <Select
                            style={{ width: '100%' }}
                            value={currentArtistInArtistList ? selected : ''}
                            onChange={evt => this.props.onChange(evt.target.value)}
                            label="Artist"
                            options={selectorArr}
                        />

                        <IconButton icon="add" label="Add a new artist"
                            onClick={() => this.onAddNewArtist()} />

                        <IconButton icon="delete_forever" label="Clear current artist"
                            onClick={() => this.clearArtist()} />
                    </div>
                }

                {
                    !showArtistSelector &&
                    <div style={{ display: 'flex' }}>
                        <Autosuggest
                            suggestions={suggestions}
                            onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                            onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                            getSuggestionValue={getSuggestionValue}
                            renderSuggestion={renderSuggestion}
                            inputProps={inputProps}
                        />
                        <IconButton icon="close" label="Cancel add a new artist"
                            onClick={() => this.setState({ showNewArtistField: false })} />
                    </div>
                }
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        artists: getUserArtists(state),
        initialArtist: getCurrentArtistParam(state),
    }
};
export default connect(mapStateToProps)(ArtistSelector);
