import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter,Link} from 'react-router';
import {fetchAddressListIfNeeded} from '../actions/address';
import { ActivityIndicator,NavBar ,Icon,Button} from 'antd-mobile';
import AddressList from './AddressList';
import Action from './Action';

@connect((state, ownProps)=>({
    didUpdate: state.address.item.didUpdate,
    remoteMsg: state.address.item.remoteMsg,
    didInvalidate: state.address.item.didInvalidate,
}))
class AddressAction extends Action{

}


@withRouter
@connect((state, ownProps)=>({
    data:state.address.list.data
}), (dispatch, ownProps)=>({
    fetchAddressListIfNeeded:()=>dispatch(fetchAddressListIfNeeded())
}))
class AddressControl extends Component {
    componentWillMount(){
        this.props.fetchAddressListIfNeeded()
    }
    render() {
        const {data} = this.props
        return (
            <div>
                <AddressAction updateHandle={()=>this.props.fetchAddressListIfNeeded()}/>
                <NavBar leftContent="返回" mode="light"  onLeftClick={() =>this.props.router.goBack() }
                        rightContent={ <Link to={{
                            pathname:'/address/create',
                            query:{
                                address:Math.random().toString(36).substr(2)
                            }
                        }}  >
                            <span style={{color:'#108ee9'}}>添加</span>
                        </Link>}
                >收货地址管理</NavBar>
                <div style={{paddingBottom:84}}>
                    { data? <AddressList data={data} edit/>:null }
                </div>

            </div>
        );
    }
}




export default AddressControl;