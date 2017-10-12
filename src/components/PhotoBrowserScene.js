import PhotoBrowser from 'react-native-photo-browser';
import React, { Component } from 'react';

class PhotoBrowserScene extends Component {
    static navigationOptions = {
        header: null,
    };

    _goBack = () => {
        this.props.navigation.goBack()
    }

    render() {
        const { params } = this.props.navigation.state;
        const media = params.media
        const index = params.index

        return (
            <PhotoBrowser
                onBack={this._goBack}
                mediaList={media}
                initialIndex={index}
                // displayNavArrows={true}
                displayActionButton={true}
                displayTopBar={true}
            />
        );
    }
}

export default PhotoBrowserScene;

