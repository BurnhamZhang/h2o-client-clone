import fetch from '../common/fetch';



export const CACHE_UPDATE = 'CACHE_UPDATE';





//收货地址列表



export  function cacheUpdate(payload) {
    return {
        type: CACHE_UPDATE,
        payload
    };
}


