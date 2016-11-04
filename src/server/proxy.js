/**
 * Created by zhangbohan on 16/11/4.
 */
import fetch from 'isomorphic-fetch';


export default (...arg)=>{
    return fetch(...arg).then(function (res) {
        return res.text()
    })
}