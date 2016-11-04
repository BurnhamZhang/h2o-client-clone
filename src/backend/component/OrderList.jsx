import React, {Component} from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import {fetchOrderListIfNeeded} from '../actions/order';
import {Table, DatePicker, Radio, Form, Button, Select, Input} from 'antd';
const Option = Select.Option;
const createForm = Form.create;
const FormItem = Form.Item;
const RangePicker = DatePicker.RangePicker;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

const columns = [
    {title: '下单时间', dataIndex: 'time', key: '1'},
    {title: '商品/数量', dataIndex: 'amount', key: '2'},
    {title: '下单时间/地址/收货人/电话', dataIndex: 'address', key: '3'},
    {title: '订单金额', dataIndex: 'price', key: '4'},
    {title: '状态', dataIndex: 'status', key: '5'},
    {
        title: '操作',
        key: '6',
        fixed: 'right',
        width: 100,
        render: (text, record, index) => {
            return <Link to={"order/"+record.id }>查看详情</Link>
        },
    },
];

const orderStatus = [{label: '全部', value: 'all'},
    {label: 'Pear', value: 'Pear'},
    {label: 'Orange', value: 'Orange'}]


@connect((state, ownProps)=>({
    ...state.order.list
}), (dispatch, ownProps)=>({
    fetchOrderListIfNeeded: (payload)=>dispatch(fetchOrderListIfNeeded(payload))
}))
@createForm()
class Order extends Component {
    constructor(props) {
        super(props)

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        console.log('componentDidMount', this.props)
        this.handleSubmit(1,20);
    }


    handleSubmit(pageNum=this.props.pagination.pageNum,pageSize=this.props.pagination.pageSize) {
        console.log('handleSubmit',pageNum,pageSize);
        this.props.form.validateFields((errors, values) => {
            if (errors) {
                console.log('Errors in form!!!');
                return;
            }
            values = Object.assign({}, values, {
                pageNum,
                pageSize,
            })
            console.log('Submit!!!', values);
            this.props.fetchOrderListIfNeeded(values);
        });
    }
    render() {
        const {getFieldDecorator, getFieldError} = this.props.form;
        console.warn('render',this.props)

        const pagination = {
            pageSize:this.props.pagination.pageSize,
            current	: this.props.pagination.pageNum,
            total: this.props.pagination.totalCount,
            defaultPageSize: this.props.pagination.pageSize,
            defaultCurrent: this.props.pageNum,
            showQuickJumper: true,
            showSizeChanger: true,
            onShowSizeChange: this.handleSubmit,
            onChange: this.handleSubmit
        }

        const title = (
            <Form horizontal>
                <FormItem
                    label="时间范围"
                    labelCol={{span: 2}}
                    wrapperCol={{span: 22}}
                >
                    {
                        getFieldDecorator('date-range', {})(
                            <RangePicker format="YYYY/MM/DD" style={{width: 300}} onOpenChange={(status)=>!status && this.handleSubmit(1,20)}/>
                        )
                    }
                </FormItem>
                <FormItem
                    label="订单状态"
                    labelCol={{span: 2}}
                    wrapperCol={{span: 22}}
                >
                    {getFieldDecorator('type', {
                        initialValue: 'all',
                    })(
                        <RadioGroup  onChange={()=>this.handleSubmit(1,20)}>
                            <RadioButton value="all">全部</RadioButton>
                            <RadioButton value="1">待支付</RadioButton>
                            <RadioButton value="2">已支付</RadioButton>
                            <RadioButton value="3">已取消</RadioButton>
                            <RadioButton value="4">已关闭</RadioButton>
                            <RadioButton value="5">已完成</RadioButton>
                            <RadioButton value="6">申请取消</RadioButton>
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
                    <Button type="primary" htmlType="button" style={{margin: ' 0 10px'}}
                            onClick={()=>(this.handleSubmit(1,20))}>确定</Button>
                    <a onClick={ ()=>{
                        this.props.form.resetFields();
                        this.handleSubmit(1,20);
                    }  }>重置</a>
                </FormItem>
            </Form>
        )


        return (<div className="ant-layout-content">
            <Table columns={columns} title={()=>title} dataSource={this.props.data} bordered loading={this.props.isFetching} pagination={pagination}/>
        </div>)
    }
}


export default Order;