/**
 * Created by zhangbohan on 16/11/3.
 */
import React, {Component} from 'react';
import {withRouter, Link} from 'react-router';
import {connect} from 'react-redux';
import {fetchGoodsIfNeeded,updateGoodsById,createGoods,deleteGoodsById} from '../../actions/enterprise/goods';
import {Table, DatePicker, Radio, Form, Button, Select, Input, InputNumber,Popconfirm} from 'antd';
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

@connect(null, (dispatch, ownProps)=>({
    updateGoodsById: (id,data)=>dispatch(updateGoodsById(id,data)),
    createGoods: (data)=>dispatch(createGoods(data)),
    deleteGoodsById: (id)=>dispatch(deleteGoodsById(id)),
}))
@createForm({
    mapPropsToFields: ({payload})=> {
        const fields = {};
        for (var a in payload) {
            fields[a] = {
                value: payload[a]
            }
        }
        fields.shelves && (fields.shelves.value*=1);
        fields.stock && (fields.stock.value*=1);
        fields.depositType && (fields.depositType.value*=1);
        console.log('mapPropsToFields', fields);
        return fields;
    }
})
class GoodsItem extends Component {
    constructor(props) {
        super(props)
    }

    handleSubmit() {
        const {type,updateGoodsById,createGoods} = this.props;
        this.props.form.validateFields((errors, values) => {
            if (errors) {
                console.log('Errors in form!!!');
                return;
            }
            console.log('values', JSON.stringify(values))

            values.price+='';

            if(type =='create'){
                createGoods(values)
            }
            else {
                updateGoodsById(type,values)
            }

            return
        });

    }

    handleDelete(){
        const {type,deleteGoodsById} = this.props;
        deleteGoodsById(type);
    }

    render() {
        const {getFieldDecorator, getFieldValue, getFieldsValue} = this.props.form;
        const {type, payload} = this.props;


        const item = Object.assign({}, payload, getFieldsValue());


        return (<div className="ant-layout-content">
            <Form horizontal>
                <FormItem  label="商品名称" {...itemLayout} >
                    {
                        getFieldDecorator('name', {})(
                            <Input />
                        )
                    }
                </FormItem>
                <FormItem  label="描述" {...itemLayout}  >
                    {

                        getFieldDecorator('memo', {})(
                            <Input />
                        )
                    }
                </FormItem>
                <FormItem label="规格"  {...itemLayout}    >
                    {

                        getFieldDecorator('scale', {})(
                            <Input />
                        )
                    }
                </FormItem>
                <FormItem label="价格" {...itemLayout}   >
                    {
                        getFieldDecorator('price', {})(
                            <InputNumber min={0.01} step="0.01" size="120"/>
                        )
                    }
                </FormItem>
                <FormItem label="库存"  {...itemLayout}  >
                    {
                        getFieldDecorator('stock', {})(
                            <InputNumber min={0} step="1" size="120"/>
                        )
                    }
                </FormItem>
                <FormItem   label="押金费" {...itemLayout}   >
                    {
                        getFieldDecorator('depositType', {})(
                            <RadioGroup>
                                <Radio key="a" value={0}>无押金</Radio>
                                <Radio key="b" value={1}>有押金</Radio>
                            </RadioGroup>
                        )

                    }
                    {
                        getFieldDecorator('depositMoney', {})(
                            <InputNumber min={0.01} step="0.01" size="120" style={{display:getFieldValue('depositType') == 1?'inline-block':'none'}} />)
                    }
                </FormItem>
                <FormItem   label="是否上架" {...itemLayout}  >
                    {
                        getFieldDecorator('shelves', {})(
                            <RadioGroup>
                                <Radio key="a" value={1}>上架</Radio>
                                <Radio key="b" value={0}>下架</Radio>
                            </RadioGroup>
                        )
                    }
                </FormItem>

                <FormItem label="图片" {...itemLayout}>
                    {
                        getFieldDecorator('images', {})(
                            <CustomUpload />
                        )
                    }

                </FormItem>

                <FormItem  {...actionLayout}  >
                    <Button type="primary" htmlType="button" style={{margin: ' 0 10px'}}
                            onClick={()=>(this.handleSubmit())}>确定</Button>

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
    ...state.enterprise.goods.item
}), (dispatch, ownProps)=>({
    fetchGoodsIfNeeded: (payload)=>dispatch(fetchGoodsIfNeeded(payload)),
}))
@withRouter
class GoodsForm extends Component {

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


    shouldComponentUpdate(nextProps) {
        if (nextProps.didUpdate) {
            console.warn(this.props.router);
            this.props.router.push('/goods')
            return false
        }
        return true
    }

    render() {
        const {id} = this.props.params;
        let data = this.props.data;

        if (id == 'create') {
            data = {
                shelves: 1,
                depositMoney: 1,
                depositType: 0,
                stock: 0,
                price: 1,
                images:[]
            }
            delete data.goodsId;
        }

        return  data ? <GoodsItem type={id} payload={data} ></GoodsItem> : <Block spinning/>
    }
}

export default GoodsForm;
