import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter,Link} from 'react-router';
import {fetchAddressListIfNeeded} from '../actions/address';
import { ActivityIndicator,NavBar ,Icon,Button} from 'antd-mobile';
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
                >收货地址管理</NavBar>
                { data? <AddressList data={data} edit/>:null }

                <Link to="/address/create">
                    <Button  type="primary" >
                        <Icon type="plus" />
                        新增收货地址</Button>
                </Link>
            </div>
        );
    }
}




export default Address;