import React, {Component, PropTypes} from 'react';
import {Toast, List, Switch, Icon, Stepper,Result} from 'antd-mobile';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import {cacheUpdate} from '../actions/cache';
import {createOrder} from '../actions/order';
import {getDeliveryAddress} from '../actions/address';
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
    const {id, name, geo, houseNumber, streetId, phone, location} = state.address.delivery.data||{}
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
                count: "1"             // 数量，必填
            },
            {
                scale: "11.3L",
                priceYuan: "30",      // 单价，必填
                count: "1"
            }
        ],

    },id?{
        addressId: id,
        name,
        geo,
        location,
        houseNumber,
        streetId,
        phone
    }:null, state.cache[ownProps.location.query.cache])
    const showMoneyYuan = data.orderDetails.reduce((value, item)=>value + item.count * item.priceYuan, 0).toFixed(2);
    const bucketMoneyYuan = data.bucketType == '2' ? data.buckets.reduce((value, item)=>value + item.count * item.priceYuan, 0).toFixed(2) : '0';
    const tradeMoneyYuan = (bucketMoneyYuan * 1 + showMoneyYuan * 1).toFixed(2);
    return {
        data: {
            ...data,
            showMoneyYuan,
            bucketMoneyYuan,
            tradeMoneyYuan
        },
        res: state.order.create.data
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
            moneyYuan: (priceYuan*count).toFixed(2)
        }))

        return dispatch(createOrder(payload))
    },
    getDeliveryAddress: ()=>dispatch(getDeliveryAddress())
}))
class ConfirmContent extends Component {
    componentWillReceiveProps(nextProps) {

        if (nextProps.res && nextProps.res.orderNo && !this.props.res) {
            console.log(nextProps.res)
            this.props.router.push({
                pathname: `/pay/${nextProps.res.orderNo}`,
                state: nextProps.res
            })

        }
    }

    componentWillMount() {
        if(this.props.data.shopId){
            this.props.getDeliveryAddress();
        }
    }

    render() {
        const {orderDetails} = this.props.data;
        if (orderDetails.length == 0) {
            return   (
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

        return <div>
            <ConfirmAction/>
            {React.cloneElement(this.props.children || <div/>, this.props)}
            </div>
    }
}
;

class Confirm extends Component {
    render(){
        return   <Shop>
            <ConfirmContent {...this.props}/>
        </Shop>
    }
}

export default Confirm;
