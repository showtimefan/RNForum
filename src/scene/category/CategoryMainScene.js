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
import {FlatList}  from  'react-native'
import TabBarItem from '../../components/TabBarItem'
import RefreshListView,{RefreshState} from "../../components/RefreshListView"
import CategoryMenuItem from './CategoryMenuItem'
import testData from './data'
import RecommendCell from "./RecommendCell"
import SpacingView from '../../components/SpacingView'
import {
    StyleSheet,
    Text,
    View,
    Image
} from 'react-native'

class CategoryMainScene extends React.Component {
    static navigationOptions = {
        title: '分类',
        tabBarIcon: ({focused, tintColor}) => (
            <TabBarItem
                tintColor={tintColor}
                focused={focused}
                normalImage={require('../../img/tabbar/tab_category.png')}
                selectedImage={require('../../img/tabbar/tab_category_h.png')}
            />
        )
    };

    state: {
        dataList: Array<any>,
        refreshState: number,
    }

    constructor(props) {
        super(props)

        this.state = {
            dataList: [],
            refreshState: RefreshState.Idle,
        }

        {(this: any).keyExtractor = this.keyExtractor.bind(this)}
        {(this: any).renderCell = this.renderCell.bind(this)}
    }

    componentDidMount() {
        this.onHeaderRefresh()
    }

    onHeaderRefresh = () => {
        this.setState({refreshState: RefreshState.HeaderRefreshing})
        // this.fetchData()

        // 模拟网络请求
        setTimeout(() => {
            //获取测试数据
            let dataList = this.getTestList(true)

            this.setState({
                dataList: dataList,
                refreshState: RefreshState.Idle,
            })
        }, 2000)
    }

    onFooterRefresh = () => {
        this.setState({refreshState: RefreshState.FooterRefreshing})

        // 模拟网络请求
        setTimeout(() => {
            //获取测试数据
            let dataList = this.getTestList(false)

            this.setState({
                dataList: dataList,
                refreshState: dataList.length > 50 ? RefreshState.NoMoreData : RefreshState.Idle,
            })
        }, 2000)
    }

    // 获取测试数据，不用在意这里的实现
    getTestList(isReload: boolean): Array<Object> {
        let newList = testData.map((data) => {
            return {
                imageUrl: data.icon_url,
                cover_url:data.cover_url,
                title: data.name,
                subtitle: data.recommended,
                price: data.price,
            }
        })
        let dataList = isReload ? newList : [...this.state.dataList, ...newList]

        for (let i = 0; i < dataList.length; i++) {
            dataList[i].id = i
        }

        return dataList
    }

    fetchData = () => {
        fetch('http://forum-appstore-api.newgamepad.com/games/recommend', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'platform': 2
            }
        }).then((response) => {
            return response.json()
        }).then(function(json) {
            console.log('parsed json', json)
        }).catch((err) => {
            console.error(err);
        });
    }
    keyExtractor = (item: any, index: number) => {
        return item.id
    }


    onPress = () => {
        const { navigate } = this.props.navigation;
        navigate('Web');
    }


    renderCell = (info: Object) => {
        console.log('render cell')

        return <RecommendCell info={info.item}  onPress={this.onPress.bind(this)} />
    }

    render() {
        return (
            <View style={styles.container}>
                <RefreshListView
                    data={this.state.dataList}
                    keyExtractor={this.keyExtractor}
                    ListHeaderComponent={() => this.renderHeader()}
                    numColumns ={2}
                    columnWrapperStyle={{}}
                    renderItem={this.renderCell}
                    refreshState={this.state.refreshState}
                    onHeaderRefresh={this.onHeaderRefresh}
                    onFooterRefresh={this.onFooterRefresh}
                />
            </View>
        )
    }

    renderHeader() {
        return (
            <View style={styles.container}>
                <Text style={styles.headerText}>排行榜</Text>
                <View style = {styles.menuContainer}>
                    <CategoryMenuItem title='热评榜' icon={require('../../img/category/分类-最新上架.png')} />
                    <CategoryMenuItem title='好评榜' icon={require('../../img/category/分类-上升最快.png')} />
                    <CategoryMenuItem title='新上架' icon={require('../../img/category/分类-热门下载.png')} />
                    </View>
                <Text style={styles.headerText}>游戏类型</Text>
                <SpacingView />
            </View>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        backgroundColor: 'white',
        height:184,
    },
    menuContainer: {
        flex: 1,
        flexDirection:'row',
        justifyContent: 'space-between',
        backgroundColor: 'white',
        height:124,
    },
    headerText: {
        fontSize: 16,
        marginLeft:20,
        margin: 15,
    },
    itemContainer: {
        flexDirection: 'row',
    },
});

export default CategoryMainScene;
