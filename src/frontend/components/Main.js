import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter, Link} from 'react-router';
import {get_geolocation} from '../actions/geo';
import  {ListView, List, NavBar, Icon, InputItem, Flex, ActivityIndicator} from 'antd-mobile';
import GoodsList from './GoodsList';
import Shop from './Shop';


@connect((state, ownProps)=>({
    location: state.shop.location
}), (dispatch, ownProps)=>({}))
@withRouter
class MainPage extends Component {

    render() {

        const {location} = this.props;
        return (
            <div id="main">
                <NavBar leftContent={[<Icon type="environment" key="0"/>, location, <Icon type="down" key="2"/>]}
                        mode="light" onLeftClick={() => this.props.router.push('/geo')}
                />
                <GoodsList/>
            </div>
        );
    }
}

class Main extends Component {
    render(){
        return <Shop>
            <MainPage/>
        </Shop>
    }
}

export default Main;