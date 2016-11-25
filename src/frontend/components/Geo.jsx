import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import {fetchAddressListIfNeeded} from '../actions/address';
import {get_geolocation} from '../actions/geo';
import {shopChoose} from '../actions/shop';
import { ActivityIndicator,NavBar,List ,Icon} from 'antd-mobile';
import AddressList from './AddressList';
import Action from './Action';

@connect((state, ownProps)=>({
    remoteMsg: state.shop.remoteMsg,
    didInvalidate: state.shop.didInvalidate,
    didUpdate: state.shop.didUpdate,
}))
class ShopAction extends Action {
}

const Item = List.Item;
@withRouter
@connect((state, ownProps)=>({
    data:state.address.list.data,
    shop:state.shop.data,
    geo:state.geo
}), (dispatch, ownProps)=>({
    fetchAddressListIfNeeded:()=>dispatch(fetchAddressListIfNeeded()),
    get_geolocation:()=>dispatch(get_geolocation()),
    shopChoose:(data)=>dispatch(shopChoose(data)),
}))
class Address extends Component {
    componentWillMount(){
        this.props.fetchAddressListIfNeeded();
        this.props.get_geolocation();
    }
    onClick(data){
        console.log(data)
        this.props.shopChoose(data);
    }
    render() {
        const {data} = this.props;
        return (
            <div>
                <ShopAction updateHandle={()=>{
                    this.props.router.push('/main')
                }}/>
                <NavBar leftContent="返回" mode="light" onLeftClick={() =>this.props.router.goBack() }
                >地址选择</NavBar>
                <List  renderHeader={() => '当前地址'}>
                    <Item onClick={()=>this.onClick(this.props.geo.addressComponents)} extra={<span onClick={()=> this.props.get_geolocation()} >{this.props.geo.isFetching?<Icon type="loading" />:<Icon type="reload" />}重新定位</span>}>
                        {this.props.geo.streetNumber}
                    </Item>
                </List>
                { data? <AddressList renderHeader={() => '收货地址'} data={data} onChoose={(data)=>this.onClick(data)}/>:null }
            </div>
        );
    }
}




export default Address;