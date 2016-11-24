import React, {Component} from 'react';
import {withRouter,Link} from 'react-router';
import {List, Flex,Checkbox,Icon} from 'antd-mobile';
const Item = List.Item;
const Brief = Item.Brief;


@withRouter
class AddressItem extends Component {
    onChange(checked) {
        console.log(checked);
    }

    render() {
        const {edit} = this.props;
        const {houseNumber, name, phone,id} = this.props.data;
        return edit ? (
            <Item extra="" multipleLine>
                {name + '  ' + phone}
                <Brief> {houseNumber}</Brief>
                <Flex justify="between">
                    <Checkbox onChange={(e)=>this.onChange(e.target.checked)}>默认地址</Checkbox>
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