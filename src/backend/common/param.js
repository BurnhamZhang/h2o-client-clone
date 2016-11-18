/**
 * Created by zhangbohan on 16/11/4.
 */


export default (a)=>{
    var prefix,
        s = [];
    for ( prefix in a ) {
        if(a[prefix] instanceof  Array){
            a[prefix].forEach(item=>{
                s.push(prefix+'='+item)
            })
        }
        else {
            s.push(prefix+'='+a[prefix])
        }
    }
    return s.join('&')
}