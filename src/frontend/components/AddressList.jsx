import React, {Component} from 'react';
import {withRouter,Link} from 'react-router';
import {connect} from 'react-redux';
import {List, Flex,Checkbox,Icon} from 'antd-mobile';
const Item = List.Item;
const Brief = Item.Brief;
import {updateAddressById} from '../actions/address';




@connect((state, ownProps)=>({
}), (dispatch, ownProps)=>({
    updateAddressById: (id,payload)=>dispatch(updateAddressById(id,payload)),
}))
@withRouter
class AddressItem extends Component {
    onChange(checked) {
        const data = this.props.data;
        this.props.updateAddressById(data.id,{
            ...data,
            defaultAddress:checked?'2':'1'
        })
    }

    render() {
        const {edit} = this.props;
        const {houseNumber, name, phone,id,defaultAddress} = this.props.data;
        return edit ? (
            <Item extra="" multipleLine>
                {name + '  ' + phone}
                <Brief> {houseNumber}</Brief>
                <Flex justify="between">
                    <Checkbox onChange={(e)=>this.onChange(e.target.checked)} checked={defaultAddress=='2'} disabled={defaultAddress=='2'}>默认地址</Checkbox>
                    <Icon type="edit" onClick={
                        ()=>this.props.router.push(`/address/${id}`)
                    }/>
                    <Icon type="delete"/>
                </Flex>
            </Item>
        ) : (
            <Item multipleLine arrow="horizontal">
                {name + '  ' + phone}
                <Brief> {houseNumber}</Brief>
            </Item>
        )
    }
}


class AddressList extends Component {
    render() {
        const {data, edit} = this.props;
        return (
            <List {...this.props} >
                {data.map((item, index)=>(
                    <AddressItem key={index} data={item} edit={edit}/>
                ))}
            </List>
        );
    }
}


export default AddressList;