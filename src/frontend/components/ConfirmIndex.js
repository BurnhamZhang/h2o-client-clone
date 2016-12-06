import React, {Component, PropTypes} from 'react';
import {Toast, List, Switch, Icon, Stepper,Result,Flex,Button,NavBar} from 'antd-mobile';
import {connect} from 'react-redux';
import {getDeliveryType} from  '../actions/delivery';
import {shopChoose} from  '../actions/shop';
import {withRouter} from 'react-router';

const Item = List.Item;
const Brief = Item.Brief;

@connect((state, ownProps)=> ({
    type: state.delivery.type.data
}), (dispatch, ownProps)=>({
    getDeliveryType: (shopId)=>dispatch(getDeliveryType(shopId))
}))
class DeliveryType extends Component {
    componentWillMount(){
        console.warn(this.props)
        this.props.getDeliveryType(this.props.shopId)
    }
    componentWillReceiveProps(nextProps){
        console.warn('componentWillReceiveProps',nextProps)
        if(nextProps.shopId!==this.props.shopId){
            this.props.getDeliveryType(nextProps.shopId)
        }
    }

    render(){
        const {type} = this.props;
        if(!type){
            return null
        }

        return React.cloneElement(this.props.children || <div/>, {
            type
        })
    }
}

@withRouter
@connect((state, ownProps)=> ({
    shop:state.shop.data,
    didUpdate:state.shop.didUpdate,
}), (dispatch, ownProps)=>({
    shopChoose: (data)=>dispatch(shopChoose(data))
}))
class Shop extends Component {
    constructor(props){
        super(props);
        this.state={};
    }
    componentWillMount(){
        this.props.streetId && this.props.shopChoose({
            streetId:this.props.streetId
        })
    }
    componentWillReceiveProps(nextProps){

        if(nextProps.streetId && !this.props.streetId){
            this.props.shopChoose({
                streetId:nextProps.streetId
            });
        }
        if(nextProps.didUpdate&& !this.props.didUpdate){
            this.setState({
                shop:nextProps.shop
            })
        }
    }
    render(){
        const shop =  this.state.shop;
        const cache =  this.props.cache;
        if(Array.isArray(shop)){
            if(shop[0]){
                this.props.cacheUpdate({
                    shopId:shop[0]
                })
                return React.cloneElement(this.props.children || <div/>,{
                    shopId:shop[0]
                })
            }
            else {
                return  <Result
                    imgUrl="https://zos.alipayobjects.com/rmsportal/LUIUWjyMDWctQTf.png"
                    title="此地址为无效地址"
                    message="请选择有效的收货地址"
                    buttonType="primary"
                    buttonText="确认"
                    buttonClick={ ()=>{
                        this.props.router.push({
                            pathname: `/confirm/address`,
                            query: {
                                cache,
                                address: Math.random().toString(36).substr(2)
                            }
                        })
                    }
                    }
                />
            }

        }
        return null

    }
}



class ConfirmIndexContent extends Component {
    render() {

        const {data, cacheUpdate} = this.props;
        const cacheId = this.props.location.state.cacheId;

        const {addressId,name, phone, houseNumber, location,orderDetails, bucketType, buckets, payType,showMoneyYuan,tradeMoneyYuan,bucketMoneyYuan} = this.props.data;

        const footer = (<Flex className="confirm-footer">
            <Flex.Item>
                <div className="confirm-info">
                    <p>合计：￥{tradeMoneyYuan}</p>
                    <p>商品：￥{showMoneyYuan} 桶押金：￥{bucketMoneyYuan}</p>
                </div>
            </Flex.Item>
            <button className="submit" onClick={
                ()=> {
                    this.props.createOrder({
                        ...data
                    })
                }
            }>立即下单
            </button>
        </Flex>)

        return <div id="confirm">
            <NavBar leftContent="返回" mode="light"  onLeftClick={() =>this.props.router.goBack() }
            >订单确认</NavBar>
            <List>
                {
                    addressId?(
                        <Item thumb={<Icon type="environment"/>} multipleLine arrow="horizontal" onClick={()=> {
                            this.props.router.push({
                                pathname: `/address`,
                                state: {
                                    cacheId,
                                    choose:true,
                                }
                            })
                        }
                        }>
                            {name + '   ' + phone}
                            <Brief>{location + houseNumber}</Brief>
                        </Item>
                    ):(
                        <Item thumb={<Icon type="environment"/>} arrow="horizontal" onClick={()=> {
                            this.props.router.push({
                                pathname: `/address/create`,
                                state: {
                                    cacheId,
                                }
                            })
                        }
                        }>
                            新建收货地址
                        </Item>
                    )
                }
                <Item>
                    <Flex justify="center">
                        <img src={orderDetails[0].imagesArray[0]} alt="" style={{height: 100, width: 100}}/>
                        <Flex.Item className="Item">
                            {orderDetails[0].name + orderDetails[0].memo}
                            <List.Item.Brief>￥：{orderDetails[0].priceYuan +'*'+orderDetails[0].count}</List.Item.Brief>
                        </Flex.Item>
                    </Flex>
                </Item>
                <Item arrow="horizontal" onClick={()=> {
                    this.props.router.push({
                        pathname: '/confirm/type',
                        state: {
                            cacheId
                        }
                    })
                }}>
                    <div style={{float: 'right'}}>{payType == '1' ? '在线支付' : '货到付款'}</div>
                    支付方式
                    <Brief><Icon type="clock-circle-o"/>配送时间段内0.5h送达，三天内可预约</Brief>
                </Item>
                <Item arrow="horizontal" onClick={()=> {
                    this.props.router.push({
                        pathname: '/confirm/remark',
                        state: {
                            cacheId
                        }
                    })
                }}>
                    <div style={{float: 'right'}}>是否需要发票等</div>
                    备注
                </Item>
                {
                    buckets[0].max >0 ||  buckets[1].max >0?(
                        <div>
                            <Item extra={<Switch checked={bucketType == '2'} onChange={(checked)=> {
                                cacheUpdate({
                                    bucketType: checked ? '2' : '1'
                                })
                            }
                            }/>}
                            >是否已有宾田空桶</Item>
                            {
                                bucketType == '2' ? (
                                    <div>
                                        {
                                            buckets[0].max>0?(
                                                <Item extra={<Stepper showNumber min={0} max={buckets[0].max} value={buckets[0].count} onChange={ (count)=> {
                                                    buckets[0].count = count;
                                                    cacheUpdate({
                                                        buckets
                                                    })
                                                }}/>}>
                                                    大桶数量
                                                </Item>
                                            ):null
                                        }
                                        {
                                            buckets[1].max>0?(
                                                <Item extra={<Stepper showNumber min={0}  max={buckets[1].max} value={buckets[1].count} onChange={ (count)=> {
                                                    buckets[1
                                                        ].count = count;
                                                    cacheUpdate({
                                                        buckets
                                                    })
                                                }}/>}>
                                                    小桶数量
                                                </Item>
                                            ):null
                                        }
                                    </div>
                                ) : null
                            }
                        </div>
                    ):null
                }
            </List>
            {footer}

        </div>
    }
}
;


class ConfirmIndex extends Component {
    render(){
        const {streetId} = this.props.data;
        const {type} = this.props;


        return (
            <Shop streetId={
                streetId
            } cache={this.props.location.query.cache} cacheUpdate={this.props.cacheUpdate}>
                <DeliveryType >
                    {
                        React.cloneElement(<ConfirmIndexContent/>||<div/> ,{
                            ...this.props
                        } )
                    }
                </DeliveryType>
            </Shop>
        )
    }
}


export default ConfirmIndex;
