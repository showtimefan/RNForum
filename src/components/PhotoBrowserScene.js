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
        let media = [{
            photo: 'http://farm3.static.flickr.com/2667/4072710001_f36316ddc7_b.jpg',
        }, {
            photo: 'http://upload.jianshu.io/users/upload_avatars/7662390/7a2e6533-2c5a-4867-9f65-4c9560b83b61?imageMogr2/auto-orient/strip|imageView2/1/w/240/h/240',
        }, {
            photo: 'http://farm3.static.flickr.com/2449/4052876281_6e068ac860_b.jpg',
            thumb: 'http://farm3.static.flickr.com/2449/4052876281_6e068ac860_q.jpg',
            selected: false,
            caption: 'Beautiful Eyes',
        }]

        return (
            <PhotoBrowser
                onBack={this._goBack}
                mediaList={media}
                initialIndex={1}
                displayNavArrows={true}
                displayActionButton={true}
                displayTopBar={true}
            />
        );
    }
}

export default PhotoBrowserScene;

