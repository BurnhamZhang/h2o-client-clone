import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter,Link} from 'react-router';
import {get_geolocation} from '../actions/geo';
import  {ActivityIndicator,Result} from 'antd-mobile';




@connect((state, ownProps)=>({
    isFetching:state.geo.isFetching||state.shop.isFetching,
    location:state.shop.location,
    shop:state.shop.data
}), (dispatch, ownProps)=>({
    get_geolocation:(widthShopId)=>dispatch(get_geolocation(widthShopId))
}))
class Shop extends Component{
    componentWillMount(){
        !this.props.location && this.props.get_geolocation(true);
    }
    render() {

        const {isFetching,shop} = this.props;


        if(isFetching){
            return (
                <ActivityIndicator
                    toast
                    text="正在获取地址信息"
                    animating
                />
            )
        }
        if(Array.isArray(shop) && shop[0]){
            return  this.props.children || <div/>
        }

        return (
            <Result
                imgUrl="https://zos.alipayobjects.com/rmsportal/LUIUWjyMDWctQTf.png"
                title="获取门店失败"
                message="匹配不到门店"
            />
        )
    }
}

export default Shop;