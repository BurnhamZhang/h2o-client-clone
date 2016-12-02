/**
 * Created by zhangbohan on 16/10/26.
 */
import fetch from 'isomorphic-fetch';
import {getStore} from '../index';
import param from './param';


export default function (url,options = {}) {
    const store = getStore();
    options = Object.assign({},{
        method:'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
    }, options)
    options.method=options.method.toUpperCase();
    if(!/^(GET|DELETE)$/.test(options.method)){
        if(options.data){
            options.body  = typeof options.data =='object'?JSON.stringify(options.data):options.data;
            delete options.data;
        }
    }
    else{
        if(options.data){
            url += (/\?/.test(url)?'&':'?')+param(options.data);
            delete  options.data;
        }
    }

    const token = store.getState().user.data.token;

    if(token){
        options.headers.token = token
    }

    if(process.env.NODE_ENV === 'production'){
        url = `/h2o${url}`
    }

    return fetch(url,options).then((req) => req.json()).then((res)=>{
        if (res.code !='A00000') {
            return Promise.reject(res.response)
        }
        return res.response
    })

}