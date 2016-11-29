import React, {Component} from 'react';
import {connect} from 'react-redux';
import {List, Checkbox, Flex, Stepper, Icon,Result} from 'antd-mobile';
import {cartAddGoods, cartUpdateGoods, cartDeleteGoods, cartUpdateGoodsChecked, updateCart} from  '../actions/cart';
import {cacheUpdate} from  '../actions/cache';
import {withRouter, Link} from 'react-router';
import Shop from './Shop';


const CheckboxItem = Checkbox.CheckboxItem;


@connect((state, ownProps)=>({}), (dispatch, ownProps)=>({
    cartAddGoods: (payload)=>dispatch(cartAddGoods(payload)),
    cartUpdateGoods: (payload)=>dispatch(cartUpdateGoods(payload)),
    cartDeleteGoods: (payload)=>dispatch(cartDeleteGoods(payload)),
}))
class CartItem extends Component {
    render() {
        const data = this.props;
        return (
            <List.Item thumb={<Checkbox checked={data.checked} onChange={ ({target:{checked}})=> {
                console.log('checked', checked)
                this.props.cartUpdateGoods({
                    ...data,
                    checked
                })
            }} name="cart"/>}>
                <Flex justify="center">
                    <img src={data.imagesArray[0]} alt="" style={{height: 100, width: 100}}/>
                    <Flex.Item className="Item">
                        {data.name + data.memo}
                        <Flex justify="between">
                            <List.Item.Brief>{data.priceYuan}</List.Item.Brief>
                            <Stepper showNumber min={1} value={data.count} style={{width: 200}} onChange={ (count)=> {
                                this.props.cartUpdateGoods({
                                    ...data,
                                    count
                                })
                            } }/>
                            <Icon type="delete" onClick={()=>this.props.cartDeleteGoods({
                                ...data
                            })}/>
                        </Flex>
                    </Flex.Item>
                </Flex>
            </List.Item>
        )
    }
}


@withRouter
@connect((state, ownProps)=>({
    data: state.cart.data
}), (dispatch, ownProps)=>({
    cartUpdateGoodsChecked: (payload)=>dispatch(cartUpdateGoodsChecked(payload)),
    updateCart: (payload)=>dispatch(updateCart(payload)),
    cacheUpdate: (payload)=>dispatch(cacheUpdate({
        key:'cart',
        data:payload
    })),
}))
class CartPage extends Component {
    onChange() {
        console.log(arguments)
    }

    componentWillMount() {
        this.props.data.length && this.props.updateCart()
    }

    render() {
        const {data} = this.props;
        let checked = true;
        let count = 0;
        let totalPrice = 0;


        if(data.length ==0 ){
            return (
                <Result
                    imgUrl="https://zos.alipayobjects.com/rmsportal/NRzOqylcxEstLGf.png"
                    title="购物车为空"
                    message="购物车中什么都没有，快去选购吧"
                    buttonText="返回首页"
                    buttonType="primary"
                    buttonClick={()=>{
                        this.props.router.push('/main')
                    }}
                />
            )
        }
        data.forEach(item=> {
            if (item.checked) {
                count += item.count;
                totalPrice += item.priceYuan * item.count;
            }
            else {
                checked = false;
            }

        })


        const footer = (<Flex>
            <Flex.Item>
                <div className="cart-info">
                    <p>合计：￥{totalPrice.toFixed(2)}</p>
                </div>
            </Flex.Item>
            <button className="submit" onClick={
                ()=>{

                    const list = data.filter(item=>item.checked);
                    console.log('list',list)
                    if(list.length>0 ){
                        this.props.cacheUpdate(list)
                        this.props.router.push({
                            pathname:'/confirm',
                            query:{
                                cache:Math.random().toString(36).substr(2)
                            }
                        })
                    }

                }
            }>去结算（{count}）</button>
        </Flex>)
        return (
            <div id="cart">
                <List renderHeader={ ()=><Checkbox checked={checked} onChange={({target:{checked}})=> {
                    this.props.cartUpdateGoodsChecked(checked)
                }}>全选</Checkbox>} renderFooter={()=>footer}>
                    {data.map((i, index) => (
                        <CartItem key={index} {...i}/>
                    ))}
                </List>
            </div>
        );
    }
}

class Cart extends Component {
    render() {
        return <Shop>
            <CartPage/>
        </Shop>
    }
}

export default Cart;