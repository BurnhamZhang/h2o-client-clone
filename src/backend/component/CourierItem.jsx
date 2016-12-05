import React, {Component} from 'react';
import {Link, withRouter} from 'react-router';
import {connect} from 'react-redux';
import {clearCourier,fetchCourierIfNeeded, updateCourierById, createCourier, deleteCourierById} from '../actions/courier';
import {fetchShopRegionIfNeeded} from '../actions/region';
import {Alert,Table, DatePicker, Radio, Form, Button, Select, Input, InputNumber, Icon, Popconfirm, message} from 'antd';
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
import Action from './Action';



@connect((state, ownProps)=>({
    nextRoute: '/courier',
    remoteMsg: state.courier.change.remoteMsg,
    didInvalidate: state.courier.change.didInvalidate,
    didUpdate: state.courier.change.didUpdate,
}))
class CourierAction extends Action {

}


@createForm({
    mapPropsToFields: ({payload = {}})=> {
        const fields = {};
        for (var a in payload) {
            if (a == 'regions') {
                fields[a] = {
                    value: payload[a].map((value)=>value.streetId)
                }
            }
            else if (a == 'image') {
                fields[a] = {
                    value: payload[a] ? [payload[a]] : []
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
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        console.log('handleSubmit');
        const {type, updateItem, createItem, region} = this.props;
        this.props.form.validateFields((errors, values) => {
            if (errors) {
                console.log('Errors in form!!!');
                return;
            }
            console.log('values', values)

            if(values.image && values.image.length){
                values.image =values.image[0]
            }
            else {
                delete  values.image
            }

            values.regions = region.filter(r => {
                return values.regions.some(item => item == r.streetId)
            })

            console.log('values after', values)

            if(values.password==''){
                delete  values.password;
            }

            if (type == 'create') {
                createItem(values);
            }
            else {
                updateItem(type, values);
            }
        });

    }

    handleDelete() {
        const {type, deleteItem} = this.props;
        deleteItem(type);
    }

    render() {
        const {getFieldDecorator,getFieldValue} = this.props.form;

        const {type, region} = this.props;

        console.warn('render', region);

        return (
            <Form horizontal onSubmit={this.handleSubmit}>
                <FormItem label="配送员姓名"   {...itemLayout} hasFeedback>
                    {
                        getFieldDecorator('name', {
                            rules: [
                                {required: true, max: 40},
                            ],
                        })(
                            <Input />
                        )
                    }
                </FormItem>
                <FormItem label="手机号"  {...itemLayout} hasFeedback>
                    {
                        getFieldDecorator('phone', {
                            rules: [
                                {required: true, len: 11, message: '请输入11位数字'},
                            ],
                        })(
                            <Input type="number" maxLength="11"/>
                        )

                    }


                </FormItem>
                <FormItem label="登录账号"  {...itemLayout} hasFeedback>
                    {

                        getFieldDecorator('account', {
                            rules: [
                                {required: true, max: 40},
                            ],
                        })(
                            type=='create'?<Input placeholder="手机或邮箱"/>:<span>{getFieldValue('account')}</span>
                        )
                    }
                </FormItem>
                <FormItem label="密码"  {...itemLayout} hasFeedback>
                    {

                        getFieldDecorator('password', {
                            rules: [
                                { min: 8 , max:20, message:'必须数字+字母组合，至少8位，上限20位'},
                                {required:type=='create'}
                            ],
                        })(
                            <Input type="password" placeholder="必须数字+字母组合，至少8位，上限20位"/>
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
                                <Option value='0'>正常</Option>
                                <Option value='1'>休息</Option>
                                <Option value='2'>休假</Option>
                                <Option value='3'>停用</Option>
                            </Select>
                        )
                    }
                </FormItem>
                <FormItem label="上传照片"   {...itemLayout} hasFeedback>
                    {
                        getFieldDecorator('image', {
                            rules: [{
                                type: "array",  len: 1,
                                fields: {
                                    0: {type: "string", required: true},
                                },
                                message: '请上传一张图片'
                            }]
                        })(
                            <CustomUpload />
                        )
                    }
                </FormItem>
                <FormItem label="配送范围"  {...itemLayout} hasFeedback>
                    {
                        getFieldDecorator('regions', {
                            rules: [{
                                type: "array", required: true, min: 1,
                                fields: {
                                    0: {type: "string", required: true},
                                },
                                message: '请至少选择一个地址'
                            }]
                        })(
                            <Select multiple placeholder="请选择街区">
                                {
                                    region.map((item)=> <Option value={item.streetId}
                                                                key={item.streetId}>{item.streetName}</Option>)
                                }
                            </Select>
                        )
                    }
                </FormItem>
                <FormItem     {...actionLayout}     >
                    <Button type="primary" htmlType="submit" style={{margin: ' 0 10px'}}
                    >确定</Button>

                    {
                        type != 'create' ?

                            <Popconfirm title="确定要删除吗？" okText="确定" cancelText="不了"
                                        onConfirm={()=>(this.handleDelete())}>
                                <Button type="dashed" htmlType="button" style={{margin: ' 0 10px'}}
                                >删除</Button>
                            </Popconfirm>

                            : null
                    }
                </FormItem>
            </Form>
        )
    }
}

@connect((state, ownProps)=>({
    ...state.courier.item,
    region: state.courier.region.data
}), (dispatch, ownProps)=>({
    fetchCourierIfNeeded: (payload)=>dispatch(fetchCourierIfNeeded(payload)),
    fetchShopRegionIfNeeded: ()=>dispatch(fetchShopRegionIfNeeded()),
    updateCourierById: (id, data)=>dispatch(updateCourierById(id, data)),
    createCourier: (payload)=>dispatch(createCourier(payload)),
    deleteCourierById: (id)=>dispatch(deleteCourierById(id)),
    clearCourier: (id)=>dispatch(clearCourier(id))
}))
class CourierForm extends Component {
    constructor(props) {
        super(props);
        this.updateItem = this.updateItem.bind(this);
        this.deleteItem = this.deleteItem.bind(this);
        this.createItem = this.createItem.bind(this);
    }

    componentWillMount() {
        console.warn('componentWillMount'.toLocaleUpperCase());
        const id = this.props.params.id;
        if (id) {
            this.props.fetchCourierIfNeeded(id);
        }
        this.props.fetchShopRegionIfNeeded();

    }

    componentWillReceiveProps(nextProps) {

        const id = nextProps.params.id;
        console.warn('componentWillReceiveProps', this.props, nextProps)
        if (this.props.params.id !== id) {
            this.props.clearCourier()
            if (id) {
                this.props.fetchCourierIfNeeded(id);
            }
            this.props.fetchShopRegionIfNeeded();
        }
    }

    componentWillUnmount(){
        this.props.clearCourier()
    }

    updateItem(id, data) {
        this.props.updateCourierById(id, data)
    }

    deleteItem(id) {
        this.props.deleteCourierById(id)
    }

    createItem(payload) {
        this.props.createCourier(payload)
    }

    render() {
        const id = this.props.params.id||'create';
        const region = this.props.region;
        let {data,remoteMsg,didInvalidate} = this.props;

        if (id == 'create') {
            data = {
                status: '0',
                regions: []
            }
        }
        if(didInvalidate){
            return   <Alert message={remoteMsg}
                            type="error"
            />
        }

        return (
            <div className="ant-layout-content">
                <CourierAction/>
                {(data && region) ? <CourierItem type={id} payload={data} region={region} updateItem={this.updateItem}
                                                 deleteItem={this.deleteItem}   createItem={this.createItem}></CourierItem> : <Block spinning/>}
            </div>
        )
    }
}

export default CourierForm;
