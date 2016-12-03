import React, {Component, PropTypes} from 'react';
import {Card,Button,Flex,Tag,WhiteSpace} from 'antd-mobile';
import {withRouter} from 'react-router';
import moment from 'moment';
import {createDeliveryByOrderId} from '../actions/order';
import {connect} from 'react-redux';
const  invoiceMap={
    '1':'无发票',
    '2':'普通发票',
    '3':'增值税发票',
}

@withRouter
@connect((state, ownProps)=>({
}), (dispatch, ownProps)=>({
    createDeliveryByOrderId: (payload)=>dispatch(createDeliveryByOrderId(payload)),
}))
class OrderItem extends Component {

    render() {
        const {userLocation,deliveryNo,payType,orderType,createdDate,invoiceType,invoiceTitle,orderNo,tradeMoney,deliveryType,appointStart,appointEnd,orderDetails,userHouseNumber,userName,userPhone} = this.props.data;


        return  <Card full style={{marginBottom:10}}>
            <Card.Header
                title={orderNo}
                extra={tradeMoney}
            />
            <Card.Body>
                <div>收货信息：{userLocation+userHouseNumber+userName+userPhone}</div>
                <Flex align="start">
                    货物信息：
                    <Flex.Item>
                        {
                            orderDetails.map(({name,count},index)=><div key={index}>{name+'*'+count}</div>)
                        }
                    </Flex.Item>
                </Flex>
                <div>
                    收货时间：{deliveryType=='1'?'即时送':(moment(appointStart).format('YYYY-MM-DD  HH:mm')+'  '+moment(appointEnd).format('HH:mm'))}
                </div>
                <div>
                    备注信息：{invoiceMap[invoiceType]  }{invoiceTitle?('（'+invoiceTitle+'）'):null}
                </div>
                <WhiteSpace/>
                <Flex>
                    <Flex.Item>
                        <Tag>
                            {payType=='1'?'线上支付':'货到付款'}{tradeMoney}元
                        </Tag>
                    </Flex.Item>
                    <Flex.Item>
                        <Tag>
                            下单时间{moment(createdDate).format('HH:mm')}
                        </Tag>
                    </Flex.Item>
                </Flex>
                <WhiteSpace/>
            </Card.Body>
            <Card.Footer content={
                <Button type='primary' onClick={()=>{
                    this.props.createDeliveryByOrderId({
                        orderNoArray:[orderNo]
                    })
                }
                }>抢单</Button>
            } />
        </Card>
    }
}
;


export default OrderItem;
