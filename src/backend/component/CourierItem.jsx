import React, {Component} from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import {fetchCourierIfNeeded} from '../actions/courier';
import {fetchShopRegionIfNeeded} from '../actions/region';
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
            if (a == 'region') {
                fields[a] = {
                    value: payload[a].streetId
                }
            }
            else if(a=='image'){
                fields[a] = {
                    value: payload[a]?[payload[a]]:[]
                }
            }
            else {
                fields[a] = {
                    value: payload[a]
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
        const {getFieldDecorator} = this.props.form;

        const  region = this.props.region;

        console.warn('render', region);

        return (<div className="ant-layout-content">
            <Form horizontal>
                <FormItem label="配送员姓名"   {...itemLayout} hasFeedback >
                    {
                        getFieldDecorator('name', {
                            rules: [
                                {required: true ,max:40},
                            ],
                        })(
                            <Input />
                        )
                    }
                </FormItem>
                <FormItem label="手机号"  {...itemLayout} hasFeedback >
                    {
                        getFieldDecorator('phone', {
                            rules: [
                                { required: true, len:11,message:'请输入11位数字'},
                            ],
                        })(
                            <Input type="number" maxLength="11"/>
                        )

                    }


                </FormItem>
                <FormItem label="登录账号"  {...itemLayout} hasFeedback >
                    {

                        getFieldDecorator('account', {
                            rules: [
                                {required: true,max:40},
                            ],
                        })(
                            <Input placeholder="手机或邮箱"/>
                        )
                    }
                </FormItem>
                <FormItem label="密码"  {...itemLayout} hasFeedback  >
                    {

                        getFieldDecorator('password', {
                            rules: [
                                {required: true,max:40},
                            ],
                        })(
                            <Input type="password" placeholder="6位以上数字或组合"/>
                        )
                    }
                </FormItem>
                <FormItem label="状态"  {...itemLayout} >
                    {
                        getFieldDecorator('status', {
                            rules: [
                                {required: true},
                            ],
                        })(
                            <Select>
                                <Option value='0'>休息</Option>
                                <Option value='1'>正常</Option>
                                <Option value='2'>停用</Option>
                            </Select>
                        )
                    }
                </FormItem>
                <FormItem label="上传照片"   {...itemLayout}  hasFeedback   >
                    {
                        getFieldDecorator('image', {
                            rules:[{
                                type: "array", required: true, len: 1,
                                fields: {
                                    0: {type: "string", required: true},
                                },
                                message:'请上传一张图片'
                            }]
                        })(
                            <CustomUpload />
                        )
                    }
                </FormItem>
                <FormItem label="配送范围"  {...itemLayout} hasFeedback >
                    {
                        getFieldDecorator('region', {
                            rules:[{
                                type: "array", required: true, min: 1,
                                fields: {
                                    0: {type: "string", required: true},
                                },
                                message:'请至少选择一个地址'
                            }]
                        })(
                            <Select multiple placeholder="请选择街区">
                                {
                                    region.map((item)=>  <Option value={item.streetId} key={item.streetId}>{item.streetName}</Option>)
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
    region: state.courier.region.data
}), (dispatch, ownProps)=>({
    fetchCourierIfNeeded: (payload)=>dispatch(fetchCourierIfNeeded(payload)),
    fetchShopRegionIfNeeded: ()=>dispatch(fetchShopRegionIfNeeded())
}))
class CourierForm extends Component {

    componentWillMount() {
        console.warn('componentWillMount'.toLocaleUpperCase());
        const id = this.props.params.id;
        if (id != 'create') {
            this.props.fetchCourierIfNeeded(id);
        }
        this.props.fetchShopRegionIfNeeded();

    }

    componentWillReceiveProps(nextProps) {

        const id = nextProps.params.id;
        console.warn('componentWillReceiveProps', this.props, nextProps)
        if (this.props.params.id !== id) {
            if (id != 'create') {
                this.props.fetchCourierIfNeeded(id);
            }
            this.props.fetchShopRegionIfNeeded();
        }
    }

    render() {
        const {id} = this.props.params;
        const region = this.props.region;
        let data = this.props.data;

        if (id == 'create') {
            data = {
                status: '1',
            }
        }
        console.warn('render CourierForm>>>>>>>>>>',data)

        return (
            (data && region) ? <CourierItem type={id} payload={data} region={region}></CourierItem> : <Block spinning/>
        )
    }
}

export default CourierForm;
