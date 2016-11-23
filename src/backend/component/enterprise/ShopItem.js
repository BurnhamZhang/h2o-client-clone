/**
 * Created by zhangbohan on 16/11/3.
 */
import React, {Component} from 'react';
import {Link, withRouter} from 'react-router';
import {connect} from 'react-redux';
import {fetchShopIfNeeded, updateShopById, createShop, deleteShopById} from '../../actions/enterprise/shop';

import {
    Table,
    DatePicker,
    Radio,
    Form,
    Button,
    Select,
    Input,
    InputNumber,
    Icon,
    Switch,
    TimePicker,
    Checkbox,
    Popconfirm
} from 'antd';
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
import Action from '../Action';


@connect((state, ownProps)=>({
    nextRoute: '/shop',
    remoteMsg: state.enterprise.shop.item.remoteMsg,
    didInvalidate: state.enterprise.shop.item.didInvalidate,
    didUpdate: state.enterprise.shop.item.didUpdate,
}))
class ShopAction extends Action {

}


@createForm({
    mapPropsToFields: ({payload = {}})=> ({
        id: {
            value: payload.id
        },
        shopName: {
            value: payload.shopName
        },
        leader: {
            value: payload.leader
        },
        account: {
            value: payload.account
        },
        status: {
            value: payload.status == '1'
        },
        phone: {
            value: payload.phone
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
        const {type, updateItem, createItem} = this.props;


        this.props.form.validateFields((errors, values) => {
            if (errors) {
                console.log('Errors in form!!!');
                return;
            }
            values.status = values.status ? '1' : '0';


            if (type == 'create') {
                createItem(values)
            }
            else {
                updateItem(type, values)
            }

            return
        });

    }

    handleDelete() {
        const {type, deleteItem} = this.props;
        deleteItem(type);
    }

    render() {
        const {type} = this.props;
        const {getFieldDecorator, getFieldsValue} = this.props.form;

        return (
            <Form horizontal onSubmit={this.handleSubmit}>
                <FormItem label="门店名"   {...itemLayout} hasFeedback >
                    {
                        getFieldDecorator('shopName', {
                            rules: [
                                {required: true, max: 40},
                            ],
                        })(
                            <Input />
                        )
                    }
                </FormItem>
                <FormItem label="负责人姓名"  {...itemLayout} hasFeedback >
                    {
                        getFieldDecorator('leader', {
                            rules: [
                                {required: true, max: 40},
                            ],
                        })(
                            <Input/>
                        )
                    }
                </FormItem>
                <FormItem label="手机号"  {...itemLayout} hasFeedback >
                    {
                        getFieldDecorator('phone', {
                            rules: [
                                {required: true, len: 11},
                            ],
                        })(
                            <Input type="number"/>
                        )
                    }
                </FormItem>
                <FormItem label="登录账号"  {...itemLayout}  hasFeedback >
                    {
                        getFieldDecorator('account', {
                            rules: [
                                {required: true,max: 40},
                            ],
                        })(
                            <Input />
                        )
                    }
                </FormItem>
                <FormItem label="密码"   {...itemLayout}  hasFeedback  >
                    {
                        getFieldDecorator('password', {
                            rules: [
                                {required: type=='create'},
                            ],
                        })(
                            <Input type="password"/>
                        )
                    }

                </FormItem>
                <FormItem label="状态"  {...itemLayout} >
                    {
                        getFieldDecorator('status', {valuePropName: 'checked'})(
                            <Switch checkedChildren={'开'} unCheckedChildren={'停'}/>
                        )
                    }
                </FormItem>
                <FormItem     {...actionLayout}     >
                    <Button type="primary" htmlType="submit">确定</Button>
                    {/*{*/}
                    {/*type!='create' ?*/}
                    {/*<Popconfirm title="确定要删除吗？" okText="确定" cancelText="不了" onConfirm={()=>(this.handleDelete())}>*/}
                    {/*<Button type="dashed" htmlType="button" style={{margin: ' 0 10px'}}*/}
                    {/*>删除</Button>*/}
                    {/*</Popconfirm>*/}
                    {/**/}
                    {/*:null*/}
                    {/*}*/}

                </FormItem>
            </Form>)
    }
}

@connect((state, ownProps)=>({
    data:state.enterprise.shop.item.data,
}), (dispatch, ownProps)=>({
    fetchShopIfNeeded: (payload)=>dispatch(fetchShopIfNeeded(payload)),
    updateShopById: (id, data)=>dispatch(updateShopById(id, data)),
    createShop: (data)=>dispatch(createShop(data)),
    deleteShopById: (id)=>dispatch(deleteShopById(id)),
}))
class ShopLayout extends Component {
    constructor(props) {
        super(props);
        this.updateItem = this.updateItem.bind(this);
        this.deleteItem = this.deleteItem.bind(this);
        this.createItem = this.createItem.bind(this);
    }
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


    updateItem(id, data) {
        this.props.updateShopById(id, data)
    }

    deleteItem(id) {
        this.props.deleteShopById(id)
    }

    createItem(payload) {
        this.props.createShop(payload)
    }

    render() {
        let {data} = this.props;
        const {id} = this.props.params;
        if (id == 'create') {
            data = {
                status: '1'
            }
        }

        return (
            <div  className="ant-layout-content">
                <ShopAction/>
                {
                    data ? <ShopForm payload={data} type={id}  updateItem={this.updateItem} deleteItem={this.deleteItem}
                                     createItem={this.createItem} /> : <Block spinning/>
                }
            </div>
        )
    }
}

export default ShopLayout;
