import React, {Component} from 'react';
import {withRouter,Link} from 'react-router';
import {connect} from 'react-redux';
import {List, Flex,Checkbox,Icon,Modal,SwipeAction} from 'antd-mobile';
import {cartAddGoods} from '../actions/cart'
const Item = List.Item;
const Brief = Item.Brief;


@connect((state, ownProps)=>({
}), (dispatch, ownProps)=>({
    cartAddGoods: (payload)=>dispatch(cartAddGoods(payload)),
}))
class GoodsItem extends Component {
    render() {
        const {name ,stock,imagesArray,goodsId} = this.props.data;
        return  (
        <SwipeAction
            autoClose
            right={[
                {
                    text: '删除',
                    onPress:()=>void 0,
                    style: { backgroundColor: '#F4333C', color: 'white' },
                },
            ]}
        >
            <Item>
                <img style={{ height: 64 * (window.viewportScale || 1), width: 64 * (window.viewportScale || 1), marginRight: 8 }} src={imagesArray[0]} />
                {name }
                {stock}
                <Icon type="plus-circle" onClick={()=>{
                    this.props.cartAddGoods(this.props.data)
                }} />
            </Item>
        </SwipeAction>
        )
    }
}



export default GoodsItem;