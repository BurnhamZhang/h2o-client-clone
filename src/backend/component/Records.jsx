import React, {Component} from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import moment from 'moment';
import {fetchDeliveryListIfNeeded,updateDeliveryCourier} from '../actions/delivery';
import {fetchCandidateCourierListIfNeeded} from '../actions/courier';
import {Table, DatePicker, Radio, Form, Button, Select, Input, Tag, Popover,Modal ,Checkbox,message} from 'antd';
import columns from  '../common/DeliveryColumns';
import Action from './Action';

const Option = Select.Option;
const createForm = Form.create;
const FormItem = Form.Item;
const RangePicker = DatePicker.RangePicker;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const CheckboxGroup = Checkbox.Group;



@connect((state, ownProps)=>({
    remoteMsg: state.delivery.courier.remoteMsg,
    didInvalidate: state.delivery.courier.didInvalidate,
    didUpdate: state.delivery.courier.didUpdate,
}))
class CourierAction extends Action {

}

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



@createForm({
})
@connect((state, ownProps)=>({
    data: state.courier.candidate.data
}), (dispatch, ownProps)=>({
    fetchCandidateCourierListIfNeeded: ()=>dispatch(fetchCandidateCourierListIfNeeded()),
}))
class CourierModal extends Component {
    handleCancel() {
        this.props.onCancel()
    }
    componentWillMount(){
        this.props.fetchCandidateCourierListIfNeeded()
    }
    handleOk(){
        const {deliveryNo} = this.props.payload;
        this.props.form.validateFields((errors, values) => {
            if (errors) {
                console.log('Errors in form!!!');
                return;
            }
            values.deliveryNo = deliveryNo
            this.props.onOk(values)

        });
    }
    render(){
        const payload = this.props.payload;
        const {getFieldDecorator} = this.props.form;

        const data =this.props.data||[];


        const options = data.filter(item=>item.status=='0');

        return (<Modal title="调整配送员" visible={!!payload}
                       onOk={()=>this.handleOk()} onCancel={()=>this.handleCancel()}
        >
            {
                getFieldDecorator('courierId', {
                    rules:[{
                        required:true,
                    }]
                })(
                    <RadioGroup >
                        {
                            options.map(item=> <Radio key={item.id} value={item.id}>{item.name}</Radio>)
                        }
                    </RadioGroup>
                )
            }
        </Modal>)
    }
}



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
                                         allowClear={false} disabledDate={(date)=>{
                                return date.isAfter(moment())
                            }}/>
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
    fetchDeliveryListIfNeeded: (payload)=>dispatch(fetchDeliveryListIfNeeded(payload)),
    updateDeliveryCourier: (payload)=>dispatch(updateDeliveryCourier(payload))
}))
class Records extends Component {
    constructor(props) {
        super(props)
        this.state = {
           param:{
               range: [moment().subtract(7, 'days'), moment()],
               orderType: 'all',
               status: 'all',
           },
           chosen:undefined
        }
        this.fetchData = this.fetchData.bind(this);
        this.onCancel = this.onCancel.bind(this);
        this.updateHandle = this.updateHandle.bind(this);
        this.onOk = this.onOk.bind(this);
        this.onClick = this.onClick.bind(this);
    }

    fetchData(pageNum = this.props.pagination.pageNum, pageSize = this.props.pagination.pageSize, data) {
        if (!data) {
            data = Object.assign({},this.state.param);
        }
        this.setState({
            param:data
        });

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

    onClick(chosen){

        this.setState({
            chosen
        });

    }

    onCancel(){
        this.setState({
            chosen:undefined
        });
    }

    onOk(payload){
        this.props.updateDeliveryCourier(payload);
        this.setState({
            chosen:undefined
        });
    }

    updateHandle(){
        message.success('调整配送员成功')
        this.fetchData()
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
            onShowSizeChange: this.fetchData,
            onChange: this.fetchData
        }

        columns[4] = {
            title: '配送人/电话', key: '5', render: (v, value)=> {
                const  {courierName, courierPhone} = value;
                if(!/^(1|0)$/.test(value.status)){
                    return `${courierName}/${courierPhone}`
                }
                return <a onClick={()=>this.onClick(value)}>{`${courierName}/${courierPhone}`}</a>
            }
        }

        return (<div className="ant-layout-content">
            <CourierAction updateHandle={this.updateHandle}/>
            <CourierModal payload={this.state.chosen} onCancel={this.onCancel} onOk={this.onOk} />
            <Table columns={columns} title={()=><RecordsForm payload={this.state.param} fetchData={this.fetchData}/>}
                   bordered
                   pagination={pagination}/>
        </div>)
    }
}


export default Records;
