import React, {Component} from 'react'
import {View, StyleSheet, Text, Platform} from 'react-native'
import RefreshListView,{RefreshState} from "../../components/RefreshListView"
import PostCell from "./PostCell"
import testData from './Postdata'

class PostListView extends Component {
    static navigationOptions = {
        title: '社区',
    }
    ;
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
            // let img_urls_1=data.img_urls[0]['img_src']['thumb']
            // console.log('fdsfd')

            // console.log(img_urls_1)

            return {
                post_url: ('http://clan.m.newgamer.com/m/posts/') + data.id,
                id:data.id,
                avatar_url: data.avatar_url,
                nick_name:data.nick_name,
                title: data.title,
                summary: data.summary,
                img_urls_1:data.img_urls[0]['img_src']['thumb'],
                img_urls_2:data.img_urls[1]['img_src']['thumb'],

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

    renderCell = (info: Object ) => {
        console.log('render cell')

        return <PostCell info={info.item} onPress={this.onPress} />
    }

    onPress = (info) => {
        console.log('render cell')

        const { navigate } = this.props.navigation;
        // navigate('Web', {info:'http://clan.m.newgamer.com/m/posts/60000000053083'});
        //  let url = ('http://clan.m.newgamer.com/m/posts/')+ (info.id).toString()
        let postUrl  = ('http://clan.m.newgamer.com/m/posts/').concat(''+ info.id)
        // let postUrl = 'http://clan.m.newgamer.com/m/posts/60000000053083'
        navigate('Web', {postUrl:info.post_url});

    }

    render() {
        console.log('render scene')
        return (
            <View style={styles.container}>
                <RefreshListView
                    data={this.state.dataList}
                    keyExtractor={this.keyExtractor}
                    renderItem={this.renderCell}
                    refreshState={this.state.refreshState}
                    onHeaderRefresh={this.onHeaderRefresh}
                    onFooterRefresh={this.onFooterRefresh}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 0,
    },
    title: {
        fontSize: 18,
        height: 84,
        textAlign: 'center'
    }
})

export default PostListView