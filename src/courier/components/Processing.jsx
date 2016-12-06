import React, {Component , PropTypes } from 'react';
import { Toast,NavBar } from 'antd-mobile';
import {withRouter} from 'react-router';
import DeliveryList from './DeliveryList';



@withRouter
class Processing extends Component {

    render() {
     return   (
         <div>
             <NavBar leftContent="返回" mode="light"  onLeftClick={() =>this.props.router.goBack() }
             >配送中订单</NavBar>
             <DeliveryList  params={{status:1}}/>
         </div>
         )
    }
}
;


export default Processing;
