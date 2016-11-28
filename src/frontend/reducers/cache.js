import { CACHE_UPDATE } from '../actions/cache';
export default function (state = {

}, action) {

    switch (action.type) {
        case CACHE_UPDATE:
            return Object.assign({},state,{
               [action.payload.key] : action.payload.data
            })
        default:
            return state
    }
}
