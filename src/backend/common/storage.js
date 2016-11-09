/**
 * Created by zhangbohan on 16/11/8.
 */

const storage = window.localStorage

export function set(key,data) {
    storage.setItem(key,JSON.stringify(data))
}

export function get(key) {
    const item = storage.getItem(key);
    let data;
    try{
        data = JSON.parse(item)
    }
    catch (e){
        data = item
    }
    return data
}

export function remove(key) {
  storage.removeItem(key);
}