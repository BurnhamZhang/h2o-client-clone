/**
 * Created by zhangbohan on 16/11/4.
 */


export default (a)=>{
    var prefix,
        s = [];
    for ( prefix in a ) {
        s.push(prefix+'='+a[prefix])
    }
    return s.join('&')
}