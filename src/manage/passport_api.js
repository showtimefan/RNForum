/*
*
* 登录部分接口
*
*/

let common_url = 'https://passport.newgame.com/api/';  //服务器地址
let token = '';
import storage from './Storage'

function checkStatus(response) {
    if (response.data){
        console.log('234234234234');
        return response;
    }else{
        throw response.meta.message;
    }
}


const passport_fetch = async (url, method, params = '') => {
    //获取存储Token
    let token= await storage.load({
        key:'token'
    })

    let header = {
        "Content-Type": "application/json;charset=UTF-8",
        'platform': 2,
    };

    if (token.length) {
        header['Authorization'] = 'Bearer ' + token
    }

    console.log('request url:',url, params, header);  //打印请求参数
    if(params == ''){   //如果网络请求中带有参数
        return new Promise(function (resolve, reject) {
            fetch(common_url + url, {
                method: method,
                headers: header
            }).then((response) => response.json())
                .then(checkStatus)
                .then((responseData) => {
                    console.log('res:',url,responseData);  //网络请求成功返回的数据
                    resolve(responseData['data']);
                })
                .catch( (err) => {
                    console.log('err:',url, err);     //网络请求失败返回的数据
                    reject(err);
                });
        });
    }else{   //如果网络请求中没有参数
        return new Promise(function (resolve, reject) {
            fetch(common_url + url, {
                method: method,
                headers: header,
                body:JSON.stringify(params)   //body参数，通常需要转换成字符串后服务器才能解析
            }).then((response) => response.json())
                .then(checkStatus)
                .then((responseData) => {
                    console.log('res:',url, responseData);   //网络请求成功返回的数据
                    resolve(responseData['data']);
                })
                .catch( (err) => {
                    console.log('err:',url, err);   //网络请求失败返回的数据
                    reject(err);
                });
        });
    }
}


export default passport_fetch;

// // apis
// export default class Api {
//     static getRecommendPosts() {
//         return fetchRequest('games/recommend', 'GET');
//     }
//
// }
