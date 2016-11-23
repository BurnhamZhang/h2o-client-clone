import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import {fetchAddressListIfNeeded} from '../actions/address';
import { ActivityIndicator,NavBar } from 'antd-mobile';
import AddressList from './AddressList';


@connect((state, ownProps)=>({
    data:state.address.data
}), (dispatch, ownProps)=>({
    fetchAddressListIfNeeded:()=>dispatch(fetchAddressListIfNeeded())
}))
class Address extends Component {
    componentWillMount(){
        this.props.fetchAddressListIfNeeded()
    }
    render() {
        const {data} = this.props
        return (
            <div>
                <NavBar leftContent="返回" mode="light"
                >地址选择</NavBar>
                { data? <AddressList data={data}/>:null }
            </div>
        );
    }
}




export default Address;