import React, {Component , PropTypes } from 'react';
import { Toast,Tabs ,Badge} from 'antd-mobile';
import {withRouter} from 'react-router';
import OrderList from './OrderList';
import DeliveryList from './DeliveryList';
import {connect} from 'react-redux';
import {assignOrderList} from '../actions/order';
import {getDeliveryList} from '../actions/delivery';

const TabPane =Tabs.TabPane;

@withRouter
@connect((state, ownProps)=>({
    orderPagination:state.order.list.pagination,
    deliverPagination:state.delivery.list.pagination,
}), (dispatch, ownProps)=>({
    assignOrderList: (payload)=>dispatch(assignOrderList(payload)),
    getDeliveryList: (payload)=>dispatch(getDeliveryList(payload)),
}))
class Pending extends Component {

    componentWillMount(){
         this.props.getDeliveryList({status:0});
    }
    render() {
        const {orderPagination,deliverPagination} = this.props;
        let order =0 ,delivery= 0;
        if(orderPagination){
            order = orderPagination.totalCount;
        }
        if(deliverPagination){
            delivery = deliverPagination.totalCount;
        }
     return  <div>
         <Tabs defaultActiveKey="1">
             <TabPane tab={<Badge text={order}>待抢单</Badge>} key="1">
                 <OrderList/>
             </TabPane>
             <TabPane tab={<Badge text={delivery}>自动派单</Badge>} key="2">
                 <DeliveryList params={{status:0}}/>
             </TabPane>
         </Tabs>
     </div>
    }
}
;


export default Pending;
