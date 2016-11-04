import React, {Component} from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import {fetchGoodsIfNeeded} from '../actions/goods';
import {Table, DatePicker, Radio, Form, Button, Select, Input, InputNumber} from 'antd';
import Block from './Block';
const ButtonGroup = Button.Group;
const Option = Select.Option;
const createForm = Form.create;
const FormItem = Form.Item;
const RangePicker = DatePicker.RangePicker;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
import {itemLayout, actionLayout} from '../constants/formLayout';

const itemList = [{
    "goodsId": 7201,
    "name": "名称wowd7lka0xq2",
    "images": ["http://temp.im/144x144/FF9500/000", "http://temp.im/144x144/FF9500/000"],
    "memo": "描述介绍XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
    "price": "81.56",
    "scale": "20L",
    "stock": 6737,
    "depositType": 0,
    "depositMoney": "14.27",
    "shelves": 0
}, {
    "goodsId": 9772,
    "name": "名称z45r4bbzv",
    "images": ["http://temp.im/144x144/FF9500/000", "http://temp.im/144x144/FF9500/000"],
    "memo": "描述介绍XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
    "price": "16.16",
    "scale": "20L",
    "stock": 3761,
    "depositType": 0,
    "depositMoney": "1.91",
    "shelves": 1
}, {
    "goodsId": 2162,
    "name": "名称58kg036q",
    "images": ["http://temp.im/144x144/FF9500/000", "http://temp.im/144x144/FF9500/000"],
    "memo": "描述介绍XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
    "price": "96.33",
    "scale": "10L",
    "stock": 8296,
    "depositType": 1,
    "depositMoney": "41.41",
    "shelves": 0
}, {
    "goodsId": 4685,
    "name": "名称b1meuaso",
    "images": ["http://temp.im/144x144/FF9500/000", "http://temp.im/144x144/FF9500/000"],
    "memo": "描述介绍XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
    "price": "15.33",
    "scale": "15L",
    "stock": 8072,
    "depositType": 0,
    "depositMoney": "20.98",
    "shelves": 1
}, {
    "goodsId": 9679,
    "name": "名称ihd77jcy",
    "images": ["http://temp.im/144x144/FF9500/000", "http://temp.im/144x144/FF9500/000"],
    "memo": "描述介绍XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
    "price": "59.02",
    "scale": "15L",
    "stock": 908,
    "depositType": 0,
    "depositMoney": "24.17",
    "shelves": 1
}, {
    "goodsId": 4979,
    "name": "名称rf1qhqav3",
    "images": ["http://temp.im/144x144/FF9500/000", "http://temp.im/144x144/FF9500/000"],
    "memo": "描述介绍XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
    "price": "43.98",
    "scale": "10L",
    "stock": 1640,
    "depositType": 1,
    "depositMoney": "10.01",
    "shelves": 0
}, {
    "goodsId": 3286,
    "name": "名称8or4fefv52g",
    "images": ["http://temp.im/144x144/FF9500/000", "http://temp.im/144x144/FF9500/000"],
    "memo": "描述介绍XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
    "price": "90.45",
    "scale": "20L",
    "stock": 5566,
    "depositType": 1,
    "depositMoney": "97.09",
    "shelves": 1
}];


@createForm({
    mapPropsToFields: ({payload})=> {
        const fields = {};
        for (var a in payload) {
            fields[a] = {
                value: payload[a]
            }
        }
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


        const item = itemList.find((item)=>(value == item.goodsId));
        console.log('onChooseItem', value, item)
        this.props.form.setFieldsValue({
            goodsId: item.goodsId,
            images: item.images,
            memo: item.memo,
            scale: item.scale
        });
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
        const {getFieldDecorator, getFieldValue, getFieldsValue} = this.props.form;
        const {type, payload} = this.props;


        const item = Object.assign({}, payload, getFieldsValue());

        console.warn('render', item);


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
                                        itemList.map((item, index)=>(
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
                </FormItem>
            </Form>
        </div>)
    }
}

@connect((state, ownProps)=>({
    ...state.goods.item
}), (dispatch, ownProps)=>({
    fetchGoodsIfNeeded: (payload)=>dispatch(fetchGoodsIfNeeded(payload))
}))
class GoodsForm extends Component {

    componentWillMount() {
        console.warn('componentWillMount'.toLocaleUpperCase());
        const id = this.props.params.id;
        if (id != 'create') {
            this.props.fetchGoodsIfNeeded(id);
        }
    }

    componentWillReceiveProps(nextProps) {

        const id = nextProps.params.id;
        console.warn('componentWillReceiveProps', this.props, nextProps)
        if (this.props.params.id !== id) {
            if (id != 'create') {
                this.props.fetchGoodsIfNeeded(id);
            }
        }
    }

    render() {
        const {id} = this.props.params;
        let data = this.props.data;

        if (id == 'create') {
            data = Object.assign({}, itemList[0], {
                shelves: 1,
                depositMoney: 1,
                depositType: 0,
                stock: 0,
                price: 1,
            });
            delete data.goodsId;
        }

        return  data ? <GoodsItem type={id} payload={data} ></GoodsItem> : <Block spinning/>
    }
}

export default GoodsForm;