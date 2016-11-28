import { CART_ADD_GOODS,CART_DELETE_GOODS,CART_UPDATE_GOODS,CART_UPDATE_GOODS_CHECKED,CART_UPDATE_FAILURE,CART_UPDATE_REQUEST,CART_UPDATE_SUCCESS } from '../actions/cart';
import * as  storage from '../common/storage';
export default function (state = {
    isFetching: false,
    didInvalidate: false,
    didUpdate: false,
    data:[]
}, action) {
    let data =state.data;
    switch (action.type) {
        case CART_ADD_GOODS:
            let item = data.find((item)=>item.goodsId ==action.payload.goodsId )


            if(item){
                item.count=item.count+1;
            }
            else {
                data.push({
                    ...action.payload,
                    checked:true,
                    count:1
                })
            }
            storage.set('CART',data);
            return Object.assign({},state,{
                data:data.concat([])
            })
        case CART_DELETE_GOODS:
            data =  data.filter((item)=>{
                if(Array.isArray(action.payload)){
                    return !action.payload.find((_item)=>_item.goodsId==item.goodsId)
                }
                else {
                    return item.goodsId !=action.payload.goodsId
                }
            })
            storage.set('CART',data);
            return Object.assign({},state,{
                data:data.concat([])
            })
        case CART_UPDATE_GOODS:
            data =  data.map((item)=>{
                if(Array.isArray(action.payload)){
                    const _item = action.payload.find((id)=>id==item.id)
                    return Object.assign({},item,_item)
                }
                else {
                    if(item.goodsId == action.payload.goodsId){
                        return Object.assign({},item,action.payload)
                    }
                }
                return item
            })
            storage.set('CART',data);
            return Object.assign({},state,{
                data:data.concat([])
            })

        case CART_UPDATE_GOODS_CHECKED:
            data =  data.map((item)=>{
                item.checked = action.payload
                return item
            })
            storage.set('CART',data);
            return Object.assign({},state,{
                data:data.concat([])
            })

        case CART_UPDATE_FAILURE:
            delete action.payload.data;
            return Object.assign({}, state, {
                isFetching: false,
                didInvalidate: true,
                didUpdate:false,
                ...action.payload
            })
            break;
        case CART_UPDATE_REQUEST:
            return Object.assign({}, state, {
                isFetching: true,
                didInvalidate: false,
                didUpdate:false,
            })
            break;
        case CART_UPDATE_SUCCESS:
            data =  action.payload.data.map(item=>{
                const _item = data.find((_item)=>_item.goodsId==item.goodsId)

                if(!_item){
                    return false
                }
                return Object.assign({},_item,item)
            })

            data = data.filter(item=>!!item);
            return Object.assign({}, state, {
                isFetching: false,
                didInvalidate: false,
                didUpdate:true,
                ...action.payload,
                data
            })
            break;

        default:
            return state
    }
}
