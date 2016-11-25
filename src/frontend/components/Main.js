import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter,Link} from 'react-router';
import {get_geolocation} from '../actions/geo';
import  {ListView,List,NavBar ,Icon,InputItem,Flex,ActivityIndicator} from 'antd-mobile';
import GoodsList from './GoodsList';






const data = [
    {
        img: 'http://temp.im/100x100/FF9500/000',
        title: '景田纯天然矿泉水小瓶装',
        des: '规格：100ml',
        prize: '5.00'
    },
    {
        img: 'http://temp.im/100x100/FF9500/000',
        title: '景田纯天然矿泉水',
        des: '规格：500ml',
        prize: '8.00'
    },
    {
        img: 'http://temp.im/100x100/FF9500/000',
        title: '景田精致桶装',
        des: '规格：1000ml',
        prize: '18.00'
    },
];


@connect((state, ownProps)=>({
    isFetching:state.geo.isFetching||state.shop.isFetching,
    location:state.shop.location
}), (dispatch, ownProps)=>({
    get_geolocation:(widthShopId)=>dispatch(get_geolocation(widthShopId))
}))
@withRouter
class Main extends Component{
    componentWillMount(){
        !this.props.location && this.props.get_geolocation(true);
    }
    render() {

        const {isFetching,location} = this.props;


        if(isFetching){
            return (
                <ActivityIndicator
                    toast
                    text="正在获取地址信息"
                    animating
                />
            )
        }
        return (
            <div id="main">
                <NavBar leftContent={[<Icon type="environment" key="0" />,location,<Icon type="down" key="2" />]} mode="light" onLeftClick={() => this.props.router.push('/geo')}
                >NavBar</NavBar>
                {location?<GoodsList/>:null}
            </div>

        );
    }
}

export default Main;