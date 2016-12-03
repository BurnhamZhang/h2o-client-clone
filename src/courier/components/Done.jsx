import React, {Component , PropTypes } from 'react';
import { Toast } from 'antd-mobile';
import {withRouter} from 'react-router';
import DeliveryList from './DeliveryList';




@withRouter
class Done extends Component {

    render() {
     return   <DeliveryList  params={{status:3}}/>
    }
}
;


export default Done;
