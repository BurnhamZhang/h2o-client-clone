import React, {Component} from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import moment from 'moment';
import {fetchDeliveryListIfNeeded} from '../actions/delivery';
import {Table, DatePicker, Radio, Form, Button, Select, Input, Tag, Popover} from 'antd';
const Option = Select.Option;
const createForm = Form.create;
const FormItem = Form.Item;
const RangePicker = DatePicker.RangePicker;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

const columns = [
    {title: '指派时间', dataIndex: 'deliveryCreatedDate', key: '1'},
    {
        title: '下单时间', dataIndex: 'orderCreatedDate', key: '2',
    },
    {
        title: '商品/数量', dataIndex: 'goods', key: '3', render: (items, record, index) => {
        if (items.length == 1) {
            return items[0].goodsName + '/' + items[0].count
        }
        const content = items.map((item, index)=> (<p key={index}>{item.goodsName + '/' + item.count}</p>))

        return (<Popover content={content} trigger="hover">
            <a>{ items.length }样商品</a>
        </Popover>)
    }
    },
    {
        title: '地址/收货人/电话', key: '4', render: (v, {userAddress, userName, userPhone})=> {
        return `${userAddress}/${userName}/${userPhone}`
    }
    },
    {
        title: '配送人/电话', key: '5', render: (v, {courierName, courierPhone})=> {
        return `${courierName}/${courierPhone}`
    }
    },
    {
        title: '状态/时间', dataIndex: 'shelves', key: '6',
        render: (v, {status, date})=> {
            return `${status}\n${date}`

        }
    }
];



const orderTypeList = [{
    k: 'all', v: '全部',
}, {
    k: '1', v: '送货',
}, {
    k: '2', v: '退桶',
}];

const status = [{label: '全部', value: 'all'},
    {label: '待接单', value: '0'},
    {label: '配送中', value: '1'},
    {label: '换人', value: '2'},
    {label: '配送完成', value: '3'},
    {label: '申请取消', value: '4'},
    {label: '已取消', value: '5'},
    ]

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
class RecordsForm extends Component {
    constructor(props) {
        super(props)
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        this.handleSubmit();
    }

    handleSubmit() {
        const validateFields = this.props.form.validateFields;
        const fetchData = this.props.fetchData
        setTimeout(function () {
            validateFields((errors, values) => {
                if (errors) {
                    console.log('Errors in form!!!');
                    return;
                }
                fetchData(1, 20, values);
            });
        }, 0)
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
                    label="配送类型"
                    labelCol={{span: 2}}
                    wrapperCol={{span: 22}}
                >
                    {getFieldDecorator('orderType', {
                        initialValue: 'all'
                    })(
                        <RadioGroup onChange={()=>this.handleSubmit()}>
                            {
                                orderTypeList.map((obj)=> <RadioButton value={obj.k} key={obj.k}>{obj.v}</RadioButton>)
                            }
                        </RadioGroup>
                    )}


                </FormItem>
                <FormItem
                    label="配送状态"
                    labelCol={{span: 2}}
                    wrapperCol={{span: 22}}
                >
                    {getFieldDecorator('status', {
                        initialValue: 'all'
                    })(
                        <RadioGroup onChange={()=>this.handleSubmit()}>
                            {
                                status.map((obj)=> <RadioButton value={obj.value} key={obj.value}>{obj.label}</RadioButton>)
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
                         {getFieldDecorator('courierName', {})(
                             <Input placeholder="请输入姓名" size="large"
                                    addonBefore={
                                        <Select defaultValue="order" style={{width: 80}}>
                                            <Option value="order">配送员</Option>
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
    data: state.delivery.list.data,
    pagination: state.delivery.list.pagination
}), (dispatch, ownProps)=>({
    fetchDeliveryListIfNeeded: (payload)=>dispatch(fetchDeliveryListIfNeeded(payload))
}))
class Records extends Component {
    constructor(props) {
        super(props)
        this.state = {
            range: [moment().subtract(7, 'days'), moment()],
            orderType: 'all',
            status: 'all',
        }
        this.fetchData = this.fetchData.bind(this);
    }

    fetchData(pageNum = this.props.pagination.pageNum, pageSize = this.props.pagination.pageSize, data) {
        if (!data) {
            data = this.state;
        }
        this.setState(data);

        const values = Object.assign({}, data, {
            pageNum,
            pageSize,
        })

        values.startDate = values.range[0].format('YYYY-MM-DD');
        values.endDate = values.range[1].format('YYYY-MM-DD');
        delete values.range;
        if (values.orderType == 'all') {
            delete values.orderType;
        }
        if (values.status == 'all') {
            delete values.status;
        }

        if (!values.courierName) {
            delete values.courierName;
        }

        console.log('Submit!!!', values);

        this.props.fetchDeliveryListIfNeeded(values);
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
            <Table columns={columns} title={()=><RecordsForm payload={this.state} fetchData={this.fetchData}/>}
                   dataSource={this.props.data} bordered
                   pagination={pagination}/>
        </div>)
    }
}


export default Records;
