import React, {Component , PropTypes } from 'react';
import { Toast,Tabs } from 'antd-mobile';
import {withRouter} from 'react-router';
import OrderList from './OrderList';
import DeliveryList from './DeliveryList';

const TabPane =Tabs.TabPane;

@withRouter
class Pending extends Component {

    render() {
     return  <div>
         <Tabs defaultActiveKey="1">
             <TabPane tab="待抢单" key="1">
                 <OrderList/>
             </TabPane>
             <TabPane tab="自动派单" key="2">
                 <DeliveryList params={{status:0}}/>
             </TabPane>
         </Tabs>
     </div>
    }
}
;


export default Pending;
