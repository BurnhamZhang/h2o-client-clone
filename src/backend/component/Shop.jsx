import React, {Component} from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import {fetchShopIfNeeded,updateShopIfNeeded} from '../actions/shop';
import {Table, DatePicker, Radio, Form, Button, Select, Input, InputNumber, Icon ,Switch,TimePicker,Checkbox,message } from 'antd';
import Block from './Block';
import CustomUpload from './CustomUpload';
import moment from 'moment';
const ButtonGroup = Button.Group;
const Option = Select.Option;
const createForm = Form.create;
const FormItem = Form.Item;
const RangePicker = DatePicker.RangePicker;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
import {itemLayout, actionLayout} from '../constants/formLayout';
import RegionPicker from './RegionPicker';

@connect(null, (dispatch, ownProps)=>({
    updateShopIfNeeded: (payload)=>dispatch(updateShopIfNeeded(payload)),
}))
@createForm({
    mapPropsToFields: ({payload = {}})=> ({
        id:{
            value:payload.id
        },
        showName:{
            value:payload.showName
        },
        geo:{
            value:payload.geo
        },
        location:{
            value:payload.location
        },
        hourseNumber:{
            value:payload.hourseNumber
        },
        status:{
            value:payload.status=='1'
        },
        phone:{
            value:payload.phone
        },
        complainPhone:{
            value:payload.complainPhone
        },
        deliveryStart:{
            value: moment(payload.deliveryStart , 'HH:mm:ss')
        },
        deliveryEnd:{
            value: moment(payload.deliveryEnd , 'HH:mm:ss')
        },
        deliveryType:{
            value:payload.deliveryType=='1'
        },
        shopRegions:{
            value:payload.shopRegions.map(item => item.streetId)
        }
    })
})
class ShopForm extends Component {
    constructor(props) {
        super(props)
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit() {
        console.log('handleSubmit');
        this.props.form.validateFields((errors, values) => {
            if (errors) {
                console.log('Errors in form!!!');
                return;
            }
            console.log('values', values)
            this.props.updateShopIfNeeded(values);
            return
        });

    }

    render() {
        const {getFieldDecorator, getFieldsValue} = this.props.form;



        return (<div className="ant-layout-content">
            <Form horizontal>
                <FormItem label="门店名"   {...itemLayout} >
                    {
                        getFieldDecorator('showName', {})(
                            <Input />
                        )
                    }
                </FormItem>
                <FormItem label="门店地址"  {...itemLayout} >
                    {
                        getFieldDecorator('location', {})(
                            <Input/>
                        )
                    }
                </FormItem>
                <FormItem label="门店电话"  {...itemLayout}  >
                    {
                        getFieldDecorator('phone', {})(
                            <Input type="number"/>
                        )
                    }
                </FormItem>
                <FormItem label="投诉电话"  {...itemLayout}   >
                    {
                        getFieldDecorator('complainPhone', {})(
                            <Input placeholder="6位以上数字或组合"/>
                        )
                    }
                </FormItem>
                <FormItem label="营业状态"  {...itemLayout} >
                    {
                        getFieldDecorator('status', { valuePropName: 'checked' })(
                            <Switch checkedChildren={'开'} unCheckedChildren={'关'} />
                        )
                    }
                </FormItem>
                <FormItem label="配送时段"   {...itemLayout}    >
                    {
                        getFieldDecorator('deliveryStart', {})(
                            <TimePicker  format="HH:mm:ss"  />
                        )
                    }
                    &nbsp;-&nbsp;
                    {
                        getFieldDecorator('deliveryEnd', {})(
                            <TimePicker  format="HH:mm:ss"  />
                        )
                    }
                    <br/>
                    {
                        getFieldDecorator('deliveryType', { valuePropName: 'checked' })(
                            <Checkbox>非配送时段不允许下单</Checkbox>
                        )
                    }

                </FormItem>
                <FormItem label="配送范围"  {...itemLayout} >
                    {
                        getFieldDecorator('shopRegions')(
                            <RegionPicker/>
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
    ...state.shop,
}), (dispatch, ownProps)=>({
    fetchShopIfNeeded: (payload)=>dispatch(fetchShopIfNeeded()),
}))
class ShopLayout extends Component {

    componentWillMount() {
        console.warn('componentWillMount'.toLocaleUpperCase());
        this.props.fetchShopIfNeeded();
    }

    componentDidUpdate(){
        const  {didInvalidate,remoteMsg,didUpdate} = this.props;

        console.warn('componentDidUpdate',didInvalidate,remoteMsg)
        if(didInvalidate && remoteMsg){
            message.warn(remoteMsg)
        }

        if(didUpdate){
            message.success('更新成功')
        }
    }

    render() {
        const {data} = this.props;
        return (
            (data) ? <ShopForm payload={data} /> : <Block spinning/>
        )
    }
}

export default ShopLayout;
