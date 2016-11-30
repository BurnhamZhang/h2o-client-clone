/**
 * Created by zhangbohan on 16/11/21.
 */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {orderPay, orderCancelConfirm, feedbackOrder, fetchOrderIfNeeded} from '../actions/order';
import {ListView, List, Flex, Button, Modal, Tag, Toast} from 'antd-mobile';


import Action from './Action';

@connect((state, ownProps)=>({
    remoteMsg: state.order.item.remoteMsg,
    didInvalidate: state.order.item.didInvalidate,
    didUpdate: state.order.item.didUpdate,
}))
class OrderAction extends Action {
}

@connect((state, ownProps)=>({
    remoteMsg: state.order.feedback.remoteMsg,
    didInvalidate: state.order.feedback.didInvalidate,
    didUpdate: state.order.feedback.didUpdate,
    updateHandle: ()=> {
        Toast.info('成功')
    }
}))
class FeedBackAction extends Action {
}


@connect((state, ownProps)=>({}), (dispatch, ownProps)=>({
    orderPay: (payload)=>dispatch(orderPay(payload)),
    orderCancelConfirm: (payload)=>dispatch(orderCancelConfirm(payload)),
    feedbackOrder: (payload)=>dispatch(feedbackOrder(payload)),
    fetchOrderIfNeeded: (payload)=>dispatch(fetchOrderIfNeeded(payload)),
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
        const {status, orderNo} = this.props.data;
        const ts = <Button inline size="small" key="3" onClick={(e)=> {
            e.stopPropagation();
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

        }}>投诉</Button>

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
                    this.props.orderPay(orderNo)
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
        const {orderPay, orderCancelConfirm, feedbackOrder, fetchOrderIfNeeded} = this.props;
        const {renderTag, renderButton} = this;
        return (<OrderAction>
            <FeedBackAction/>
            {
                React.cloneElement(this.props.children || <div/>, {
                    orderPay, orderCancelConfirm, feedbackOrder, fetchOrderIfNeeded,
                    renderTag,
                    renderButton
                })
            }
        </OrderAction>)
    }
}
export default Order;