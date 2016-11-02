/**
 * Created by zhangbohan on 16/10/26.
 */
import fetch from 'isomorphic-fetch';





export default function (url,options = {}) {
    options = Object.assign({},{
        method:'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
    }, options)

    if(options.method !='GET'){
        if(options.data){
            options.body  = typeof options.data =='object'?JSON.stringify(options.data):options.data;
            delete options.data;
        }
    }

    return fetch(url,options).then((req) => req.json()).then((res)=>{
        if (res.code !='A00000') {
            return Promise.reject(res)
        }
        return res.response
    })

}