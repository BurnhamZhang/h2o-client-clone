/**
 * Created by zhangbohan on 16/11/21.
 */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter,Link} from 'react-router';
import {orderPay, orderCancelConfirm, feedbackOrder, fetchOrderIfNeeded,orderComplete} from '../actions/order';
import {ListView, List, Flex, Button, Modal, Tag, Toast,Picker} from 'antd-mobile';


const list = [{
    value:'未及时送达，多次催单无果',
    label:'未及时送达，多次催单无果'
},{
    value:'送水人员态度恶劣',
    label:'送水人员态度恶劣'
},{
    value:'送水人员操作不规范',
    label:'送水人员操作不规范'
},{
    value:'其他',
    label:'其他'
}]

@connect((state, ownProps)=>({}), (dispatch, ownProps)=>({
    orderPay: (payload)=>dispatch(orderPay(payload)),
    orderCancelConfirm: (orderNo,payload)=>dispatch(orderCancelConfirm(orderNo,payload)),
    feedbackOrder: (payload)=>dispatch(feedbackOrder(payload)),
    fetchOrderIfNeeded: (payload)=>dispatch(fetchOrderIfNeeded(payload)),
    orderComplete: (orderNo,payload)=>dispatch(orderComplete(orderNo,payload)),
}))
class Order extends Component {
    renderTag() {
        const {status, orderNo} = this.props.data;
        if (status == '1') {
            return (
                <Tag selected small>待支付</Tag>
            )
        }
        else if (/^(2|6)$/.test(status + '')) {
            return (
                <Tag selected small>进行中</Tag>
            )
        }
        else if (/^(3|4|5)$/.test(status + '')) {
            return (
                <Tag selected small>已取消</Tag>
            )
        }
        else if (/^(7|8)$/.test(status + '')) {
            return (
                <Tag selected small>已完成</Tag>
            )
        }
        else if (/^9$/.test(status + '')) {
            return (
                <Tag selected small disabled>已关闭</Tag>
            )
        }
        return null
    }

    renderButton() {
        const {status, orderNo,version} = this.props.data;


        const ts = (<Picker data={list} cols={1} onChange={(value)=>{
            if(value =='其他'){
                Modal.prompt('投诉', '请输入投诉的内容', [
                    {text: '取消'},
                    {
                        text: '提交', onPress: memo => {
                        this.props.feedbackOrder({
                            orderNo,
                            type: 0,
                            memo
                        })
                    }
                    },
                ]);
            }
            else {
                this.props.feedbackOrder({
                    orderNo,
                    type: 0,
                    memo:value
                })
            }

        }}>
            <Button inline size="small" key="3" onClick={(e)=>{
                e.stopPropagation();
            }}>投诉</Button>
            </Picker>)






        const cd = <Button inline size="small" key="4" onClick={(e)=> {
            e.stopPropagation();
            this.props.feedbackOrder({
                orderNo,
                type: 1,
            })
        }}>催单</Button>
        if (status == '1') {
            return (
                <Button key="1" inline size="small" type="primary" onClick={(e)=> {
                    e.stopPropagation();
                    this.props.orderPay(orderNo)
                }}>去支付</Button>
            )
        }
        else if (/^(2|6)$/.test(status + '')) {
            return (
                [<Button key="2" inline size="small" type="primary" onClick={(e)=> {
                    e.stopPropagation();
                    this.props.orderComplete(orderNo,{
                        version
                    })
                }}>确认完成</Button>, cd, ts]
            )
        }
        else if (/^(3|4|5|7|8|9)$/.test(status + '')) {
            return (
                ts
            )
        }
        return null
    }

    render() {
        const {orderPay, orderCancelConfirm, feedbackOrder, fetchOrderIfNeeded,orderComplete} = this.props;
        const {renderTag, renderButton} = this;
        return React.cloneElement(this.props.children || <div/>, {
                    orderPay, orderCancelConfirm, feedbackOrder, fetchOrderIfNeeded,
                    renderTag,
                    renderButton,
                    orderComplete
                })

    }
}
export default Order;