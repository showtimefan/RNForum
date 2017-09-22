/**
 *
 * Copyright 2016-present reading
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */
// import React from 'react';
import React from 'react';
import TabBarItem from '../../components/TabBarItem'
import { Image } from 'react-native'


import {
    StyleSheet,
    Text,
    View
} from 'react-native'

class ExploreMainScene extends React.Component {
    static navigationOptions = {
        title: '发现',
        tabBarIcon: ({focused, tintColor}) => (
            <TabBarItem
                tintColor={tintColor}
                focused={focused}
                normalImage={require('../../img/tabbar/tab_explore.png')}
                selectedImage={require('../../img/tabbar/tab_explore_h.png')}
            />
        )
    }

    ;

    render() {
        return (
            <View style={styles.container}>
                <Image source={{uri: 'https://facebook.github.io/react/img/logo_og.png'}}
                       style={{width: 400, height: 400}} />
                <Text style={styles.instructions}>
                    To get started, edit index.ios.js
                </Text>
                <Text style={styles.instructions}>
                    Press Cmd+R to reload,{'\n'}
                    Cmd+D or shake for dev menu
                </Text>
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
    },
    welcome: {
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});

export default ExploreMainScene;
