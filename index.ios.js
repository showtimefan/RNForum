/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import CategoryMainScene from './src/scene/category/CategoryMainScene'
import PadMainScene from './src/scene/pad/PadMainScene'
import ExploreMainScene from './src/scene/explore/ExploreMainScene'
import RecommendMainScene from './src/scene/recommend/RecommendMainScene'
import ForumMainScene from './src/scene/forum/ForumMainScene'
import WebViewPage from './src/components/WebViewPage'
import { StackNavigator, TabNavigator } from 'react-navigation';
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';


const TabContainer = TabNavigator(
    {
        Recommend: { screen: RecommendMainScene },
        Pad: { screen: PadMainScene },
        Forum: { screen: ForumMainScene },
        Explore: { screen: ExploreMainScene },
        Category: { screen: CategoryMainScene }

    },
    {
        lazy: true,
        tabBarPosition: 'bottom',
        tabBarOptions: {
            activeTintColor: '#f1b545',
            inactiveTintColor: '#999999',
            showIcon: true,
            style: {
                backgroundColor: '#fff'
            },
            indicatorStyle: {
                opacity: 0
            },
            tabStyle: {
                padding: 0
            }
        }
    }
);

// export default class RNForum extends Component {
//   render() {
//     return (
//       <View style={styles.container}>
//         <Text style={styles.welcome}>
//           Welcome to React Native!
//         </Text>
//         <Text style={styles.instructions}>
//           To get started, edit index.ios.js
//         </Text>
//         <Text style={styles.instructions}>
//           Press Cmd+R to reload,{'\n'}
//           Cmd+D or shake for dev menu
//         </Text>
//       </View>
//     );
//   }
// }

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
});

const RNForum = StackNavigator(
    {
        Home: {
            screen: TabContainer,
            navigationOptions: {
                headerLeft: null
            }
        },
        Web: { screen: WebViewPage }

    },
    {
        headerMode: 'screen',
        navigationOptions: {
            headerStyle: {
                backgroundColor: '#3e9ce9'
            },
            headerTitleStyle: {
                color: '#fff',
                fontSize: 20
            },
            headerTintColor: '#fff'
        }
    }
);

AppRegistry.registerComponent('RNForum', () => RNForum);
