import React, {Component} from 'react';
import {withRouter,Link} from 'react-router';
import {connect} from 'react-redux';
import {List, Flex,Checkbox,Icon,Modal,SwipeAction} from 'antd-mobile';
const Item = List.Item;
const Brief = Item.Brief;
import {updateAddressById,deleteAddressById} from '../actions/address';

const alert =  Modal.alert;


@connect((state, ownProps)=>({
}), (dispatch, ownProps)=>({
    updateAddressById: (id,payload)=>dispatch(updateAddressById(id,payload)),
    deleteAddressById: (id)=>dispatch(deleteAddressById(id)),
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
    onDelete(id){
        alert('删除', '确认删除吗?', [
            { text: '取消', onPress: () => console.log('cancel') },
            { text: '确定', onPress: () => {
                this.props.deleteAddressById(id)
            } },
        ]);
    }

    render() {
        const {edit} = this.props;
        const {houseNumber, name, phone,id,defaultAddress,geo,streetId,location} = this.props.data;
        const onDelete = this.onDelete;
        return edit ? (
        <SwipeAction
            autoClose
            right={[
                {
                    text: '删除',
                    onPress:()=>this.onDelete(id),
                    style: { backgroundColor: '#F4333C', color: 'white' },
                },
            ]}
        >
            <Item extra="" multipleLine>
                {name + '  ' + phone}
                <Brief> {location+houseNumber}</Brief>
                <Flex justify="between">
                    <Checkbox onChange={(e)=>this.onChange(e.target.checked)} checked={defaultAddress=='2'} disabled={defaultAddress=='2'}>默认地址</Checkbox>
                    <Icon type="edit" onClick={
                        ()=>this.props.router.push({
                            pathname:`/address/${id}`,
                            query:{
                                address:Math.random().toString(36).substr(2)
                            }
                        })
                    }/>
                    <Icon type="delete" onClick={
                        ()=>this.onDelete(id)
                    }/>
                </Flex>
            </Item>
        </SwipeAction>


        ) : (
            <Item multipleLine arrow="horizontal" onClick={()=>this.props.onClick(this.props.data)}>
                {name + '  ' + phone}
                <Brief> {location+houseNumber}</Brief>
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
                    <AddressItem key={index} data={item} edit={edit} onClick={(data)=>this.props.onChoose(data)}/>
                ))}
            </List>
        );
    }
}


export default AddressList;