import React, {Component} from 'react'
import {View, StyleSheet, Text, Platform} from 'react-native'
import RefreshListView,{RefreshState} from "../../components/RefreshListView"
import testData from './data'
import RecommendCell from "./RecommendCell"
import {Api, fetchRequest} from "../../manage/api"

class RecommendListView extends Component {
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
        this.fetchData()
    }

    onFooterRefresh = () => {
        this.setState({refreshState: RefreshState.FooterRefreshing})
        this.fetchMoreDate()

        // // 模拟网络请求
        // setTimeout(() => {
        //     //获取测试数据
        //     let dataList = this.getTestList(false)
        //
        //     this.setState({
        //         dataList: dataList,
        //         refreshState: dataList.length > 50 ? RefreshState.NoMoreData : RefreshState.Idle,
        //     })
        // }, 2000)
    }

    fetchData = () => {
        fetchRequest('games/recommend', 'GET').then(
            data => {
                console.log('aaaa')

                let newList = data.map((item) => {
                    return {
                        imageUrl: item.icon_url,
                        cover_url:item.cover_url,
                        title: item.name,
                        subtitle: item.recommended,
                        price: item.price,
                    }
                })
                for (let i = 0; i < newList.length; i++) {
                    newList[i].id = i
                }

                this.setState({
                    dataList: newList,
                    refreshState: RefreshState.Idle,
                })
            }
        ).catch(
            err=>{
                // showToast(err);
            }
        )
    }

    fetchMoreDate = () => {
        let params = {
            'limit': 20,
            'offset': this.state.dataList.length
        }

        url = 'games/recommend?limit=20&offset=' + this.state.dataList.length
        fetchRequest(url, 'GET').then(
            data => {
                console.log('bbbbb')
                let newList = data.map((item) => {
                    return {
                        imageUrl: item.icon_url,
                        cover_url:item.cover_url,
                        title: item.name,
                        subtitle: item.recommended,
                        price: item.price,
                    }
                })
                //
                // for (let i = 0; i < newList.length; i++) {
                //     newList[i].id =
                // }

                this.setState({
                    dataList: this.state.dataList.concat(newList),
                    refreshState: newList.length < 20 ? RefreshState.NoMoreData : RefreshState.Idle,
                })
            }
        ).catch(
            err=>{
                // showToast(err);
            }
        )
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

export default RecommendListView