import React, {Component} from 'react';
import { List,Icon } from 'antd-mobile';
import {withRouter} from 'react-router';
const Item = List.Item;
const Brief = Item.Brief;

@withRouter
class User extends Component {

    onClick(path){
        this.props.router.push(path)
    }
    render(){
        return (
            <List>
                <Item thumb={<Icon type="pay-circle" />} arrow="horizontal" onClick={()=>this.onClick('/order')}>我的订单</Item>
                <Item thumb={<Icon type="environment" />} arrow="horizontal" onClick={()=>this.onClick('/address')}>我的收货地址</Item>
                <Item thumb={<Icon type="inbox" />} arrow="horizontal" onClick={()=>this.onClick('/retreat')}>退桶押金申请</Item>
            </List>
        )
    }
}
export default User;