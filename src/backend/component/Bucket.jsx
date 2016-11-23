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
        title: '订单号', dataIndex: 'orderNo', key: '1', render: (orderNo,{createdDate})=> {
        return   (
            <div>
                <p>{orderNo}</p>
                <p>{moment(createdDate).format('YYYY.MM.DD HH:mm:ss')}</p>
            </div>
        )
    }
    },
    {
        title: '用户编号', dataIndex: 'userId', key: '2',
    },
    {
        title: '地址/收货人/电话', key: '3', render: (v, {userHouseNumber, userName, userPhone})=> {
        return `${userHouseNumber}/${userName}/${userPhone}`
    }
    },
    {
        title: '空桶数量', dataIndex: 'buckets', key: '4', render: (buckets)=> {
        return  buckets.reduce((item,num)=>(num+item.count*1),0)
    }
    },
    {
        title: '押金金额', dataIndex: 'buckets', key: '5',render: (buckets)=> {
        return  buckets.reduce((item,num)=>(num+item.money*1),0).toFixed(2)
    }
    },
    {title: '状态', dataIndex: 'status', key: '6', render: (status)=>statusMap[status]}
];
const statusMap = {
    3:'申请退桶',
    4: '已取消',
    7: '已完成',
}

const statusList = [{
    k: 'all', v: '全部'
}];
for (let a in statusMap) {
    statusList.push({k: a, v: statusMap[a]})
}

const typeMap = {
    orderNo:'订单号',
    userId:'用户编号',
    userName:'用户姓名',
    userPhone:'用户手机号',
}

const typeList = [];
for (let a in typeMap) {
    typeList.push({k: a, v: typeMap[a]})
}

const sourceList = [
    {  k: 'all', v: '全部'},
    {  k: '1', v: '线上订单'},
    {  k: '2', v: '线下退桶'}
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
        const {getFieldDecorator, getFieldError,getFieldValue} = this.props.form;
        return (
            <Form horizontal>
                <FormItem
                    label="时间范围"
                    labelCol={{span: 2}}
                    wrapperCol={{span: 22}}
                >
                    <Link to="/bucket/record" style={{float:'right'}}>空桶记录</Link>
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
                    label="退桶类型"
                    labelCol={{span: 2}}
                    wrapperCol={{span: 22}}
                >
                    {getFieldDecorator('source', {
                        initialValue: 'all'
                    })(
                        <RadioGroup onChange={()=>this.handleSubmit()}>
                            {
                                sourceList.map((obj)=> <RadioButton value={obj.k} key={obj.k}>{obj.v}</RadioButton>)
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
                         {getFieldDecorator('typeValue', {})(
                             <Input placeholder={'请输入'+typeMap[getFieldValue('type')] } size="large"
                                    addonBefore={
                                    getFieldDecorator('type', {
                                    })(
                                        <Select  style={{width: 80}}>
                                            {
                                                typeList.map((obj)=> <Option value={obj.k} key={obj.k}>{obj.v}</Option>)
                                            }
                                        </Select>)
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
class Bucket extends Component {
    constructor(props) {
        super(props)
        this.state = {
            range: [moment().subtract(7, 'days'), moment()],
            orderId: null,
            status: 'all',
            type:'orderNo'
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

        values.orderType = 2;
        values.startDate = values.range[0].format('YYYY-MM-DD');
        values.endDate = values.range[1].format('YYYY-MM-DD');
        delete values.range;
        if (values.status == 'all') {
            delete values.status;
        }

        if (values.source == 'all') {
            delete values.source;
        }

        if (values.typeValue) {
            values[values.type] = values.typeValue;
            delete  values.type;
            delete  values.typeValue;
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


export default Bucket;
