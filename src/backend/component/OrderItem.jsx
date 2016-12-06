import React, {Component} from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import {fetchOrderIfNeeded,orderCancelConfirm} from '../actions/order';
import {Table, DatePicker, Radio, Form, Button, Select, Input, InputNumber, Icon, Row, Col, Card,Popconfirm} from 'antd';
import Block from './Block';
const FormItem = Form.Item;

const columns = [
    {
        title: '商品名', dataIndex: 'name', key: '1'
    },
    {
        title: '单价', dataIndex: 'price', key: '2',
    },
    {
        title: '规格', dataIndex: 'scale', key: '3',
    },
    {
        title: '数量', dataIndex: 'count', key: '4',
    },
    {
        title: '商品金额', dataIndex: 'money',
        fixed: 'right',
        width: 100,
        key: '5', render: (money, data)=> {
        return (<div>
            {money} { data.goodsId ? '' : '(押金)' }
        </div>)
    }
    },

];
const formItemLayout = {
    labelCol: {span: 6},
    wrapperCol: {span: 14},
};
const payTypeMap = {
    1: '线上付款',
    2: '货到付款'
}

//1,2,5,6取消订单

const deliveryStatusMap = {
    0: '待接单',
    1: '已接单',
    2: '配送中',
    3: '换人',
    4: '申请取消',
    5: '已取消',
    6: '配送完成',
}

const statusMap = {
    1: '待支付(在线支付)',
    2: '待支付(货到付款)',
    3: '申请退桶',
    4: '已取消',
    5: '申请取消',
    6: '已支付',
    7: '已完成',
    8: '超时完成',
    9: '已关闭',
}

class OrderItem extends Component {
    constructor(props) {
        super(props)
        this.cancelOrder = this.cancelOrder.bind(this);
    }
    cancelOrder(){

        const {orderNo,version} = this.props.payload;
        this.props.cancelOrder(orderNo,{version});
    }

    render() {

        const data = this.props.payload;


        const list = data.orderDetails.concat(data.buckets);


        console.warn('render', data);


        return (<div className="ant-layout-content">
            <Table footer={()=> {
                return (<div>
                    <span style={{display: 'inline-block', float: 'right', 'width': 100}}>{data.showMoney}</span>
                    <h4>共计</h4>
                </div>)
            }} columns={columns} bordered dataSource={list} bgoodsed/>
            <Form horizontal>
                <Row gutter={16}>
                    <Col className="gutter-row" span={8}>
                        <Card title="收货人/配送员信息">
                            <FormItem
                                {...formItemLayout}
                                label="收货人："
                            >
                                <p>{ data.userName }</p>
                            </FormItem>
                            <FormItem
                                {...formItemLayout}
                                label="电话："
                            >
                                <p>{ data.userPhone }</p>
                            </FormItem>
                            <FormItem
                                {...formItemLayout}
                                label="收货地址："
                            >
                                <p>{ data.userHouseNumber }</p>
                            </FormItem>
                        </Card>

                    </Col>
                    <Col className="gutter-row" span={8}>
                        <Card title="订单信息">
                            <FormItem
                                {...formItemLayout}
                                label="订单号："
                            >
                                <p>{ data.orderNo }</p>
                            </FormItem>
                            <FormItem
                                {...formItemLayout}
                                label="下单时间："
                            >
                                <p>{ data.createdDate }</p>
                            </FormItem>
                            <FormItem
                                {...formItemLayout}
                                label="付款时间："
                            >
                                <p>{ data.payTime }</p>
                            </FormItem>
                            <FormItem
                                {...formItemLayout}
                                label="完成时间："
                            >
                                <p>{ data.modifiedDate }</p>
                            </FormItem>
                        </Card>

                    </Col>
                    <Col className="gutter-row" span={8}>
                        <Card title="付款信息">
                            <FormItem
                                {...formItemLayout}
                                label="付款方式："
                            >
                                <p>{ payTypeMap[data.payType]  }</p>
                            </FormItem>
                            <FormItem
                                {...formItemLayout}
                                label="商品总额："
                            >
                                <p>{ data.showMoney }</p>
                            </FormItem>
                        </Card>

                    </Col>
                </Row>
                <Row gutter={16} style={{marginTop:20}}>
                    <Col className="gutter-row" span={8}>
                        <Card>
                            <FormItem
                                {...formItemLayout}
                                label="配送员："
                            >
                                <p>{ data.courierName }</p>
                            </FormItem>
                            <FormItem
                                {...formItemLayout}
                                label="电话："
                            >
                                <p>{ data.courierPhone }</p>
                            </FormItem>
                            <FormItem
                                {...formItemLayout}
                                label="配送状态："
                            >
                                <p>{  deliveryStatusMap[data.deliveryStatus] }</p>
                            </FormItem>
                        </Card>
                    </Col>
                    <Col className="gutter-row" span={8}>
                        <Card>
                            <FormItem
                                {...formItemLayout}
                                label="订单状态："
                            >

                                { /^(1|2|3|5|6)$/.test(data.status+'') ?
                                ( <Popconfirm title="确定要取消订单吗？" okText="是的" cancelText="不是" onConfirm={this.cancelOrder}>
                                    <Button type='primary' htmlType='button'>取消订单</Button>
                                </Popconfirm>)
                                 :null
                                }
                                <p>{ statusMap[data.status] }</p>
                            </FormItem>
                            <FormItem
                                {...formItemLayout}
                                label="申请人："
                            >
                                <p>{ data.createdDate }</p>
                            </FormItem>
                            <FormItem
                                {...formItemLayout}
                                label="付款时间："
                            >
                                <p>{ data.payTime }</p>
                            </FormItem>
                            <FormItem
                                {...formItemLayout}
                                label="完成时间："
                            >
                                <p>{ data.modifiedDate }</p>
                            </FormItem>
                        </Card>
                    </Col>
                    <Col className="gutter-row" span={8}>
                        <Card>
                            <FormItem
                                {...formItemLayout}
                                label="订单总额："
                            >
                                <p>{ data.tradeMoney  }</p>
                            </FormItem>
                            <FormItem
                                {...formItemLayout}
                                label="发票&抬头："
                            >
                                <p>{ (data.invoiceType == '1' ? '不' : '') + '需要' + data.invoiceTitle }</p>
                            </FormItem>

                        </Card>
                    </Col>
                </Row>
            </Form>
        </div>)
    }
}

@connect((state, ownProps)=>({
    data: state.order.item.data,
}), (dispatch, ownProps)=>({
    fetchOrderIfNeeded: (payload)=>dispatch(fetchOrderIfNeeded(payload)),
    orderCancelConfirm: (orderNo,payload)=>dispatch(orderCancelConfirm(orderNo,payload))
}))
class OrderForm extends Component {

    componentWillMount() {
        console.warn('componentWillMount'.toLocaleUpperCase());
        const id = this.props.params.id;
        this.props.fetchOrderIfNeeded(id);
    }

    componentWillReceiveProps(nextProps) {

        const id = nextProps.params.id;
        console.warn('componentWillReceiveProps', this.props, nextProps)
        if (this.props.params.id !== id) {
            this.props.fetchOrderIfNeeded(id);
        }
    }

    cancelOrder(orderNo,data){
        this.props.orderCancelConfirm(orderNo,data);
    }

    render() {
        const data = this.props.data;
        return (
            data ? <OrderItem payload={data} cancelOrder={(orderNo,data)=>this.cancelOrder(orderNo,data)}></OrderItem> : <Block spinning/>
        )
    }
}

export default OrderForm;
