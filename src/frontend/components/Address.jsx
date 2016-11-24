import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter,Link} from 'react-router';
import {fetchAddressListIfNeeded} from '../actions/address';
import { ActivityIndicator,NavBar ,Icon,Button} from 'antd-mobile';
import AddressList from './AddressList';

@withRouter
@connect((state, ownProps)=>({
    data:state.address.list.data
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
                <NavBar leftContent="返回" mode="light"  onLeftClick={() =>this.props.router.goBack() }
                >收货地址管理</NavBar>
                <div style={{paddingBottom:84}}>
                    { data? <AddressList data={data} edit/>:null }
                </div>
                <div style={{position:'fixed',bottom:0,width:'100%'}}>
                    <Link to="/address/create">
                        <Button  type="primary" >
                            <Icon type="plus" />
                            新增收货地址</Button>
                    </Link>
                </div>
            </div>
        );
    }
}




export default Address;