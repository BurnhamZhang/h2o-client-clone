/**
 * Created by zhangbohan on 16/11/2.
 */
import fetch from '../common/fetch';

export const REGION_REQUEST = 'REGION_REQUEST';
export const REGION_SUCCESS = 'REGION_SUCCESS';
export const REGION_FAILURE = 'REGION_FAILURE';


function region_failure() {
    return {
        type: REGION_FAILURE,
    };
}

function region_request(payload) {
    return {
        type: REGION_REQUEST,
        payload
    };
}

function region_success(payload,id) {
    return {
        type: REGION_SUCCESS,
        receiveAt: Date.now(),
        payload,
        id
    };
}


function fetchRegion(id) {
    return dispatch => {
        dispatch(region_request(id));
        return fetch('/api/region?'+(id=='top'?'level=1':('parentCode='+id)))
            .then((json) => {
                dispatch(region_success(json.data,id));
            }).catch(error => {
                dispatch(region_failure(error))
            });
    };
}


export function fetchRegionIfNeeded(id='top') {
    return (dispatch, getState) => {
        const {region} = getState();

        if (shouldFetchData(region,id)) {
            return dispatch(fetchRegion(id));
        }
    };
}


function shouldFetchData(region,id) {
    if(region[id]){
        return false;
    }
    return true;
}
