import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter,Link} from 'react-router';
import {fetchAddressIfNeeded,updateAddressById,createAddress} from '../actions/address';
import {unsetGeoCache} from '../actions/geo';
import {cacheUpdate} from '../actions/cache';
import { ActivityIndicator,NavBar ,Icon,Button,Radio,List,InputItem,WhiteSpace,WingBlank,TextareaItem,Popup,Toast} from 'antd-mobile';
import { createForm } from 'rc-form';
const Item = List.Item;
const Brief = Item.Brief;






@withRouter
@connect((state, ownProps)=>{
    return{
        data:  Object.assign({
            sex:'M',
        },((state.address.item.data && ownProps.params.id==state.address.item.data.id)?state.address.item.data:null),state.cache[ownProps.location.query.address])
    }
}, (dispatch, ownProps)=>({
    cacheUpdate: (payload)=>dispatch(cacheUpdate(payload)),
    fetchAddressIfNeeded: (payload)=>dispatch(fetchAddressIfNeeded(payload)),
}))
class Address extends Component {
    componentWillMount(){
        const {data} = this.props;
        const id = this.props.params.id;
        console.warn('data',data);
        if(id !='create'){
            if( data.id !=id){
                this.props.fetchAddressIfNeeded(id)
            }
        }

    }
    render() {
        const {data} = this.props;
        const id = this.props.params.id;

        if(id=='create' || id==data.id){
            return   React.cloneElement(this.props.children || <div/>, this.props)

        }
        return null
    }
};




export default Address;