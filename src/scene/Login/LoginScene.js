import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    Alert,
} from 'react-native';
import Toast from 'react-native-easy-toast'
import passport_fetch from '../../manage/passport_api'
import config from '../../manage/config'
class LoginScene extends Component {
    static navigationOptions = {
        title: '登录',
    };
    username = '';
    password = '';

    onUsernameChanged = (newUsername) => {
        this.username = newUsername;
    };

    onPasswordChanged = (newPassword) => {
        this.password = newPassword;
    };

    //用户登录，获取token
    fetch_login = () => {
        let params = {
            account: this.username,
            password: this.password,
            client_secret: config.app_client_secret,
            client_id: config.app_client_id
        }

        passport_fetch('users/signin', 'POST', params).then(
            (data) => {
                global.storage.save({
                    key:'token',
                    data: data.access_token,
                    expires: null
                });

                this.refs.toast.show('登录成功');
                this.fetchUserInfo()
                // this.props.navigation.goBack();
            }
        ).catch(
            err=>{
                this.refs.toast.show(err);
            }
        )
    }

    //用户登录，获取token、
    fetchUserInfo = () => {
        passport_fetch('users/me', 'GET').then(
            () => {
                this.refs.toast.show('获取信息成功');
            }
        ).catch(
            err=>{
                // Alert.alert('',err);
                this.refs.toast.show(err);
            }
        )
    }
    login = () => {
        this.fetch_login()
    };

    render() {
        return (
            <View style={styles.container}>
                <Toast ref="toast" position='center'/>

                <View style={styles.account_container}>
                    <Text style={styles.title}>帐号</Text>
                    <TextInput
                        onChangeText={this.onUsernameChanged}
                        style={styles.input}
                        placeholder={'手机号'}//提示文本内容
                        returnKeyType='next'
                        onSubmitEditing={()=>{
                            this.password.focus();
                        }}/>
                </View>
                <View style={styles.split_view}><View></View></View>
                <View style={styles.password_container}>
                    <Text style={styles.title}>密码</Text>
                    <TextInput
                        onChangeText={this.onPasswordChanged}
                        placeholder={'输入密码'}
                        underlineColorAndroid={'transparent'}
                        secureTextEntry={true}//密码输入框
                        ref = {(view) =>this.password = view}
                        style={styles.input}/>
                </View>
                <View style={styles.split_view}></View>
                <TouchableOpacity
                    onPress={this.login}
                    style={styles.button_login}>
                    <Text style={styles.btText}>登录</Text>
                </TouchableOpacity>

                <View style={styles.bottom_container}>
                    <TouchableOpacity style={styles.btn}>
                        <Text style={styles.btn_register}>注册</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.btn}>
                        <Text style={styles.btn_forget}>忘记密码</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        backgroundColor: '#FFF',
        paddingLeft:15,
        paddingRight:15,
    },
    img: {
        width: 30,
        height: 30,
    },

    account_container: {
        marginTop:50,
        paddingLeft:15,
        paddingRight:15,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: 50,
        backgroundColor: '#FFF',
    },
    password_container: {
        marginTop:10,
        paddingLeft:15,
        paddingRight:15,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: 50,
        backgroundColor: '#FFF',
    },
    title: {
        // flex:1,
        fontSize: 16,
        //margin:15,
        width:50,
    },

    input: {
        flex:1,
        alignSelf:'center',
        marginLeft:17,
        marginTop:5,
        marginBottom:5,
        height: 40,
        color: '#000',
        fontSize: 15,
    },
    split_view: {
        alignSelf: 'stretch',
        height: 1,
        backgroundColor:'#e2e3e7',
    },
    button_login: {
        marginTop:40,
        height: 45,
        width: 284,
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 70,
        backgroundColor: '#ffbb32',
        marginBottom: 8,
    },
    btText: {
        color: '#fff',
        fontSize:16,
    },

    bottom_container: {
        marginTop:20,
        flex:1,
        flexDirection: 'row',
        justifyContent: 'center',
    },

    btn: {
        flex:1,
        height:40,
        justifyContent: 'center',
    },

    btn_register: {
        marginRight:5,
        color: '#ff9d01',
        fontSize:14,
        textAlign: 'right',
    },
    btn_forget: {
        marginLeft:5,
        color: '#ff9d01',
        fontSize:14,
        textAlign: 'left',

    }
});

module.exports = LoginScene;