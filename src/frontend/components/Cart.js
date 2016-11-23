import React, {Component} from 'react';
import { List,Checkbox ,Flex,Stepper,Icon} from 'antd-mobile';
const CheckboxItem = Checkbox.CheckboxItem;

const data = [
    {
        "goodsId":"1",            // 商品id，必填
        "name":"宾田天然矿泉水4L *  20瓶装",            // 商品名称，必填
        "priceYuan":"3.23",       // 商品单价，必填
        "scale":"10L",            // 规格，必填
        "count":"2",              // 数量，必填
        "moneyYuan":"1.23",       // 总价，必填
        "depositType":"1",        // 是否有押金，0，没押金；1，有押金，必填
        "depositMoneyYuan":"1.11", // 押金，非必填
        image:'http://temp.im/80x80/4CD964/fff'
    }, {
        "goodsId":"1",            // 商品id，必填
        "name":"宾田天然矿泉水1L *  20瓶装",            // 商品名称，必填
        "priceYuan":"3.23",       // 商品单价，必填
        "scale":"10L",            // 规格，必填
        "count":"2",              // 数量，必填
        "moneyYuan":"1.23",       // 总价，必填
        "depositType":"1",        // 是否有押金，0，没押金；1，有押金，必填
        "depositMoneyYuan":"1.11", // 押金，非必填
        image:'http://temp.im/80x80/4CD964/fff'
    }]
class Cart extends Component {
    onChange(){
        console.log(arguments)
    }
    render() {

        const footer = (<Flex>
            <Flex.Item>
                <div className="cart-info">
                    <p>合计：￥236.00</p>
                    <p>再买￥50免运费/起送</p>
                </div>


            </Flex.Item>
            <button className="submit">去结算（2）</button>
        </Flex>)

        return (
            <div id="cart">
                <List renderHeader={ ()=><Checkbox>全选</Checkbox>} renderFooter={()=>footer}>
                    {data.map((i,index) => (
                        <List.Item key={index}  thumb={<Checkbox onChange={this.onChange} name="cart"/>}>
                            <Flex justify="center">
                                <img src="http://temp.im/100x100/4CD964/fff" alt="" style={{height:100,width:100}}/>
                                <Flex.Item className="Item">
                                    {i.name}
                                    <Flex justify="between">
                                        <List.Item.Brief>{i.priceYuan}</List.Item.Brief>
                                        <Stepper showNumber max={10} min={1} defaultValue={1} style={{width:200}}  />
                                        <Icon type="delete" />
                                    </Flex>
                                </Flex.Item>
                            </Flex>
                        </List.Item>
                    ))}
                </List>
            </div>
        );
    }
}

export default Cart;