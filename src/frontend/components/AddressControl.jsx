import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter,Link} from 'react-router';
import {fetchAddressListIfNeeded} from '../actions/address';
import {cacheUpdate} from '../actions/cache';
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
    fetchAddressListIfNeeded:()=>dispatch(fetchAddressListIfNeeded()),
    cacheUpdate: (data)=>dispatch(cacheUpdate({
        key: ownProps.location.state.cacheId,
        data
    })),
}))
class AddressControl extends Component {
    componentWillMount(){
        this.props.fetchAddressListIfNeeded()
    }
    render() {
        const {data} = this.props;
        const {cacheId ,choose} = this.props.location.state||{};
        return (
            <div>
                <AddressAction updateHandle={()=>this.props.fetchAddressListIfNeeded()}/>
                <NavBar leftContent="返回" mode="light"  onLeftClick={() =>this.props.router.goBack() }
                        rightContent={ <Link to={{
                            pathname: '/address/create',
                            query: {
                                cacheId
                            }
                        }} >
                            <span style={{color:'#108ee9'}}>添加</span>
                        </Link>}
                >收货地址管理</NavBar>
                <div style={{paddingBottom:84}}>
                    { data ? <AddressList data={data} edit={!choose} onChoose={({id, name, geo, houseNumber, streetId, phone,location})=> {
                        if(choose){
                            this.props.cacheUpdate({
                                addressId: id,
                                name,
                                geo,
                                location,
                                houseNumber,
                                streetId,
                                phone
                            })
                            this.props.router.goBack();
                        }
                    }
                    }/> : null }
                </div>

            </div>
        );
    }
}




export default AddressControl;