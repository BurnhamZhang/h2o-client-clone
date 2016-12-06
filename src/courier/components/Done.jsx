import React, {Component , PropTypes } from 'react';
import { Toast ,NavBar} from 'antd-mobile';
import {withRouter} from 'react-router';
import DeliveryList from './DeliveryList';




@withRouter
class Done extends Component {

    render() {
     return  (<div>
             <NavBar leftContent="返回" mode="light"  onLeftClick={() =>this.props.router.goBack() }
             >已配送完成订单</NavBar>
         <DeliveryList  params={{status:3}}/>
         </div>)
    }
};


export default Done;
