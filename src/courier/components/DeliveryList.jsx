import React, {Component, PropTypes} from 'react';
import {Result} from 'antd-mobile';
import {withRouter} from 'react-router';
import ListView from './ListView';
import {clearDeliveryList,getDeliveryList} from '../actions/delivery';
import DeliveryItem from './DeliveryItem';
import {connect} from 'react-redux';
import Action from './Action';

@connect((state, ownProps)=>({
    remoteMsg: state.delivery.item.remoteMsg,
    didInvalidate: state.delivery.item.didInvalidate,
    didUpdate: state.delivery.item.didUpdate,
}))
class DeliveryItemAction extends Action {
}

@connect((state, ownProps)=>({
    data: state.delivery.list.data,
    pagination: state.delivery.list.pagination,
    isLoading: state.delivery.list.isFetching,
    didUpdate: state.delivery.list.didUpdate,
}))
class DeliveryListView extends ListView {

}


@withRouter
@connect((state, ownProps)=>({
}), (dispatch, ownProps)=>({
    getDeliveryList: (payload)=>dispatch(getDeliveryList(payload)),
    clearDeliveryList: (payload)=>dispatch(clearDeliveryList(payload)),
}))
class DeliveryList extends Component {
    componentWillMount(){
    //     this.props.getDeliveryList(this.props.params);
    }
    componentWillUnmount(){
        this.props.clearDeliveryList();
    }
    render() {
        return   <div style={{paddingBottom:100}} className="order-list">
            <DeliveryItemAction updateHandle={()=>{
                this.props.getDeliveryList({
                    pageNum:1,
                    pageSize:20,
                    ...this.props.params
                })
            }
            }/>
            <DeliveryListView ref='list' pageSize={20} row={(rowData, sectionID, rowID) => <DeliveryItem data={rowData}/>}
                           endView={ <Result title="空"
                                             imgUrl="https://zos.alipayobjects.com/rmsportal/NRzOqylcxEstLGf.png"

                           />}
                           fetchData={
                               ({pageNum, pageSize})=> this.props.getDeliveryList({
                                   pageNum,
                                   pageSize,
                                   ...this.props.params
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


export default DeliveryList;
