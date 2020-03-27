import React, { Component } from "react";
import { Spring } from 'react-spring'
// ui
import { Typography } from "@rmwc/typography";
import { CircularProgress } from "@rmwc/circular-progress";
import '@rmwc/circular-progress/circular-progress.css';

class ImageLoader extends Component {

    constructor(props) {
        super(props);

        this.state = { loadedUrl: null };

        this.onLoad = this.onLoad.bind(this);
    }

    componentDidUpdate() {
        const { url } = this.props;
        const { loadedUrl } = this.state;

        if (loadedUrl && url !== loadedUrl) {
            this.setState({ loadedUrl: null });
        }
    }

    onLoad(e) {
        const { url, onImgLoaded } = this.props;
        this.setState({ loadedUrl: url });

        if (onImgLoaded) {
            onImgLoaded({ h: e.target.naturalHeight, w: e.target.naturalWidth });
        }
    }

    render() {
        const { url } = this.props;
        const { loadedUrl } = this.state;

        return (
            <React.Fragment>

                {loadedUrl &&
                    <Spring from={{ opacity: 0 }} to={{ opacity: 1 }}>
                        {props =>
                            <img src={loadedUrl}
                                style={props}
                                className={'galleryArtwork'}
                                alt={'gallery artwork'} />
                        }
                    </Spring>
                }

                {url && !loadedUrl &&
                    <img src={url}
                        style={{ display: 'none' }}
                        alt={'gallery artwork'}
                        onLoad={this.onLoad} />
                }

                {!loadedUrl &&
                    <div style={{
                        textAlign: 'center', height: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}>
                        <div>
                            <CircularProgress size="large" />
                            <Typography use={'button'} tag={'div'}>
                                Loading artwork
                            </Typography>
                        </div>
                    </div>
                }
            </React.Fragment>
        );
    }
}

export default ImageLoader;