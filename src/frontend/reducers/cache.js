import { CACHE_UPDATE } from '../actions/cache';
export default function (state = {

}, action) {

    switch (action.type) {
        case CACHE_UPDATE:
            if(Array.isArray(action.payload.data)){
                return Object.assign({},state,{
                    [action.payload.key] :action.payload.data
                })
            }
            return Object.assign({},state,{
               [action.payload.key] : Object.assign({},state[action.payload.key],action.payload.data)
            })
        default:
            return state
    }
}
