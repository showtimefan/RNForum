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

class RecommendCell extends PureComponent {

    render() {
        let {info} = this.props

        return (
            <TouchableOpacity style={styles.container} onPress={this.props.onPress}>
                <View style={{flexDirection:'row'}}>
                    <Image source={{uri: info.imageUrl}} style={styles.icon} />

                    <Text style={styles.type } >编辑推荐</Text>
                </View>

                <Text style={styles.title}>{info.title}</Text>
                <Image source={{uri: info.cover_url}} style={styles.cover} />
                <Text style={styles.desc} numberOfLines={2}>{info.subtitle}</Text>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        // padding: 10,
        borderBottomWidth: 1 / PixelRatio.get(),
        borderColor: color.border,
        backgroundColor: 'white',
    },
    icon: {
        width: 24,
        height: 24,
        borderRadius: 5,
        marginLeft:17,
        marginTop:10,
    },
    cover: {
        marginTop:4,
        marginBottom:4,
        height: 148,
    },
    title: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#222222',
        paddingTop: 4,
        paddingLeft:17,
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

export default RecommendCell
