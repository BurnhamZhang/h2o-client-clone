/**
 * Created by zhangbohan on 16/11/17.
 */
import {CANDIDATE_COURIER_LIST_REQUEST, CANDIDATE_COURIER_LIST_SUCCESS, CANDIDATE_COURIER_LIST_FAILURE,COURIER_STATUS_UPDATE_SUCCESS} from '../../actions/courier';

export default function (state = {
    isFetching: false,
    didInvalidate: true,
    pagination:{
    },
    data:null
}, action) {
    switch (action.type) {
        case CANDIDATE_COURIER_LIST_FAILURE:
            return Object.assign({}, state, {
                isFetching: false,
                didInvalidate: true
            })
            break;
        case CANDIDATE_COURIER_LIST_REQUEST:
            return Object.assign({}, state, {
                isFetching: true,
                didInvalidate: false,
            })
            break;
        case CANDIDATE_COURIER_LIST_SUCCESS:
            return Object.assign({}, state, {
                isFetching: false,
                didInvalidate: false,
                ...action.payload
            })
            break;
        case COURIER_STATUS_UPDATE_SUCCESS:


            if(!state.data){
                return state
            }

            const map = {};
            action.payload.courierStatus.forEach(item=>{
                map[item.id]=item.status;
            })
            let data = state.data;

            data = data.map(item =>{
                if(map.hasOwnProperty(item.id)){
                    item.status = map[item.id]
                }

                return item

            });

            return Object.assign({}, state, {
                isFetching: false,
                didInvalidate: false,
                data:data
            })
            break;
        default:
            return state
    }
}
