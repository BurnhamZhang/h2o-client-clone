import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter, Link} from 'react-router';
import {fetchAddressListIfNeeded} from '../actions/address';
import {ActivityIndicator, NavBar, Icon, Button} from 'antd-mobile';
import AddressList from './AddressList';

@connect((state, ownProps)=>({
    data: state.address.list.data
}), (dispatch, ownProps)=>({
    fetchAddressListIfNeeded: ()=>dispatch(fetchAddressListIfNeeded())
}))
class ConfirmAddress extends Component {
    componentWillMount() {
        this.props.fetchAddressListIfNeeded()
    }

    render() {
        const {data} = this.props;
        return (
            <div>
                <NavBar leftContent="返回" mode="light" onLeftClick={() =>this.props.router.goBack() }

                        rightContent={ <Link to={{
                            pathname: '/address/create',
                            query: {
                                address: Math.random().toString(36).substr(2)
                            }
                        }}>
                            <span style={{color: '#108ee9'}}>添加</span>
                        </Link>}
                >选择收货地址</NavBar>
                <div style={{paddingBottom: 84}}>
                    { data ? <AddressList data={data} onChoose={({id, name, geo, houseNumber, streetId, phone,location})=> {
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
                    }/> : null }
                </div>
            </div>
        );
    }
}


export default ConfirmAddress;