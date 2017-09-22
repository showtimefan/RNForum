/*
*
* Api service
*
*/

let common_url = 'http://forum-appstore-api.newgamepad.com/';  //服务器地址
let token = '';

export const fetchRequest = (url, method, params = '') => {
    let header = {
        "Content-Type": "application/json;charset=UTF-8",
        'platform': 2,
    };
    console.log('request url:',url,params);  //打印请求参数
    if(params == ''){   //如果网络请求中带有参数
        return new Promise(function (resolve, reject) {
            fetch(common_url + url, {
                method: method,
                headers: header
            }).then((response) => response.json())
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
                .then((responseData) => {
                    console.log('res:',url, responseData);   //网络请求成功返回的数据
                    resolve(responseData);
                })
                .catch( (err) => {
                    console.log('err:',url, err);   //网络请求失败返回的数据
                    reject(err);
                });
        });
    }
}

// apis
export default class Api {
    static getRecommendPosts() {
        return fetchRequest('games/recommend', 'GET');
    }

}
