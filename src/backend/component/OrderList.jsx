import React, {Component} from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import moment from 'moment';
import {fetchOrderListIfNeeded} from '../actions/order';
import {Table, DatePicker, Radio, Form, Button, Select, Input, Tag, Popover} from 'antd';
const Option = Select.Option;
const createForm = Form.create;
const FormItem = Form.Item;
const RangePicker = DatePicker.RangePicker;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

const columns = [
    {
        title: '下单时间', dataIndex: 'createdDate', key: '1', render: (item)=> {
        return moment(item).format('YYYY.MM.DD HH:mm:ss')
    }
    },
    {
        title: '商品/数量', dataIndex: 'orderDetails', key: '2',
        render: (items, record, index) => {
            if (items.length == 1) {
                return items[0].name + '/' + items[0].count
            }
            const content = items.map((item, index)=> (<p key={index}>{item.name + '/' + item.count}</p>))

            return (<Popover content={content} trigger="hover">
                <a>{ items.length }样商品</a>
            </Popover>)
        }
    },
    {
        title: '地址/收货人/电话', key: '3', render: (v, {userHouseNumber, userName, userPhone})=> {
        return `${userHouseNumber}/${userName}/${userPhone}`
    }
    },
    {
        title: '订单金额', dataIndex: 'tradeMoney', key: '4', render: (tradeMoney, {invoiceType})=> {
        return <span>{tradeMoney} {(invoiceType == '1' ? '' : <Tag color="#2db7f5">发票</Tag>)}</span>
    }
    },
    {title: '状态', dataIndex: 'status', key: '5', render: (status)=>statusMap[status]},
    {
        title: '操作',
        key: '6',
        fixed: 'right',
        width: 100,
        dataIndex: 'orderNo',
        render: (orderNo) => {
            return <Link to={"order/" + orderNo }>查看详情</Link>
        },
    },
];
const statusMap = {
    1: '待支付(在线支付)',
    2: '待支付(货到付款)',
    6: '已支付',
    3: '已关闭',
    4: '已取消',
    7: '已完成',
    5: '申请取消'
}

const statusList = [{
    k: 'all', v: '全部'
}];
for (var a in statusMap) {
    statusList.push({k: a, v: statusMap[a]})
}
const orderStatus = [{label: '全部', value: 'all'},
    {label: 'Pear', value: 'Pear'},
    {label: 'Orange', value: 'Orange'}]

@connect((state, ownProps)=>({
    pagination: state.order.list.pagination
}))
@createForm({
    mapPropsToFields: ({payload})=> {
        const fields = {};
        for (var a in payload) {
            fields[a] = {
                value: payload[a]
            }
        }
        return fields;
    }
})
class OrderForm extends Component {
    constructor(props) {
        super(props)
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    componentDidMount() {
        this.handleSubmit();
    }
    handleSubmit() {
        const validateFields =  this.props.form.validateFields;
        const fetchData = this.props.fetchData
        setTimeout(function () {
            validateFields((errors, values) => {
                if (errors) {
                    console.log('Errors in form!!!');
                    return;
                }
                fetchData(1,20,values);
            });
        },0)
    }
    render() {
        const {getFieldDecorator, getFieldError} = this.props.form;
        return (
            <Form horizontal>
                <FormItem
                    label="时间范围"
                    labelCol={{span: 2}}
                    wrapperCol={{span: 22}}
                >
                    {
                        getFieldDecorator('range', {
                            initialValue: [moment().subtract(7, 'days'), moment()]
                        })(
                            <RangePicker format="YYYY/MM/DD" style={{width: 300}}
                                         onOpenChange={(status)=>!status && this.handleSubmit()}
                                         allowClear={false}/>
                        )
                    }
                </FormItem>
                <FormItem
                    label="订单状态"
                    labelCol={{span: 2}}
                    wrapperCol={{span: 22}}
                >
                    {getFieldDecorator('status', {
                        initialValue: 'all'
                    })(
                        <RadioGroup onChange={()=>this.handleSubmit()}>
                            {
                                statusList.map((obj)=> <RadioButton value={obj.k} key={obj.k}>{obj.v}</RadioButton>)
                            }
                        </RadioGroup>
                    )}


                </FormItem>
                <FormItem
                    label="搜索"
                    labelCol={{span: 2}}
                    wrapperCol={{span: 22}}
                >

                    <span style={{display: 'inline-block', width: 300, verticalAlign: 'middle'}}>
                         {getFieldDecorator('orderId', {})(
                             <Input placeholder="输入" size="large"
                                    addonBefore={
                                        <Select defaultValue="order" style={{width: 80}}>
                                            <Option value="order">订单号</Option>
                                        </Select>
                                    }
                             />
                         )}


                    </span>
                    <Button type="primary" htmlType="submit" style={{margin: ' 0 10px'}}
                            onClick={()=>(this.handleSubmit())}>确定</Button>
                    <a onClick={ ()=> {
                        this.props.form.resetFields();
                        this.handleSubmit();
                    }  }>重置</a>
                </FormItem>
            </Form>
        )
    }
}


@connect((state, ownProps)=>({
    data: state.order.list.data,
    pagination: state.order.list.pagination
}), (dispatch, ownProps)=>({
    fetchOrderListIfNeeded: (payload)=>dispatch(fetchOrderListIfNeeded(payload))
}))
class Order extends Component {
    constructor(props) {
        super(props)
        this.state = {
            range: [moment().subtract(7, 'days'), moment()],
            orderId: null,
            status: 'all',
        }
        this.fetchData= this.fetchData.bind(this);
    }
    fetchData(pageNum = this.props.pagination.pageNum, pageSize = this.props.pagination.pageSize,data){
        if(!data){
            data = this.state;
        }
        this.setState(data);

        const values = Object.assign({}, data, {
            pageNum,
            pageSize,
        })

        values.orderType = 1;
        values.startDate = values.range[0].format('YYYY-MM-DD');
        values.endDate = values.range[1].format('YYYY-MM-DD');
        delete values.range;
        if (values.status == 'all') {
            delete values.status;
        }
        if (!values.orderId) {
            delete  values.orderId;
        }
        console.log('Submit!!!', values);

        this.props.fetchOrderListIfNeeded(values);
    }

    render() {
        const pagination = {
            pageSize: this.props.pagination.pageSize * 1,
            current: this.props.pagination.pageNum * 1,
            total: this.props.pagination.totalCount * 1,
            defaultPageSize: this.props.pagination.pageSize * 1,
            defaultCurrent: this.props.pageNum * 1,
            showQuickJumper: true,
            showSizeChanger: true,
            onShowSizeChange: this.handleSubmit,
            onChange: this.handleSubmit
        }


        return (<div className="ant-layout-content">
            <Table columns={columns} title={()=><OrderForm payload={this.state} fetchData={this.fetchData}/>} dataSource={this.props.data} bordered
                   pagination={pagination}/>
        </div>)
    }
}


export default Order;
