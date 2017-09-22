/**
 * Copyright (c) 2017-present, Liu Jinyong
 * All rights reserved.
 *
 * https://github.com/huanxsd/MeiTuan  
 * @flow
 */

//import liraries
import React, { PureComponent } from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'

class CategoryMenuItem extends PureComponent {
    render() {
        return (
            <TouchableOpacity style={styles.container}
                onPress={this.props.onPress}>
                <Image source={this.props.icon} resizeMode='contain' style={styles.icon} />
                <Text style={styles.text}>
                    {this.props.title}
                </Text>
            </TouchableOpacity>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        flex:1,
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    icon: {
        width: 56,
        height: 56,
        margin: 10,
    },
    text: {
        fontSize: 14,
    }
});

export default CategoryMenuItem;
