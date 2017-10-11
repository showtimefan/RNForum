/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import CategoryMainScene from './src/scene/category/CategoryMainScene'
import ExploreMainScene from './src/scene/explore/ExploreMainScene'
import RecommendMainScene from './src/scene/recommend/RecommendMainScene'
import ForumMainScene from './src/scene/forum/ForumMainScene'
import WebViewPage from './src/components/WebViewPage'
import PhotoBrowserScene from './src/components/PhotoBrowserScene'

import LoginScene from './src/scene/Login/LoginScene'
import { StackNavigator, TabNavigator } from 'react-navigation';
import React, { Component } from 'react';
import WebDataTest from './src/scene/Test/WebDataTest'
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';


const TabContainer = TabNavigator(
    {
        Recommend: { screen: RecommendMainScene },
        Forum: { screen: ForumMainScene },
        Explore: { screen: ExploreMainScene },
        Category: { screen: CategoryMainScene },
        TestWeb: {screen: PhotoBrowserScene}
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
        Web: { screen: WebViewPage },
        Login: { screen: LoginScene },
        Photo: {screen: PhotoBrowserScene}
    },
    {
        headerMode: 'screen',
        navigationOptions: {
            headerStyle: {
                backgroundColor: '#FFF'
            },
            headerTitleStyle: {
                color: '#000',
                fontSize: 20
            },
            headerBackTitle:null,
            headerTintColor: '#000'
        }
    }
);

AppRegistry.registerComponent('RNForum', () => RNForum);
