import React, {Component} from 'react';
import {withRouter, Link} from 'react-router';
import {connect} from 'react-redux';
import {List, Flex, Button, Modal, Tag, Toast, Result,NavBar} from 'antd-mobile';
import ListView from './ListView';
import {fetchOrderListIfNeeded} from '../actions/order'
import Order from './Order';
const Item = List.Item
const Brief = Item.Brief
import Action from './Action';

@connect((state, ownProps)=>({
    remoteMsg: state.order.pay.remoteMsg,
    didInvalidate: state.order.pay.didInvalidate,
    didUpdate: state.order.pay.didUpdate,
    res: state.order.pay.data,
}))
class OrderPayAction extends Action {
}

@connect((state, ownProps)=>({
    data: state.order.list.data,
    pagination: state.order.list.pagination,
    isLoading: state.order.list.isFetching,
    didUpdate: state.order.list.didUpdate,
}))
class OrderListView extends ListView {

}

@connect((state, ownProps)=>({
    remoteMsg: state.order.feedback.remoteMsg,
    didInvalidate: state.order.feedback.didInvalidate,
    didUpdate: state.order.feedback.didUpdate,

}))
class FeedBackAction extends Action {
}


@withRouter
class OrderItem extends Component {

    render() {
        const {orderDetails, tradeMoney, orderNo} = this.props.data;
        return (
            <Item onClick={
                ()=> {
                    this.props.router.push(`/order/${orderNo}`)
                }
            }>
                <Flex justify="center">
                    <img src={orderDetails[0].imageUrls[0]} alt="" style={{height: 100, width: 100}}/>
                    <Flex.Item className="Item">
                        <Flex justify="between" align="start">
                            <span>{orderDetails[0].name + '*' + orderDetails[0].count}</span>
                            <span>
                            {
                                this.props.renderTag.call(this)
                            }
                       </span>
                        </Flex>
                        <Flex justify="between">
                            <Brief>￥{tradeMoney} </Brief>
                            {
                                this.props.renderButton.call(this)

                            }

                        </Flex>
                    </Flex.Item>
                </Flex>
            </Item>
        )
    }
}


@withRouter
@connect((state, ownProps)=>({
    data: state.order.list.data,
    pagination: state.order.list.pagination,
    isLoading: state.order.list.isFetching,
    didUpdate: state.order.list.didUpdate,
}), (dispatch, ownProps)=>({
    fetchOrderListIfNeeded: (payload)=>dispatch(fetchOrderListIfNeeded(payload)),
}))
class OrderList extends Component {
    render() {
        return (
            <div>
                <NavBar leftContent="返回" mode="light"  onLeftClick={() =>this.props.router.goBack() }
                >我的订单</NavBar>
                <FeedBackAction updateHandle={ (component)=> {
                    Toast.info('成功', 1, ()=> {
                        this.data = [];
                        this.props.fetchOrderListIfNeeded({
                            pageNum: 0,
                            pageSize: 20
                        })
                    })
                }}/>
                <OrderPayAction updateHandle={(component, nextProps)=> {
                    if (nextProps.res && nextProps.res.orderNo && !component.props.res) {
                        this.props.router.push({
                            pathname: `/pay/${nextProps.res.orderNo}`,
                            state: nextProps.res
                        })

                    }
                }}/>
                <OrderListView pageSize={20} row={(rowData, sectionID, rowID) => {
                    return (
                        <Order key={rowID}>
                            <OrderItem data={rowData}/>
                        </Order>
                    );
                }}
                          endView={ <Result title="订单为空"
                                            message="您还没有订单,快去下单吧"
                                            imgUrl="https://zos.alipayobjects.com/rmsportal/NRzOqylcxEstLGf.png"
                                            buttonText="返回首页"
                                            buttonType="primary"
                                            buttonClick={()=> {
                                                this.props.router.push('/main')
                                            }}
                          />}
                          fetchData={
                              ({pageNum, pageSize})=> this.props.fetchOrderListIfNeeded({
                                  pageNum,
                                  pageSize
                              })
                          }
                />
            </div>

        );
    }
}


export default OrderList