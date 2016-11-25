import fetch from '../common/fetch';



export const SHOP_CHOOSE_REQUEST = 'SHOP_CHOOSE_REQUEST';
export const SHOP_CHOOSE_SUCCESS = 'SHOP_CHOOSE_SUCCESS';
export const SHOP_CHOOSE_FAILURE = 'SHOP_CHOOSE_FAILURE';





//收货地址列表



function shop_choose_failure(payload) {
    return {
        type: SHOP_CHOOSE_FAILURE,
        payload
    };
}

function shop_choose_request(payload) {
    return {
        type: SHOP_CHOOSE_REQUEST,
        payload
    };
}

function  shop_choose_success(json) {
    return {
        type: SHOP_CHOOSE_SUCCESS,
        receiveAt: Date.now(),
        payload: json
    };
}

export function shopChoose(data) {
    const {province,city,district,town,streetId} = data;
    return dispatch => {
        dispatch(shop_choose_request(data));
        return fetch('/api/region/match/shop', {
            data:streetId?{streetId}:{province,city,district,street:town}
        })
            .then((json) => {
                json.location = data.location||data.streetNumber
                dispatch(shop_choose_success(json));
            }).catch(error => {
                dispatch(shop_choose_failure(error))
            });
    };
}


