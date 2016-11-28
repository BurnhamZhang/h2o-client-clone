import React, {Component, PropTypes} from 'react';
import {Toast, List, Switch, Icon, Stepper} from 'antd-mobile';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import {cacheUpdate} from '../actions/cache';


const data =
{
    "shopId":"1",                             // 门店id，必填
    "addressId":"2",                      // 用户地址id，必填
    "name":"hehe",                        // 用户姓名，必填
    "geo":"1,2",                          // 用户收货地址经纬度，必填
    "location":"21",                      // 用户收货地址（到街道），必填
    "houseNumber":"22",                   // 用户收货地址（到门牌），必填
    "streetId":"111",                     // 用户收货地址区域id
    "phone":"18980015216",                // 用户联系方式，必填
    "orderDetails":[                           // 订单详情，必填
        {
            "goodsId":"1",            // 商品id，必填
            "name":"shui",            // 商品名称，必填
            "priceYuan":"3.23",       // 商品单价，必填
            "scale":"10L",            // 规格，必填
            "count":"2",              // 数量，必填
            "moneyYuan":"1.23",       // 总价，必填
            "depositType":"1",        // 是否有押金，0，没押金；1，有押金，必填
            "depositMoneyYuan":"1.11" // 押金，非必填
        },
        {
            "goodsId":"2",
            "name":"he",
            "priceYuan":"2.23",
            "scale":"20L",
            "count":"2",
            "moneyYuan":"2.46",
            "depositType":"1",
            "depositMoneyYuan":"1.11"
        }
    ],
    "showMoneyYuan":"21.1",                 // 商品价格
    "discountType":"2",                     // 折扣，1，无折扣，2，满减，非必填
    "discountMoneyYuan":"1.21",             // 折扣多少，非必填
    "deliveryMoneyYuan":"1.111",            // 配送费，非必填
    "tradeMoneyYuan":"111.2",               // 总价，必填
    "invoiceType":"1",                      // 有无发票，1，无；2，普票；3，增票，必填
    "invoiceTitle":"JD",                    // 发票抬头，非必填
    "deliveryType":"2",                     // 配送方式，1，立刻送；2，预约送，必填
    "appointStart":"2016-11-09 02:11:21",   // 预约开始时间，非必填
    "appointEnd":"2016-11-09 04:11:21",     // 预约结束时间，非必填
    "payType":"1",                          // 支付方式，1，线上；2，到付，必填
    "memo":"hehehe",                        // 描述，非必填
    "bucketType":"2",                       // 有无空桶，1，无，2，有，必填
    "buckets":[                             // 空桶信息，非必填
        {
            "scale":"10L",          // 规格，必填
            "priceYuan":"20",      // 单价，必填
            "count":"1"             // 数量，必填
        },
        {
            "scale":"20L",
            "priceYuan":"20",      // 单价，必填
            "count":"2"
        }
    ]
}



@withRouter
@connect((state, ownProps)=>{
    console.log(ownProps)
    return{
        data: state.cache[ownProps.location.query.cache] || {
            orderDetails: state.cart.data,
            discountType: '1',
            bucketType: '1',
            payType:'1',
            deliveryType:'1',
            invoiceType:'1',
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
            ]
        }
    }
}, (dispatch, ownProps)=>({
    cacheUpdate: (payload)=>dispatch(cacheUpdate(payload))
}))
class Confirm extends Component {
    render() {
        return  React.cloneElement(this.props.children || <div/>, this.props)
    }
}
;


export default Confirm;
