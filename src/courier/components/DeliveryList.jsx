import React, {Component, PropTypes} from 'react';
import {List} from 'antd-mobile';
import {withRouter} from 'react-router';
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



@withRouter
@connect((state, ownProps)=>({
    data:state.delivery.list.data,
}), (dispatch, ownProps)=>({
    getDeliveryList: (payload)=>dispatch(getDeliveryList(payload)),
    clearDeliveryList: (payload)=>dispatch(clearDeliveryList(payload)),
}))
class DeliveryList extends Component {
    componentWillMount(){
        this.props.getDeliveryList(this.props.params);
    }
    componentWillUnmount(){
        this.props.clearDeliveryList();
    }
    render() {

        const {data} =this.props;
        console.log(data);

        if(!data){
            return null
        }
        return   <div style={{paddingBottom:100}}>
            <DeliveryItemAction updateHandle={()=>{
                this.props.getDeliveryList(this.props.params);
            }
            }/>
            {
                data.map((item,index)=><DeliveryItem key={index} data={item} />)
            }
        </div>
    }
}
;


export default DeliveryList;
