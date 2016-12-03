import React, {Component, PropTypes} from 'react';
import {List} from 'antd-mobile';
import {withRouter} from 'react-router';
import {assignOrderList,orderListClear} from '../actions/order';
import OrderItem from './OrderItem';
import {connect} from 'react-redux';


@withRouter
@connect((state, ownProps)=>({
    data:state.order.list.data,
}), (dispatch, ownProps)=>({
    assignOrderList: (payload)=>dispatch(assignOrderList(payload)),
    orderListClear: (payload)=>dispatch(orderListClear(payload)),
}))
class OrderList extends Component {
    componentWillMount(){
        this.props.assignOrderList();
    }
    componentWillUnmount(){
        this.props.orderListClear();
    }
    render() {

        const {data} =this.props;
        console.log(data);

        if(!data){
            return null
        }
        return <div style={{paddingBottom:100}}>
            {  data.map((item,index)=><OrderItem key={index} data={item} />)}
        </div>

    }
}
;


export default OrderList;
