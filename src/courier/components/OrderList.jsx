import React, {Component, PropTypes} from 'react';
import {Result} from 'antd-mobile';
import ListView from './ListView';
import {withRouter} from 'react-router';
import {assignOrderList,orderListClear} from '../actions/order';
import OrderItem from './OrderItem';
import {connect} from 'react-redux';
import Action from './Action';

@connect((state, ownProps)=>({
    remoteMsg: state.order.delivery.remoteMsg,
    didInvalidate: state.order.delivery.didInvalidate,
    didUpdate: state.order.delivery.didUpdate,
}))
class OrderAction extends Action {
}


@connect((state, ownProps)=>({
    data: state.order.list.data,
    pagination: state.order.list.pagination,
    isLoading: state.order.list.isFetching,
    didUpdate: state.order.list.didUpdate,
}))
class OrderListView extends ListView {

}


@withRouter
@connect((state, ownProps)=>({
    data:state.order.list.data,
}), (dispatch, ownProps)=>({
    assignOrderList: (payload)=>dispatch(assignOrderList(payload)),
    orderListClear: (payload)=>dispatch(orderListClear(payload)),
}))
class OrderList extends Component {
    componentWillMount(){
        // this.props.assignOrderList();
    }
    componentWillUnmount(){
        this.props.orderListClear();
    }
    render() {

        return <div style={{paddingBottom:100}}>
            <OrderAction updateHandle={()=>{
                this.props.assignOrderList({
                    pageNum:0,
                    pageSize:20
                })
            }}/>
            <OrderListView ref='list' pageSize={20} row={(rowData, sectionID, rowID) => <OrderItem data={rowData}/>}
                           endView={ <Result title="空"
                                             imgUrl="https://zos.alipayobjects.com/rmsportal/NRzOqylcxEstLGf.png"
                           />}
                           fetchData={
                               ({pageNum, pageSize})=> this.props.assignOrderList({
                                   pageNum,
                                   pageSize
                               })
                           }
                           renderSeparator={(sectionID, rowID) => (
                               <div key={`${sectionID}-${rowID}`} style={{
                                   backgroundColor: '#F5F5F9',
                                   height: 8,
                               }}
                               />
                           )}
                           style={{height:document.documentElement.clientHeight-185}}
                           refresh
            />
        </div>

    }
}
;


export default OrderList;
