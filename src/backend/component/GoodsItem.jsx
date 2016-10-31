import React, {Component} from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import {fetchGoodsIfNeeded} from '../actions/goods';
import {Table, DatePicker, Radio, Form, Button, Select, Input, Row, Col, InputNumber} from 'antd';
const ButtonGroup = Button.Group;
const Option = Select.Option;
const createForm = Form.create;
const FormItem = Form.Item;
const RangePicker = DatePicker.RangePicker;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;


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



@connect((state, ownProps)=>({
    ...state.goods
}), (dispatch, ownProps)=>({
    fetchGoodsIfNeeded: (payload)=>dispatch(fetchGoodsIfNeeded(payload))
}))
@createForm({
})
class GoodsItem extends Component {
    constructor(props) {
        super(props)
        this.onChooseItem =this.onChooseItem.bind(this);
    }

    componentDidMount() {
        const {id} = this.props.params;
        const payload = this.props.payload;

        if(id=='create'){
            this.onChooseItem(itemList[3].goodsId)
        }
        else {
            this.props.fetchGoodsIfNeeded(id);

        }
        console.log('componentDidMount ','payload',payload)
        payload && this.props.form.setFieldsValue(payload);
    }
    onChooseItem(value){


        const item = itemList.find((item)=>(value==item.goodsId));
        console.log('onChooseItem',value,item)
        this.props.form.setFieldsValue({
            goodsId:item.goodsId,
            images:item.images,
            memo:item.memo,
            scale:item.scale
        });
    }


    handleSubmit() {
        console.log('handleSubmit');
        this.props.form.validateFields((errors, values) => {
            if (errors) {
                console.log('Errors in form!!!');
                return;
            }
            console.log('values',values)
            return
        });

    }

    render() {
        const {getFieldDecorator, getFieldValue ,getFieldsValue} = this.props.form;
        console.log('props', this.props)
        const {id} = this.props.params;
        const { payload  ,isFetching } = this.props;


        if(isFetching  || !payload){
            return <span>搜索中</span>
        }

        const item = payload;

        console.log('item',item)
        console.log('getFieldsValue' ,getFieldsValue())


        return (<div className="ant-layout-content">
            <Form horizontal>
                <FormItem
                    label="选择商品"
                    labelCol={{span: 2}}
                    wrapperCol={{span: 22}}
                >
                    {
                        id == 'create' ?
                        getFieldDecorator('goodsId', {
                            initialValue:item.name
                        })(
                            <Select style={{width: 120}}  onChange={(value)=>{this.onChooseItem(value)}}>
                                {
                                    itemList.map((item, index)=>(
                                        <Option value={item.goodsId +''} key={item.goodsId}>{item.name}</Option>))
                                }
                            </Select>
                        )

                         : item.name
                    }
                </FormItem>
                <FormItem
                    label="图片预览"
                    labelCol={{span: 2}}
                    wrapperCol={{span: 22}}
                >
                    {
                        getFieldDecorator('images', {
                        })(
                          <div>
                              {
                                  item.images.map((item, index)=>(
                                      <img src={item} key={index} style={{width: 144, height: 144, margin: '0 5px 5px 0'}}
                                             alt={item} />
                                  ))
                              }
                          </div>
                        )

                    }


                </FormItem>
                <FormItem
                    label="描述"
                    labelCol={{span: 2}}
                    wrapperCol={{span: 22}}
                >
                    {

                        getFieldDecorator('memo', {
                        })(
                            <span>{item.memo}</span>
                        )
                    }
                </FormItem>
                <FormItem
                    label="规格"
                    labelCol={{span: 2}}
                    wrapperCol={{span: 22}}
                >
                    {

                        getFieldDecorator('scale', {
                        })(
                            <span>{item.scale}</span>
                        )
                    }
                </FormItem>
                <FormItem
                    label="价格"
                    labelCol={{span: 2}}
                    wrapperCol={{span: 22}}
                >
                    {
                        getFieldDecorator('price', {
                            initialValue:  1
                        })(
                            <InputNumber min={0.01} step="0.01" size="120"/>
                        )
                    }
                </FormItem>
                <FormItem
                    label="库存"
                    labelCol={{span: 2}}
                    wrapperCol={{span: 22}}
                >
                    {
                        getFieldDecorator('stock', {
                            initialValue: 0
                        })(
                            <InputNumber min={0} step="1" size="120"/>
                        )
                    }
                </FormItem>
                <FormItem
                    label="押金费"
                    labelCol={{span: 2}}
                    wrapperCol={{span: 22}}
                >
                    {
                        getFieldDecorator('depositType', {
                            initialValue: 0,
                        })(
                            <RadioGroup>
                                <Radio key="a" value={0}>无押金</Radio>
                                <Radio key="b" value={1}>有押金</Radio>
                            </RadioGroup>
                        )

                    }
                    {
                        getFieldValue('depositType') == 1 ? getFieldDecorator('depositMoney', {
                            initialValue: 1,
                        })(
                            <InputNumber min={0.01}  step="0.01" size="120"/>) : ''
                    }
                </FormItem>
                <FormItem
                    label="是否上架"
                    labelCol={{span: 2}}
                    wrapperCol={{span: 22}}
                >
                    {
                        getFieldDecorator('shelves', {
                            initialValue: 1,
                        })(
                            <RadioGroup>
                                <Radio key="a" value={1}>上架</Radio>
                                <Radio key="b" value={0}>下架</Radio>
                            </RadioGroup>
                        )
                    }
                </FormItem>

                <FormItem
                    wrapperCol={{span: 22, offset: 2}}
                >
                    <Button type="primary" htmlType="button" style={{margin: ' 0 10px'}}
                            onClick={()=>(this.handleSubmit())}>确定</Button>
                </FormItem>
            </Form>
        </div>)
    }
}


export default GoodsItem;
