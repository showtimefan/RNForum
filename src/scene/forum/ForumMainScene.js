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
import ScrollableTabView, {
    DefaultTabBar
} from 'react-native-scrollable-tab-view';

import {
    StyleSheet,
    Text,
    View
} from 'react-native'
import PostListView from '../forum/PostListView'
class ForumMainScene extends React.Component {
    static navigationOptions = {
        title: '社区',
        tabBarIcon: ({focused, tintColor}) => (
            <TabBarItem
                tintColor={tintColor}
                focused={focused}
                normalImage={require('../../img/tabbar/tab_forum.png')}
                selectedImage={require('../../img/tabbar/tab_forum_h.png')}
            />
        )
    }
    ;

    render() {
        return (
            <View style={styles.container}>
                <ScrollableTabView
                    renderTabBar={() =>
                        <DefaultTabBar tabStyle={styles.tab} textStyle={styles.tabText} />}
                    tabBarBackgroundColor="#fcfcfc"
                    tabBarUnderlineStyle={styles.tabBarUnderline}
                    tabBarActiveTextColor="#f1b545"
                    tabBarInactiveTextColor="#aaaaaa"
                >
                    <PostListView tabLabel='全部'  navigation={this.props.navigation} />
                    <Text tabLabel='精华'>favorite</Text>
                    <Text tabLabel='攻略'>project</Text>
                    <Text tabLabel='成员'>project</Text>
                    <Text tabLabel='活动'>project</Text>

                </ScrollableTabView>
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
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
    tab: {
        paddingBottom: 0,
        height:100,
    },
    tabText: {
        fontSize: 16
    },
    tabBarUnderline: {
        backgroundColor: '#f1b545',
        height: 2
    }
});

export default ForumMainScene;
