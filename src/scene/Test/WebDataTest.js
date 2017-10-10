import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    TouchableHighlight,
    WebView
} from 'react-native';
class WebDataTest extends Component {
    constructor(props) {
        super(props);
        this.state = {
            webViewData: ''
        };
        this.data = 0;
        this.sendMessage = this.sendMessage.bind(this);
        this.handleMessage = this.handleMessage.bind(this);
    }
    sendMessage() {
        this.webview.postMessage(++this.data);
    }
    handleMessage(e) {
        this.setState({ webViewData: e.nativeEvent.data });
    }
    render() {
        return (
            <View style={styles.container}>
                <TouchableHighlight
                    style={styles.button}
                    onPress={this.sendMessage}
                >
                    <Text>发送数据到WebView</Text>
                </TouchableHighlight>
                <View>
                    <Text>来自WebView的数据: <Text>{ this.state.webViewData }</Text></Text>
                </View>
                <WebView
                    style={styles.webview}
                    source={require('./index.html')}
                    ref={webview => this.webview = webview}
                    onMessage={this.handleMessage}
                />
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
        paddingTop: 40
    },
    button: {
        width: 150,
        height: 40,
        backgroundColor: 'blue',
        justifyContent: 'center',
        alignItems: 'center',
    },
    webview: {
        width: 250,
        height: 250
    }
});
export default WebDataTest;
