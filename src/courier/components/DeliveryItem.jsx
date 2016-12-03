import React, {Component, PropTypes} from 'react';
import {Card,Button,Flex,Tag,WhiteSpace} from 'antd-mobile';
import {withRouter} from 'react-router';
import {modifyDeliveryById} from '../actions/delivery';
import moment from 'moment';
import {connect} from 'react-redux';

const  invoiceMap={
    '1':'无发票',
    '2':'普通发票',
    '3':'增值税发票',
}

@withRouter
@connect((state, ownProps)=>({
}), (dispatch, ownProps)=>({
    modifyDeliveryById: (deliveryNo,payload)=>dispatch(modifyDeliveryById(deliveryNo,payload)),
}))
class DeliveryItem extends Component {


    render() {
        const {deliveryNo,status,payType,orderType,orderCreatedDate,invoiceType,invoiceTitle,orderNo,tradeMoney,deliveryType,appointStart,appointEnd,goods,userAddress,userName,userPhone} = this.props.data;

        const renderFooter =()=>{
            if(status=='0'){
                return  <Button type='primary' onClick={()=>{
                  this.props.modifyDeliveryById(deliveryNo,{
                      deliveryNo,
                      status:1
                  })
                }
                }>我知道了</Button>
            }
            if(status=='1'){
                return  <Flex>
                    <Flex.Item>
                        <Button type='ghost' onClick={()=>{
                            this.props.modifyDeliveryById(deliveryNo,{
                                deliveryNo,
                                status:4
                            })
                        }}>申请取消</Button>
                    </Flex.Item>
                    <Flex.Item>
                        <a href={'tel:'+userPhone}>
                            <Button>联系用户</Button>
                        </a>
                    </Flex.Item>
                    <Flex.Item>
                        <Button type='primary' onClick={()=>{
                            this.props.modifyDeliveryById(deliveryNo,{
                                deliveryNo,
                                status:3
                            })
                        }}>配送完成</Button>
                    </Flex.Item>
                </Flex>
            }
            return null
        }

        return  <Card full style={{marginBottom:10}}>
            <Card.Header
                title={orderNo}
                extra={orderType=='1'?tradeMoney:null}
            />
            <Card.Body>
                <div>收货信息：{userAddress+userName+userPhone}</div>
                {
                    orderType=='1'?(
                        <div>
                            <Flex align="start">
                                货物信息：
                                <Flex.Item>
                                    {
                                        goods.map(({goodsName,count},index)=><div key={index}>{goodsName+'*'+count}</div>)
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
                                        下单时间{moment(orderCreatedDate).format('HH:mm')}
                                    </Tag>
                                </Flex.Item>
                            </Flex>
                        </div>
                    ):(
                        <div>
                            <div>
                                个数：2个
                            </div>
                            <WhiteSpace/>
                            <Tag>
                                申请时间{moment(orderCreatedDate).format('HH:mm')}
                            </Tag>
                        </div>
                    )
                }
                <WhiteSpace/>
            </Card.Body>
            <Card.Footer content={
                renderFooter()
            } />
        </Card>
    }
}
;


export default DeliveryItem;
