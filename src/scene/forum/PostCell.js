/**
 * Copyright (c) 2017-present, Liu Jinyong
 * All rights reserved.
 *
 * https://github.com/huanxsd/MeiTuan
 * @flow
 */

import React, {PureComponent} from 'react'
import {View, Text, StyleSheet, TouchableOpacity, Image, PixelRatio} from 'react-native'

const color = {
    theme: '#06C1AE',
    border: '#e0e0e0',
    background: '#f3f3f3'
}

class PostCell extends PureComponent {

    render() {
        let {info} = this.props

        return (
            <TouchableOpacity style={styles.container} onPress={()=>this.props.onPress(info)}>
                <View style={styles.top}>
                    <Image source={{uri: info.avatar_url}} style={styles.icon} />

                    <Text style={styles.type } >{info.nick_name}</Text>
                </View>
                <Text style={styles.title } >{info.title}</Text>
                <Text style={styles.content } numberOfLines={2}>{info.summary}</Text>

                <View style={styles.images}>
                    <Image source={{uri: info.img_urls_1}} style={styles.cover1} />
                    <Image source={{uri: info.img_urls_2}} style={styles.cover2} />

                </View>
            </TouchableOpacity>

        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        borderColor: color.border,
        backgroundColor: 'white',
    },
    top: {
        flex:1,
        flexDirection: 'row',
    },

    title: {
        lineHeight:18,
        fontSize: 15,
        color: '#2C2C2C',
        marginLeft:17,
        marginTop:5,
        marginBottom:5,
    },
    content:{
        lineHeight:18,
        fontSize: 12,
        color: '#7E7E7E',
        marginLeft:10,
        marginTop:5,
        marginBottom:5,
    },
    images:{
        margin:10,
        flex:1,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    cover1: {
        flex:1,
        height: 100,
        marginRight:5,
        resizeMode: Image.resizeMode.stretch,
    },
    cover2: {
        flex:1,
        height: 100,
        marginLeft:5,
        resizeMode: Image.resizeMode.stretch,

    },
    bottom: {

    },
    icon: {
        width: 24,
        height: 24,
        borderRadius: 5,
        marginLeft:10,
        marginTop:10,
    },

    title: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#222222',
        paddingTop: 4,
        paddingLeft:10,
    },
    desc: {
        lineHeight:18,
        fontSize: 13,
        color: '#2C2C2C',
        marginLeft:17,
        marginBottom:10,

    },
    type: {
        fontSize: 13,
        color: '#7E7E7E',
        paddingLeft: 8,
        paddingTop: 4,
        marginTop:10,
    },
    rightContainer: {
        flex: 1,
    },
    price: {
        color: color.theme
    },
})

export default PostCell
