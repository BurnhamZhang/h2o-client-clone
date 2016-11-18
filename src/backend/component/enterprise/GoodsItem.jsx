/**
 * Created by zhangbohan on 16/11/3.
 */
import React, {Component} from 'react';
import {withRouter, Link} from 'react-router';
import {connect} from 'react-redux';
import {fetchGoodsIfNeeded, updateGoodsById, createGoods, deleteGoodsById} from '../../actions/enterprise/goods';
import {Table, DatePicker, Radio, Form, Button, Select, Input, InputNumber, Popconfirm, message} from 'antd';
import Block from '../Block';
const ButtonGroup = Button.Group;
const Option = Select.Option;
const createForm = Form.create;
const FormItem = Form.Item;
const RangePicker = DatePicker.RangePicker;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
import {itemLayout, actionLayout} from '../../constants/formLayout';
import CustomUpload from '../CustomUpload';

import Action from '../Action';

@connect((state, ownProps)=>({
    nextRoute: '/goods',
    remoteMsg: state.enterprise.goods.item.remoteMsg,
    didInvalidate: state.enterprise.goods.item.didInvalidate,
    didUpdate: state.enterprise.goods.item.didUpdate,
}))
class GoodsAction extends Action {

}


@createForm({
    mapPropsToFields: ({payload})=> {
        const fields = {};
        for (var a in payload) {
            fields[a] = {
                value: payload[a]
            }
        }
        fields.shelves && (fields.shelves.value *= 1);
        fields.stock && (fields.stock.value *= 1);
        fields.depositType && (fields.depositType.value *= 1);
        console.log('mapPropsToFields', fields);
        return fields;
    }
})
class GoodsForm extends Component {
    constructor(props) {
        super(props)
    }

    handleSubmit(e) {
        e.preventDefault();

        const {type, updateItem, createItem} = this.props;
        this.props.form.validateFields((errors, values) => {
            if (errors) {
                console.log('Errors in form!!!');
                return;
            }
            console.log('values', JSON.stringify(values))

            values.priceYuan += '';

            if (type == 'create') {
                createItem(values)
            }
            else {
                updateItem(type, values)
            }

        });

        return false

    }

    handleDelete() {
        const {type, deleteItem} = this.props;
        deleteItem(type);
    }

    render() {
        const {getFieldDecorator, getFieldValue, getFieldsValue} = this.props.form;
        const {type, payload} = this.props;


        const item = Object.assign({}, payload, getFieldsValue());


        return (
            <Form horizontal onSubmit={(e)=>(this.handleSubmit(e))}>
                <FormItem label="商品名称" {...itemLayout} hasFeedback>
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
                <FormItem label="描述" {...itemLayout} hasFeedback>
                    {

                        getFieldDecorator('memo', {
                            rules: [
                                {required: true, max: 40},
                            ],
                        })(
                            <Input />
                        )
                    }
                </FormItem>
                <FormItem label="规格"  {...itemLayout} hasFeedback>
                    {

                        getFieldDecorator('scale', {
                            rules: [
                                {required: true, max: 40},
                            ],
                        })(
                            <Input />
                        )
                    }
                </FormItem>
                <FormItem label="价格" {...itemLayout}   >
                    {
                        getFieldDecorator('priceYuan', {
                            rules: [
                                {required: true},
                            ],
                        })(
                            <InputNumber min={0.01} step="0.01" size="120"/>
                        )
                    }
                </FormItem>

                <FormItem label="押金费" {...itemLayout}   >
                    {
                        getFieldDecorator('depositType', {
                            rules: [
                                {required: true},
                            ],
                        })(
                            <RadioGroup>
                                <Radio key="a" value={0}>无押金</Radio>
                                <Radio key="b" value={1}>有押金</Radio>
                            </RadioGroup>
                        )

                    }
                    {
                        getFieldValue('depositType') == 1 ? getFieldDecorator('depositMoneyYuan', {})(
                            <InputNumber min={0.01} step="0.01" size="120"/>) : null
                    }
                </FormItem>


                <FormItem label="图片" {...itemLayout} hasFeedback>
                    {
                        getFieldDecorator('imagesArray', {
                            rules: [{
                                type: "array", required: true, min: 1, max: 5,
                                fields: {
                                    0: {type: "string", required: true},
                                    1: {type: "string"},
                                    2: {type: "string"},
                                    3: {type: "string"},
                                    4: {type: "string"},
                                },
                                message: '请至少上传一张图片'
                            }]
                        })(
                            <CustomUpload />
                        )
                    }

                </FormItem>

                <FormItem  {...actionLayout}  >
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
    data: state.enterprise.goods.item.data
}), (dispatch, ownProps)=>({
    fetchGoodsIfNeeded: (payload)=>dispatch(fetchGoodsIfNeeded(payload)),
    updateGoodsById: (id, data)=>dispatch(updateGoodsById(id, data)),
    createGoods: (data)=>dispatch(createGoods(data)),
    deleteGoodsById: (id)=>dispatch(deleteGoodsById(id)),
}))
@withRouter
class GoodsItem extends Component {
    constructor(props) {
        super(props);
        this.updateItem = this.updateItem.bind(this);
        this.deleteItem = this.deleteItem.bind(this);
        this.createItem = this.createItem.bind(this);
    }

    componentWillMount() {
        const id = this.props.params.id;
        if (id != 'create') {
            this.props.fetchGoodsIfNeeded(id);
        }
    }

    componentWillReceiveProps(nextProps) {

        const id = nextProps.params.id;
        if (this.props.params.id !== id) {
            if (id != 'create') {
                this.props.fetchGoodsIfNeeded(id);
            }
        }
    }

    updateItem(id, data) {
        this.props.updateGoodsById(id, data)
    }

    deleteItem(id) {
        this.props.deleteGoodsById(id)
    }

    createItem(payload) {
        this.props.createGoods(payload)
    }

    render() {
        const {id} = this.props.params;
        let data = this.props.data;

        if (id == 'create') {
            data = {
                shelves: 1,
                depositType: 0,
                stock: 0,
                priceYuan: 1,
                imagesArray: []
            }
        }

        return (
            <div className="ant-layout-content">
                <GoodsAction/>
                {data ? <GoodsForm type={id} payload={data} updateItem={this.updateItem} deleteItem={this.deleteItem}
                                   createItem={this.createItem}></GoodsForm> : <Block spinning/>}
            </div>
        )
    }
}

export default GoodsItem;
