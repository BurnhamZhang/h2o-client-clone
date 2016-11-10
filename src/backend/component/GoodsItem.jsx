import React, {Component} from 'react';
import {Link,withRouter} from 'react-router';
import {connect} from 'react-redux';
import {fetchGoodsIfNeeded,fetchAvailableGoodsListIfNeeded,createGoods,deleteGoodsById,updateGoodsById} from '../actions/goods';
import {Table, DatePicker, Radio, Form, Button, Select, Input, InputNumber,Popconfirm,message} from 'antd';
import Block from './Block';
const ButtonGroup = Button.Group;
const Option = Select.Option;
const createForm = Form.create;
const FormItem = Form.Item;
const RangePicker = DatePicker.RangePicker;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
import {itemLayout, actionLayout} from '../constants/formLayout';

@connect((state, ownProps)=>({
}), (dispatch, ownProps)=>({
    createGoods: (payload)=>dispatch(createGoods(payload)),
    deleteGoodsById:(id)=>dispatch(deleteGoodsById(id)),
    updateGoodsById:(id,values)=>dispatch(updateGoodsById(id,values)),
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
        fields.depositType && (fields.depositType.value*=1);
        console.log('mapPropsToFields', fields);
        return fields;
    }
})
class GoodsItem extends Component {
    constructor(props) {
        super(props)
        this.onChooseItem = this.onChooseItem.bind(this);
    }


    onChooseItem(value) {

        const {available} = this.props;
        const item = available.find((item)=>(value == item.goodsId));
        console.log('onChooseItem', value, item)
        this.props.form.setFieldsValue({
            goodsId: item.goodsId,
            images: item.images,
            memo: item.memo,
            scale: item.scale
        });
    }

    handleDelete(){
        const {type,deleteGoodsById} = this.props;
        deleteGoodsById(type);
    }
    handleSubmit() {
        console.log('handleSubmit');
        const {type,createGoods,updateGoodsById} = this.props;
        this.props.form.validateFields((errors, values) => {
            if (errors) {
                console.log('Errors in form!!!');
                return;
            }
            console.log('values', values)
            if(type =='create'){
                createGoods(values)
            }
            else {
                updateGoodsById(type,values)
            }
        });

    }

    render() {
        const {getFieldDecorator, getFieldValue, getFieldsValue} = this.props.form;
        const {type, payload,available} = this.props;


        const item = Object.assign({}, payload, getFieldsValue());



        return (<div className="ant-layout-content">
            <Form horizontal>
                <FormItem  label="选择商品" {...itemLayout} >
                    {
                        type == 'create' ?
                            getFieldDecorator('goodsId', {})(
                                <Select style={{width: 120}} onChange={(value)=> {
                                    this.onChooseItem(value)
                                }}>
                                    {
                                        available.map((item, index)=>(
                                            <Option value={item.goodsId + ''} key={item.goodsId}>{item.name}</Option>))
                                    }
                                </Select>
                            )

                            : item.name
                    }
                </FormItem>
                <FormItem  label="图片预览" {...itemLayout} >
                    {
                        getFieldDecorator('images', {})(
                            <div>
                                {
                                    item.images.map((item, index)=>(
                                        <img src={item} key={index}
                                             style={{width: 144, height: 144, margin: '0 5px 5px 0'}}
                                             alt={item}/>
                                    ))
                                }
                            </div>
                        )

                    }


                </FormItem>
                <FormItem  label="描述" {...itemLayout}  >
                    {

                        getFieldDecorator('memo', {})(
                            <span>{item.memo}</span>
                        )
                    }
                </FormItem>
                <FormItem label="规格"  {...itemLayout}    >
                    {

                        getFieldDecorator('scale', {})(
                            <span>{item.scale}</span>
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
                        getFieldValue('depositType') == 1 ? getFieldDecorator('depositMoney', {})(
                            <InputNumber min={0.01} step="0.01" size="120"/>) : ''
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
    ...state.goods
}), (dispatch, ownProps)=>({
    fetchGoodsIfNeeded: (payload)=>dispatch(fetchGoodsIfNeeded(payload)),
    fetchAvailableGoodsListIfNeeded:(payload)=>dispatch(fetchAvailableGoodsListIfNeeded(payload)),
}))
@withRouter
class GoodsForm extends Component {

    componentWillMount() {
        console.warn('componentWillMount'.toLocaleUpperCase());
        const id = this.props.params.id;
        this.props.fetchGoodsIfNeeded(id);
        this.props.fetchAvailableGoodsListIfNeeded()
    }

    componentWillReceiveProps(nextProps) {

        const id = nextProps.params.id;
        if (this.props.params.id !== id) {
            this.props.fetchGoodsIfNeeded(id);
            this.props.fetchAvailableGoodsListIfNeeded()
        }
    }
    shouldComponentUpdate(nextProps) {
        if (nextProps.item.didUpdate) {
            this.props.router.push('/goods')
            return false
        }
        return true
    }
    componentDidUpdate(){
        const  {didInvalidate,remoteMsg} = this.props.item;

        console.warn('componentDidUpdate',didInvalidate,remoteMsg)
        if(didInvalidate && remoteMsg){
            message.warn(remoteMsg)
        }
    }
    render() {
        const {id} = this.props.params;
        let data = this.props.item.data;
        const available = this.props.available.data;




        if (id == 'create' && Array.isArray(available)) {
            data = Object.assign({}, available[0], {
                shelves: 1,
                depositMoney: 1,
                depositType: 0,
                stock: 0,
                price: 1,
            });
        }

        console.log('render',available,data)
        return  (data && Array.isArray(available)) ? <GoodsItem type={id} payload={data} available={available}></GoodsItem> : <Block spinning/>
    }
}

export default GoodsForm;
