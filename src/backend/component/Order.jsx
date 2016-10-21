import React from 'react';
import {Link} from 'react-router';
import {Table, DatePicker,Radio ,Form ,Button,Select,Input} from 'antd';
const Option = Select.Option;
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
            return <Link to="/">查看详情</Link>
        },
    },
];

const data = [{
    amount: '2',
    time: '2016.10.28 13:15:30',
    address: '青羊区桐梓琳街区新希望路6号丰德万瑞中心15楼105/刘德华/18600000000',
    price: '16.00',
    status: '待支付'
}, {
    amount: '2',
    time: '2016.10.28 13:15:30',
    address: '青羊区桐梓琳街区新希望路6号丰德万瑞中心15楼105/刘德华/18600000000',
    price: '16.00',
    status: '已取消'
}, {
    amount: '2',
    time: '2016.10.28 13:15:30',
    address: '青羊区桐梓琳街区新希望路6号丰德万瑞中心15楼105/刘德华/18600000000',
    price: '16.00',
    status: '申请取消'
}];

const orderStatus = [{label: '全部', value: 'all'},
    {label: 'Pear', value: 'Pear'},
    {label: 'Orange', value: 'Orange'}]

class Order extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            current: '',
            data: data
        }
        this.onChange = this.onChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    onChange(dates, dateStrings) {
        console.log('From: ', dates[0], ', to: ', dates[1]);
        console.log('From: ', dateStrings[0], ', to: ', dateStrings[1]);
    }

    handleSubmit(e) {
        e.preventDefault();
        console.log('Received the values of form', this.props.form.getFieldsValue());
    }

    render() {
        return (<div className="ant-layout-content">
            <Form horizontal>
                <FormItem
                    label="时间范围"
                    labelCol={{span: 2}}
                    wrapperCol={{span: 22}}
                >
                    <RangePicker showTime format="YYYY/MM/DD HH:mm:ss" onChange={this.onChange} style={{width:300}}/>
                </FormItem>
                <FormItem
                    label="订单状态"
                    labelCol={{span: 2}}
                    wrapperCol={{span: 22}}
                >
                    <RadioGroup  defaultValue="all">
                        <RadioButton value="all">全部</RadioButton>
                        <RadioButton value="1">待支付</RadioButton>
                        <RadioButton value="2">已支付</RadioButton>
                        <RadioButton value="3">已取消</RadioButton>
                        <RadioButton value="4">已关闭</RadioButton>
                        <RadioButton value="5">已完成</RadioButton>
                        <RadioButton value="6">申请取消</RadioButton>
                    </RadioGroup>
                </FormItem>
                <FormItem
                    label="搜索"
                    labelCol={{span: 2}}
                    wrapperCol={{span: 22}}
                >

                    <span style={{display:'inline-block',width:300,verticalAlign:'middle'}}>
                          <Input placeholder="输入" size="large"
                                addonBefore={
                                    <Select defaultValue="order" style={{ width: 80 }} >
                                        <Option value="order">订单号</Option>
                                    </Select>
                                }
                          />
                    </span>
                    <Button type="primary" htmlType="button" style={{ margin:' 0 10px' }} >确定</Button>
                    <a href="javascript">重置</a>
                </FormItem>
            </Form>

            <Table columns={columns} dataSource={data} bordered/>
        </div>)
    }
}


export default Order;
