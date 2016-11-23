import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter,Link} from 'react-router';
import {fetchAddressListIfNeeded} from '../actions/address';
import { ActivityIndicator,NavBar ,Icon,Button,List,InputItem,Radio,WhiteSpace,WingBlank,TextareaItem} from 'antd-mobile';
import { createForm } from 'rc-form';
import AddressList from './AddressList';
const Item = List.Item;
const Brief = Item.Brief;



@createForm()
@connect((state, ownProps)=>({
    data:state.address.data
}), (dispatch, ownProps)=>({
}))
class AddressControl extends Component {

    render() {
        const { getFieldProps } = this.props.form;
        const id = this.props.params.id;
        return (
            <div>
                <NavBar leftContent="返回" mode="light"
                >{id=='create'?'新建':'编辑'}收货地址</NavBar>
                <List>
                    <InputItem
                        {...getFieldProps('name')}
                        placeholder="您的姓名"
                    >联系人</InputItem>
                    <Item extra={<div>
                        <Radio className="my-radio">选项一</Radio>
                        <Radio className="my-radio" style={{ marginLeft: 10 }}>选项二</Radio>
                    </div>}>
                        称呼
                    </Item>
                    <InputItem
                        {...getFieldProps('phone')}
                        placeholder="您的手机" type="phone"
                    >联系电话</InputItem>
                    <InputItem editable={false} extra={<Link to="/map">选择</Link>}
                        {...getFieldProps('location')}
                    >收货地址</InputItem>
                    <TextareaItem title="详细地址"
                               {...getFieldProps('houseNumber')}
                               placeholder="您所在的具体地址(门牌号等)"
                                  rows="3" count="100"
                    />
                </List>
                <WhiteSpace/>
                <WingBlank>
                    <Link to="/address/create">
                        <Button  type="primary" >
                            <Icon type="plus" />
                            {id=='create'?'新建':'编辑'}收货地址</Button>
                    </Link>
                </WingBlank>

            </div>
        );
    }
}




export default AddressControl;