import React, {Component} from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import {fetchCourierIfNeeded} from '../actions/courier';
import {fetchStreetIfNeeded} from '../actions/street';
import {Table, DatePicker, Radio, Form, Button, Select, Input, InputNumber, Icon} from 'antd';
import Block from './Block';
import CustomUpload from './CustomUpload';
const ButtonGroup = Button.Group;
const Option = Select.Option;
const createForm = Form.create;
const FormItem = Form.Item;
const RangePicker = DatePicker.RangePicker;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
import {itemLayout, actionLayout} from '../constants/formLayout';


@createForm({
    mapPropsToFields: ({payload = {}})=> {
        const fields = {};
        for (var a in payload) {
            if (a != 'region') {
                fields[a] = {
                    value: payload[a]
                }
            }
            else {
                fields[a] = {
                    value: payload[a].streetId
                }
            }
        }
        console.log('mapPropsToFields', fields);
        return fields;
    }
})
class CourierItem extends Component {
    constructor(props) {
        super(props)
    }

    handleSubmit() {
        console.log('handleSubmit');
        this.props.form.validateFields((errors, values) => {
            if (errors) {
                console.log('Errors in form!!!');
                return;
            }
            console.log('values', values)
            return
        });

    }

    render() {
        const {getFieldDecorator, getFieldsValue} = this.props.form;

        const  street = this.props.street;

        const item = getFieldsValue();

        console.warn('render', item);


        return (<div className="ant-layout-content">
            <Form horizontal>
                <FormItem label="配送员姓名"   {...itemLayout} >
                    {
                        getFieldDecorator('name', {})(
                            <Input />
                        )
                    }
                </FormItem>
                <FormItem label="手机号"  {...itemLayout} >
                    {
                        getFieldDecorator('phone', {})(
                            <Input type="number"/>
                        )

                    }


                </FormItem>
                <FormItem label="登录账号"  {...itemLayout}  >
                    {

                        getFieldDecorator('account', {})(
                            <Input placeholder="手机或邮箱"/>
                        )
                    }
                </FormItem>
                <FormItem label="密码"  {...itemLayout}   >
                    {

                        getFieldDecorator('password', {})(
                            <Input placeholder="6位以上数字或组合"/>
                        )
                    }
                </FormItem>
                <FormItem label="状态"  {...itemLayout} >
                    {
                        getFieldDecorator('status', {})(
                            <Select>
                                <Option value='0'>休息</Option>
                                <Option value='1'>正常</Option>
                                <Option value='2'>停用</Option>
                            </Select>
                        )
                    }
                </FormItem>
                <FormItem label="上传照片"   {...itemLayout}    >
                    {
                        getFieldDecorator('image', {})(
                            <CustomUpload />
                        )
                    }
                </FormItem>
                <FormItem label="配送范围"  {...itemLayout} >
                    {
                        getFieldDecorator('region', {})(
                            <Select multiple placeholder="请选择街区">
                                {
                                    street.map((item)=>  <Option value={item.streetId} key={item.streetId}>{item.streetName}</Option>)
                                }
                            </Select>
                        )
                    }
                </FormItem>
                <FormItem     {...actionLayout}     >
                    <Button type="primary" htmlType="button" style={{margin: ' 0 10px'}}
                            onClick={()=>(this.handleSubmit())}>确定</Button>
                </FormItem>
            </Form>
        </div>)
    }
}

@connect((state, ownProps)=>({
    ...state.courier.item,
    street: state.courier.street.data
}), (dispatch, ownProps)=>({
    fetchCourierIfNeeded: (payload)=>dispatch(fetchCourierIfNeeded(payload)),
    fetchStreetIfNeeded: ()=>dispatch(fetchStreetIfNeeded())
}))
class CourierForm extends Component {

    componentWillMount() {
        console.warn('componentWillMount'.toLocaleUpperCase());
        const id = this.props.params.id;
        if (id != 'create') {
            this.props.fetchCourierIfNeeded(id);
            this.props.fetchStreetIfNeeded();
        }
    }

    componentWillReceiveProps(nextProps) {

        const id = nextProps.params.id;
        console.warn('componentWillReceiveProps', this.props, nextProps)
        if (this.props.params.id !== id) {
            if (id != 'create') {
                this.props.fetchCourierIfNeeded(id);
                this.props.fetchStreetIfNeeded();
            }
        }
    }

    render() {
        const {id} = this.props.params;
        const street = this.props.street;
        let data = this.props.data;

        if (id == 'create') {
            data = {
                status: '1',
            }
        }

        return (
            (data && street) ? <CourierItem type={id} payload={data} street={street}></CourierItem> : <Block spinning/>
        )
    }
}

export default CourierForm;
