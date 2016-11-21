import React, {Component} from 'react';
import { List,Icon } from 'antd-mobile';

const Item = List.Item;
const Brief = Item.Brief;


class User extends Component {
    render(){
        return (
            <List>
                <Item thumb={<Icon type="pay-circle" />} arrow="horizontal">我的订单</Item>
                <Item thumb={<Icon type="environment" />} arrow="horizontal">我的收货地址</Item>
                <Item thumb={<Icon type="inbox" />} arrow="horizontal">退桶押金申请</Item>
            </List>
        )
    }
}
export default User;