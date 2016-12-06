import React, {Component} from 'react';
import {withRouter,Link} from 'react-router';
import {connect} from 'react-redux';
import {List,Flex ,Button,Modal,Tag,Result,NavBar,Card} from 'antd-mobile';
import {fetchOrderListIfNeeded} from '../actions/order'
import Order from './Order';
import ListView from './ListView';
const Item = List.Item
const Brief = Item.Brief
import Action from './Action';

const statusMap={
    '3':'进行中',
    '4':'已取消',
    '5':'进行中',
    '7':'已完成',
    '8':'已完成',
}

@connect((state, ownProps)=>({
    remoteMsg: state.order.pay.remoteMsg,
    didInvalidate: state.order.pay.didInvalidate,
    didUpdate: state.order.pay.didUpdate,
    res: state.order.pay.data,
}))
class OrderPayAction extends Action {
}


@connect((state, ownProps)=>({
    data:state.order.list.data,
    pagination:state.order.list.pagination,
    isLoading:state.order.list.isFetching,
    didUpdate:state.order.list.didUpdate,
}))
class RetreatRecordView extends ListView {

}


@withRouter
class OrderItem extends Component {

    render(){
        const  { orderNo ,createdDate,userLocation,userHouseNumber,userName,userPhone,buckets,tradeMoney,status} = this.props.data;
        return (
            <Card full>
                <Card.Header
                    title={orderNo}
                    extra={createdDate}
                />
                <Card.Body>
                    <div>地址：{userLocation+userHouseNumber+userName+userPhone}</div>
                    <div>个数：大桶{buckets[0].count}个，小桶{buckets[1].count}个</div>
                    <Flex>
                        <Flex.Item>
                            ¥{tradeMoney}
                        </Flex.Item>
                        <Flex.Item>
                            {statusMap[status]}
                        </Flex.Item>
                    </Flex>
                </Card.Body>
            </Card>
        )
    }
}


@withRouter
@connect((state, ownProps)=>({
}), (dispatch, ownProps)=>({
    fetchOrderListIfNeeded: (payload)=>dispatch(fetchOrderListIfNeeded(payload)),
}))
class OrderList  extends Component {
    render() {
        return (
            <div>
                <NavBar leftContent="返回" mode="light"  onLeftClick={() =>this.props.router.goBack() }
                >申退历史</NavBar>
                <OrderPayAction updateHandle={(component,nextProps)=>{
                    if (nextProps.res && nextProps.res.orderNo && !component.props.res) {
                        this.props.router.push({
                            pathname: `/pay/${nextProps.res.orderNo}`,
                            state: nextProps.res
                        })

                    }
                }}/>
                <RetreatRecordView pageSize={20} row={(rowData, sectionID, rowID) => {
                    return (
                        <Order key={rowID} >
                            <OrderItem data={rowData}/>
                        </Order>
                    );
                }}
                               endView={  <Result title="申退历史为空"
                                                  imgUrl="https://zos.alipayobjects.com/rmsportal/NRzOqylcxEstLGf.png"
                                                  buttonText="返回首页"
                                                  buttonType="primary"
                                                  buttonClick={()=>{
                                                      this.props.router.push('/main')
                                                  }}
                               />}
                                   renderSeparator={(sectionID, rowID) => (
                                       <div key={`${sectionID}-${rowID}`} style={{
                                           backgroundColor: '#F5F5F9',
                                           height: 8,
                                       }}
                                       />
                                   )}
                               fetchData={
                                   ({pageNum, pageSize})=> this.props.fetchOrderListIfNeeded({
                                       pageNum,
                                       pageSize,
                                       orderType:2
                                   })
                               }
                />
            </div>

        );
    }
}






export default OrderList