import React, {Component, PropTypes} from 'react';
import {Toast, List, Switch, Icon, Stepper, Result} from 'antd-mobile';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import {cacheUpdate} from '../actions/cache';
import {createOrder} from '../actions/order';
import {getDeliveryAddress} from '../actions/address';
import {getDeliveryType} from  '../actions/delivery';

import Shop from './Shop';

import Action from './Action';

@connect((state, ownProps)=>({
    remoteMsg: state.order.create.remoteMsg,
    didInvalidate: state.order.create.didInvalidate,
    didUpdate: state.order.create.didUpdate,
}))
class ConfirmAction extends Action {
}


@withRouter
@connect((state, ownProps)=> {
    const {id, name, geo, houseNumber, streetId, phone, location} = state.address.delivery.data || {}
    const data = Object.assign({
        shopId: Array.isArray(state.shop.data) ? state.shop.data[0] : null,
        orderDetails: state.cache.cart || [],
        discountType: '1',
        bucketType: '1',
        payType: '1',
        deliveryType: '1',
        invoiceType: '1',
        buckets: [                             // 空桶信息，非必填
            {
                scale: "18.9L",          // 规格，必填
                priceYuan: "35",      // 单价，必填
            },
            {
                scale: "11.3L",
                priceYuan: "30",      // 单价，必填
            }
        ],

    }, id ? {
        addressId: id,
        name,
        geo,
        location,
        houseNumber,
        streetId,
        phone
    } : null, state.cache[ownProps.location.query.cache])
    const showMoneyYuan = data.orderDetails.reduce((value, item)=>value + item.count * item.priceYuan, 0).toFixed(2);
    let bucketMoneyYuan = 0;
    let bigMax = 0,littleMax = 0;
    data.orderDetails.forEach(item=>{
        if(item.depositType=='1'){
            bucketMoneyYuan += item.count *item.depositMoneyYuan;
            if(item.scale=='18.9L'){
                bigMax +=item.count*1;
            }
            if(item.scale=='11.3L'){
                littleMax +=item.count*1;
            }
        }
    })
    data.buckets[0].max =bigMax;
    data.buckets[1].max =littleMax;
    if(data.buckets[0].count ===undefined){
        data.buckets[0].count =bigMax;
    }
    if(data.buckets[1].count ===undefined){
        data.buckets[1].count =littleMax;
    }
    if( data.bucketType == '2'){
        data.buckets.forEach(item=>{
            bucketMoneyYuan-= item.count*item.priceYuan;
        })
    }
    bucketMoneyYuan = bucketMoneyYuan.toFixed(2);
    const tradeMoneyYuan = (bucketMoneyYuan * 1 + showMoneyYuan * 1).toFixed(2);
    return {
        data: {
            ...data,
            showMoneyYuan,
            bucketMoneyYuan,
            tradeMoneyYuan
        },
        res: state.order.create.data,
        type: state.delivery.type.data
    }
}, (dispatch, ownProps)=>({
    cacheUpdate: (data)=>dispatch(cacheUpdate({
        key: ownProps.location.query.cache,
        data
    })),
    createOrder: (payload)=> {
        delete payload.bucketMoneyYuan;
        payload.orderDetails = payload.orderDetails.map(({goodsId, name, priceYuan, scale, count, depositType, depositMoneyYuan})=> ({
            goodsId,
            name,
            priceYuan,
            scale,
            count,
            depositType,
            depositMoneyYuan,
            moneyYuan: (priceYuan * count).toFixed(2)
        }))
        payload.buckets =  payload.buckets.map(({scale,priceYuan,count})=>({scale,priceYuan,count}))

        if(payload.bucketType=='1'){
            delete payload.buckets;
        }
        return dispatch(createOrder(payload))
    },
    getDeliveryAddress: ()=>dispatch(getDeliveryAddress()),
    getDeliveryType: ()=>dispatch(getDeliveryType())
}))
class Confirm extends Component {
    componentWillReceiveProps(nextProps) {

        if (nextProps.res && nextProps.res.orderNo && !this.props.res) {
            console.log('componentWillReceiveProps',nextProps.res)
            this.props.router.push({
                pathname: `/pay/${nextProps.res.orderNo}`,
                state: nextProps.res
            })

        }
    }

    componentWillMount() {
        if (this.props.data.shopId) {
            this.props.getDeliveryAddress();
            !this.props.type && this.props.getDeliveryType();
        }

    }

    render() {
        const {orderDetails} = this.props.data;
        const {type} = this.props;
        if (orderDetails.length == 0) {
            return (
                <Result
                    imgUrl="https://zos.alipayobjects.com/rmsportal/LUIUWjyMDWctQTf.png"
                    title="无选择商品"
                    message="请选择商品"
                    buttonType="primary"
                    buttonText="确认"
                    buttonClick={
                        ()=>this.props.router.push('/cart')
                    }
                />
            )
        }
        if (!type) {
            return null
        }

        return (
            <ConfirmAction>
            <Shop>
                {React.cloneElement(this.props.children || <div/>, this.props)}
            </Shop>
        </ConfirmAction>
        )
    }
}
;


export default Confirm;
