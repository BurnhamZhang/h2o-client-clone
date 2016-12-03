import React, {Component , PropTypes } from 'react';
import { Toast } from 'antd-mobile';
import {withRouter} from 'react-router';
import DeliveryList from './DeliveryList';



@withRouter
class Processing extends Component {

    render() {
     return   <DeliveryList  params={{status:1}}/>
    }
}
;


export default Processing;
