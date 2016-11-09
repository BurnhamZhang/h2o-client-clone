/**
 * Created by zhangbohan on 16/11/3.
 */
import React, {Component} from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import {fetchShopIfNeeded,updateShopById,createShop,deleteShopById} from '../../actions/enterprise/shop';

import {Table, DatePicker, Radio, Form, Button, Select, Input, InputNumber, Icon ,Switch,TimePicker,Checkbox } from 'antd';
import Block from '../Block';
import moment from 'moment';
const ButtonGroup = Button.Group;
const Option = Select.Option;
const createForm = Form.create;
const FormItem = Form.Item;
const RangePicker = DatePicker.RangePicker;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
import {itemLayout, actionLayout} from '../../constants/formLayout';

@connect(null, (dispatch, ownProps)=>({
    updateShopById: (id,data)=>dispatch(updateShopById(id,data)),
    createShop: (data)=>dispatch(createShop(data)),
    deleteShopById: (id)=>dispatch(deleteShopById(id)),
}))
@createForm({
    mapPropsToFields: ({payload = {}})=> ({
        id:{
            value:payload.id
        },
        shopName:{
            value:payload.shopName
        },
        leader:{
            value:payload.leader
        },
        account:{
            value:payload.account
        },
        status:{
            value:payload.status=='1'
        },
        phone:{
            value:payload.phone
        }
    })
})
class ShopForm extends Component {
    constructor(props) {
        super(props)
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        console.log('handleSubmit');
        const {type,updateShopById,createShop} = this.props;


        this.props.form.validateFields((errors, values) => {
            if (errors) {
                console.log('Errors in form!!!');
                return;
            }
            console.log('values', values)
            if(type =='create'){
                createShop(values)
            }
            else {
                updateShopById(type,values)
            }

            return
        });

    }


    handleDelete(){
        const {type,deleteShopById} = this.props;
        deleteShopById(type);
    }

    render() {
        const {getFieldDecorator, getFieldsValue} = this.props.form;

        return (<div className="ant-layout-content">
            <Form horizontal  onSubmit={this.handleSubmit}>
                <FormItem label="门店名"   {...itemLayout} >
                    {
                        getFieldDecorator('shopName', {})(
                            <Input />
                        )
                    }
                </FormItem>
                <FormItem label="负责人姓名"  {...itemLayout} >
                    {
                        getFieldDecorator('leader', {})(
                            <Input/>
                        )
                    }
                </FormItem>
                <FormItem label="手机号"  {...itemLayout}  >
                    {
                        getFieldDecorator('phone', {})(
                            <Input type="number"/>
                        )
                    }
                </FormItem>
                <FormItem label="登录账号"  {...itemLayout}   >
                    {
                        getFieldDecorator('account', {})(
                            <Input />
                        )
                    }
                </FormItem>
                <FormItem label="密码"   {...itemLayout}    >
                    {
                        getFieldDecorator('password', {})(
                            <Input/>
                        )
                    }

                </FormItem>
                <FormItem label="状态"  {...itemLayout} >
                    {
                        getFieldDecorator('status', { valuePropName: 'checked' })(
                            <Switch checkedChildren={'开'} unCheckedChildren={'停'} />
                        )
                    }
                </FormItem>
                <FormItem     {...actionLayout}     >
                    <Button type="primary" htmlType="submit" >确定</Button>
                    {
                        type!='create' ?

                            <Popconfirm title="确定要删除吗？" okText="确定" cancelText="不了" onConfirm={()=>(this.handleDelete())}>
                                <Button type="dashed" htmlType="button" style={{margin: ' 0 10px'}}
                                >删除</Button>
                            </Popconfirm>

                            :null
                    }

                </FormItem>
            </Form>
        </div>)
    }
}

@connect((state, ownProps)=>({
    ...state.enterprise.shop.item,
}), (dispatch, ownProps)=>({
    fetchShopIfNeeded: (payload)=>dispatch(fetchShopIfNeeded(payload)),
}))
class ShopLayout extends Component {

    componentWillMount() {
        const {id} = this.props.params;
        console.warn('componentWillMount'.toLocaleUpperCase());
        if (id != 'create') {
            this.props.fetchShopIfNeeded(id);
        }
    }


    componentWillReceiveProps(nextProps) {
        const id = nextProps.params.id;
        console.warn('componentWillReceiveProps', this.props, nextProps)
        if (this.props.params.id !== id) {
            if (id != 'create') {
                this.props.fetchShopIfNeeded(id);
            }
        }
    }

    shouldComponentUpdate(nextProps) {
        if (nextProps.didUpdate) {
            console.warn(this.props.router);
            this.props.router.push('/shop')
            return false
        }
        return true
    }

    render() {
        let {data} = this.props;
        const {id} = this.props.params;
        if(id=='create'){
            data = {
                status:'1'
            }
        }

        return (
            data ? <ShopForm payload={data}  /> : <Block spinning/>
        )
    }
}

export default ShopLayout;
