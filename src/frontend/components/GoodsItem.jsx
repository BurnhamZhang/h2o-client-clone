import React, {Component} from 'react';
import {withRouter,Link} from 'react-router';
import {connect} from 'react-redux';
import {List, Flex,Checkbox,Icon,Modal,SwipeAction,Toast} from 'antd-mobile';
import {cartAddGoods} from '../actions/cart'
const Item = List.Item;
const Brief = Item.Brief;


@connect((state, ownProps)=>({
}), (dispatch, ownProps)=>({
    cartAddGoods: (payload)=>dispatch(cartAddGoods(payload)),
}))
class GoodsItem extends Component {
    render() {
        const {name ,stock,imagesArray,scale,priceYuan} = this.props.data;
        return  (
            <Item>
                <Flex justify="center">
                    <div style={{display:'inline-block',height: '1rem', width: '1rem',position:'relative'}}>
                        <img style={{ height: '1rem', width:'1rem', marginRight: 8 }} src={imagesArray[0]} />
                        {
                            stock*1 ==0?(
                                <Flex style={{position:'absolute',top:0,left:0,width:'100%',height:'100%',background:'rgba(0,0,0,0.15)'}} justify="center" align="center">
                                    无货
                                </Flex>
                            ):null
                        }
                    </div>

                    <Flex.Item className="Item">
                        <div>{name }</div>
                        <List.Item.Brief>规格：{scale}</List.Item.Brief>
                        <Flex justify="between">
                            ￥：{priceYuan}
                            {
                                stock*1 ==0?(
                                    <Icon type="plus-circle" style={{color:'lightgray'}}/>
                                ):
                                    (
                                        <Icon type="plus-circle" style={{color:'#108ee9'}} onClick={()=>{
                                            this.props.cartAddGoods(this.props.data);
                                            Toast.success('加入购物车成功！',1)
                                        }} />
                                    )
                            }

                        </Flex>
                    </Flex.Item>
                </Flex>



            </Item>
        )
    }
}



export default GoodsItem;