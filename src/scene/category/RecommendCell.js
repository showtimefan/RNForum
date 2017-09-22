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
                <Image source={{uri: info.imageUrl}} style={styles.icon} />
                <Text style={styles.title}>{info.title}</Text>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        backgroundColor: 'white',
        alignItems:'center',
        maxWidth: 400,
        margin:10,
    },
    icon: {
        width: 52,
        height: 52,
        borderRadius: 5,
        marginLeft:21,
    },
    title: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#222222',
        marginLeft: 15,
    },
})

export default RecommendCell
