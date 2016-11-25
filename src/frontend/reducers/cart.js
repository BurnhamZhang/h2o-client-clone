import { CART_ADD_GOODS,CART_DELETE_GOODS,CART_UPDATE_GOODS } from '../actions/cart';
import * as  storage from '../common/storage';
export default function (state = [], action) {
    switch (action.type) {
        case CART_ADD_GOODS:
            let item = state.find((item)=>item.goodsId ==action.payload.goodsId )

            if(item){
                item.count=item.count+1;
            }
            else {
                state.push({
                    ...action.payload,
                    count:1
                })
            }
        case CART_DELETE_GOODS:
            state =  state.filter((item)=>{
                if(Array.isArray(action.payload)){
                    return !action.payload.find((id)=>id==item.id)
                }
                else {
                    return item.goodsId !=action.payload
                }


            })
        case CART_UPDATE_GOODS:
            state =  state.map((item)=>{
                if(item.goodsId == action.payload.goodsId){
                    item.count = action.payload.count;
                }
                return item
            })
        default:
            console.log('CART',state);
            storage.set('CART',state);
            return state
    }
}
