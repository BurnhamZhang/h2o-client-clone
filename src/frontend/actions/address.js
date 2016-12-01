import fetch from '../common/fetch';

export const ADDRESS_REQUEST = 'ADDRESS_REQUEST';
export const ADDRESS_SUCCESS = 'ADDRESS_SUCCESS';
export const ADDRESS_FAILURE = 'ADDRESS_FAILURE';


export const ADDRESS_LIST_REQUEST = 'ADDRESS_LIST_REQUEST';
export const ADDRESS_LIST_SUCCESS = 'ADDRESS_LIST_SUCCESS';
export const ADDRESS_LIST_FAILURE = 'ADDRESS_LIST_FAILURE';


export const ADDRESS_UPDATE_REQUEST = 'ADDRESS_UPDATE_REQUEST';
export const ADDRESS_UPDATE_SUCCESS = 'ADDRESS_UPDATE_SUCCESS';
export const ADDRESS_UPDATE_FAILURE = 'ADDRESS_UPDATE_FAILURE';

export const ADDRESS_CREATE_REQUEST = 'ADDRESS_CREATE_REQUEST';
export const ADDRESS_CREATE_SUCCESS = 'ADDRESS_CREATE_SUCCESS';
export const ADDRESS_CREATE_FAILURE = 'ADDRESS_CREATE_FAILURE';



export const ADDRESS_DELETE_REQUEST = 'ADDRESS_DELETE_REQUEST';
export const ADDRESS_DELETE_SUCCESS = 'ADDRESS_DELETE_SUCCESS';
export const ADDRESS_DELETE_FAILURE = 'ADDRESS_DELETE_FAILURE';


export const ADDRESS_CHOOSE = 'ADDRESS_CHOOSE';



export const ADDRESS_DELIVERY_REQUEST = 'ADDRESS_DELIVERY_REQUEST';
export const ADDRESS_DELIVERY_SUCCESS = 'ADDRESS_DELIVERY_SUCCESS';
export const ADDRESS_DELIVERY_FAILURE = 'ADDRESS_DELIVERY_FAILURE';


export const ADDRESS_BUCKET_REQUEST = 'ADDRESS_BUCKET_REQUEST';
export const ADDRESS_BUCKET_SUCCESS = 'ADDRESS_BUCKET_SUCCESS';
export const ADDRESS_BUCKET_FAILURE = 'ADDRESS_BUCKET_FAILURE';

//收货地址详情


function address_failure(payload) {
    return {
        type: ADDRESS_FAILURE,
        payload
    };
}

function address_request(payload) {
    return {
        type: ADDRESS_REQUEST,
        payload
    };
}

function address_success(json) {
    return {
        type: ADDRESS_SUCCESS,
        receiveAt: Date.now(),
        payload: json
    };
}


function fetchAddress(data) {
    return dispatch => {
        dispatch(address_request(data));
        return fetch('/api/user/address/' + data)
            .then((json) => {
                dispatch(address_success(json));
            }).catch(error => {
                dispatch(address_failure(error))
            });
    };
}


export function fetchAddressIfNeeded(id) {

    return (dispatch, getState) => {
        const {list,item} = getState().address;
        const address = list.data && list.data.find(item => item.id == id);
        if (address) {
            return dispatch(address_success({data:address}));
        }

        if (id != 'create' && shouldFetchData(item)) {
            return dispatch(fetchAddress(id));
        }
        else {
            return dispatch(address_success({
                data:null
            }));
        }
    };
}


function shouldFetchData(address) {
    if (address.isFetching) {
        return false;
    }
    return true;
}


//收货地址列表



function address_list_failure(payload) {
    return {
        type: ADDRESS_LIST_FAILURE,
        payload
    };
}

function address_list_request(payload) {
    return {
        type: ADDRESS_LIST_REQUEST,
        payload
    };
}

function address_list_success(json) {
    return {
        type: ADDRESS_LIST_SUCCESS,
        receiveAt: Date.now(),
        payload: json
    };
}

function fetchAddressList(data) {
    return dispatch => {
        dispatch(address_list_request(data));
        return fetch('/api/user/address', {
            data
        })
            .then((json) => {
                dispatch(address_list_success(json));
            }).catch(error => {
                dispatch(address_list_failure(error))
            });
    };
}


function shouldFetchAddressList(state) {
    const {list} = state.address;
    if (list.isFetching) {
        return false;
    }
    return true;
}


export function fetchAddressListIfNeeded(data) {
    return (dispatch, getState) => {
        if (shouldFetchAddressList(getState())) {
            return dispatch(fetchAddressList(data));
        }
    };
}

//编辑收货地址


function address_update_failure(payload) {
    return {
        type: ADDRESS_UPDATE_FAILURE,
        payload
    };
}

function address_update_request(payload) {
    return {
        type: ADDRESS_UPDATE_REQUEST,
        payload
    };
}

function address_update_success(json) {
    return {
        type: ADDRESS_UPDATE_SUCCESS,
        receiveAt: Date.now(),
        payload: json
    };
}



export function updateAddressById(id ,data) {
    return (dispatch, getState) => {
        dispatch(address_update_request(id));
        return fetch('/api/user/address/' + id,{
            method:'PUT',
            data:data
        })
            .then((json) => {
                dispatch(address_update_success(json));
            }).catch(error => {
                dispatch(address_update_failure(error))
            });
    };
}


//新建收货地址

function address_create_failure(payload) {
    return {
        type: ADDRESS_CREATE_FAILURE,
        payload
    };
}

function address_create_request(payload) {
    return {
        type: ADDRESS_CREATE_REQUEST,
        payload
    };
}

function address_create_success(json) {
    return {
        type: ADDRESS_CREATE_SUCCESS,
        receiveAt: Date.now(),
        payload: json
    };
}



export function createAddress(payload) {
    return (dispatch, getState) => {
        dispatch(address_create_request());
        return fetch('/api/user/address',{
            method:'POST',
            data:payload
        })
            .then((json) => {
                dispatch(address_create_success(json));
            }).catch(error => {
                dispatch(address_create_failure(error))
            });
    };
}

//删除收货地址
function address_delete_failure(payload) {
    return {
        type: ADDRESS_DELETE_FAILURE,
        payload
    };
}

function address_delete_request(payload) {
    return {
        type: ADDRESS_DELETE_REQUEST,
        payload
    };
}

function address_delete_success(json) {
    return {
        type: ADDRESS_DELETE_SUCCESS,
        receiveAt: Date.now(),
        payload: json
    };
}



export function deleteAddressById(id) {
    return (dispatch, getState) => {
        dispatch(address_delete_request());
        return fetch('/api/user/address/'+id,{
            method:'DELETE',
        })
            .then((json) => {
                dispatch(address_delete_success(json));
            }).catch(error => {
                dispatch(address_delete_failure(error))
            });
    };
}


// 选择当前地址
export function addressChoose(payload) {
    return {
        type: ADDRESS_CHOOSE,
        payload
    };
}

//结算页用户收货地址
function address_delivery_failure(payload) {
    return {
        type: ADDRESS_DELIVERY_FAILURE,
        payload
    };
}

function address_delivery_request(payload) {
    return {
        type: ADDRESS_DELIVERY_REQUEST,
        payload
    };
}

function address_delivery_success(json) {
    return {
        type: ADDRESS_DELIVERY_SUCCESS,
        receiveAt: Date.now(),
        payload: json
    };
}



export function getDeliveryAddress() {
    return (dispatch, getState) => {
        dispatch(address_delivery_request());
        return fetch('/api/user/delivery/address',{
        })
            .then((json) => {
                dispatch(address_delivery_success(json));
            }).catch(error => {
                dispatch(address_delivery_failure(error))
            });
    };
}


//退桶页面用户收货地址
function address_bucket_failure(payload) {
    return {
        type: ADDRESS_BUCKET_FAILURE,
        payload
    };
}

function address_bucket_request(payload) {
    return {
        type: ADDRESS_BUCKET_REQUEST,
        payload
    };
}

function address_bucket_success(json) {
    return {
        type: ADDRESS_BUCKET_SUCCESS,
        receiveAt: Date.now(),
        payload: json
    };
}



export function getBucketAddress() {
    return (dispatch, getState) => {
        dispatch(address_bucket_request());
        return fetch('/api/user/bucket/address',{
        })
            .then((json) => {
                dispatch(address_bucket_success(json));
            }).catch(error => {
                dispatch(address_bucket_failure(error))
            });
    };
}
