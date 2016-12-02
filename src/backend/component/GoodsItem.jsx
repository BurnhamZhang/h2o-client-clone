import React, {Component} from 'react';
import {Link,withRouter} from 'react-router';
import {connect} from 'react-redux';
import {clearGoods,fetchGoodsIfNeeded,fetchAvailableGoodsListIfNeeded,createGoods,deleteGoodsById,updateGoodsById} from '../actions/goods';
import {Table, Alert,DatePicker, Radio, Form, Button, Select, Input, InputNumber,Popconfirm,message} from 'antd';
import Block from './Block';
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
    nextRoute: '/goods',
    remoteMsg: state.goods.item.remoteMsg,
    didInvalidate: state.goods.item.didInvalidate,
    didUpdate: state.goods.item.didUpdate,
}))
class GoodsAction extends Action {

}


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
            scale: item.scale,
            priceYuan:item.priceYuan
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
        const {type,available} = this.props;


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

                            : getFieldValue('name')
                    }
                </FormItem>
                <FormItem  label="图片预览" {...itemLayout} >
                    {
                        getFieldDecorator('imagesArray', {})(
                            <div>
                                {
                                    getFieldValue('imagesArray').map((item, index)=>(
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
                            <span>{getFieldValue('memo')}</span>
                        )
                    }
                </FormItem>
                <FormItem label="规格"  {...itemLayout}    >
                    {
                        getFieldDecorator('scale', {})(
                            <span>{getFieldValue('scale')}</span>
                        )
                    }
                </FormItem>
                <FormItem label="价格" {...itemLayout}   >
                    {
                        getFieldDecorator('priceYuan', {})(
                            <span>{getFieldValue('priceYuan')}</span>
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
                                <Radio key="a" value={0}>上架</Radio>
                                <Radio key="b" value={1}>下架</Radio>
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
    data:state.goods.item.data,
    available:state.goods.available.data,
}), (dispatch, ownProps)=>({
    fetchGoodsIfNeeded: (payload)=>dispatch(fetchGoodsIfNeeded(payload)),
    fetchAvailableGoodsListIfNeeded:(payload)=>dispatch(fetchAvailableGoodsListIfNeeded(payload)),
    clearGoods:(payload)=>dispatch(clearGoods(payload)),
}))
@withRouter
class GoodsForm extends Component {

    componentWillMount() {
        const id = this.props.params.id;
        if(id=='create'){
            this.props.fetchAvailableGoodsListIfNeeded()
        }
        else{
            this.props.fetchGoodsIfNeeded(id);
        }
    }
    componentWillReceiveProps(nextProps){
        if(nextProps.params.id != this.props.params.id){
            this.props.clearGoods();
            if(nextProps.params.id =='create'){
                this.props.fetchAvailableGoodsListIfNeeded()
            }
            else{
                this.props.fetchGoodsIfNeeded(nextProps.params.id );
            }
        }
    }
    componentWillUnmount() {
        this.props.clearGoods();
    }
    render() {
        const {id} = this.props.params;
        let data = this.props.data;
        const available = this.props.available;
        let condition =!!data;


        if (id == 'create') {

            if(Array.isArray(available) && available.length ==0){
                return ( <Alert
                    message="错误"
                    description="没有可选择的商品"
                    type="error"
                    showIcon
                />)
            }

            if(Array.isArray(available)){
                data = Object.assign({
                    imagesArray:[]
                }, available[0], {
                    shelves: 0,
                    depositMoney: 1,
                    depositType: 0,
                    stock: 0,
                    priceYuan: '1.00',
                });
                condition = true;
            }
        }
        return              <GoodsAction>
            { condition ? <GoodsItem type={id} payload={data} available={available||[]}/> : <Block spinning/>}
        </GoodsAction>
    }
}

export default GoodsForm;
