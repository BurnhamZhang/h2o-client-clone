/**
 * Created by zhangbohan on 16/11/16.
 */
import fetch from 'isomorphic-fetch';
import url from  './url';

export default (path,options)=>{

    return fetch(url+'/api'+path,options).then(function (res) {
        return  res.json()
    })
}