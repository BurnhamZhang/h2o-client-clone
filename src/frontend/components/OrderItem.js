/**
 * Created by zhangbohan on 16/11/21.
 */
import React, {Component} from 'react';
import { List,Icon ,Flex,Button,Modal ,WingBlank,WhiteSpace} from 'antd-mobile';
import {connect} from 'react-redux';
import Order from './Order';
const Item = List.Item;
const Brief = Item.Brief;

const map={
    '1':'待支付',
    '2':'进行中',
    '3':'已取消',
    '4':'已取消',
    '5':'已取消',
    '6':'进行中',
    '7':'已完成',
    '8':'已完成',
    '9':'已取消',
}

class OrderDetail extends Component {
    render(){
        const  {tradeMoney,courierName,courierPhone,userLocation,userHouseNumber,userName,userPhone,orderNo,createdDate,payType,orderDetails,status} = this.props.data;
        console.log('render',this.props)
        return (
            <div>
                <List>
                    <Item>
                        <Flex justify="center">
                            <img src="https://zos.alipayobjects.com/rmsportal/NRzOqylcxEstLGf.png" style={{height: 100, width: 100}}/>
                            <Flex.Item className="Item">
                                {map[status]}
                                {
                                    status+'' =='8' ?(<Brief>订单超过24小时自动完成</Brief>):null
                                }
                                {
                                    status+'' =='4' ?(<Brief>超过24小时未支付自动取消</Brief>):null
                                }

                            </Flex.Item>
                        </Flex>
                    </Item>
                    <Item>
                        <Flex justify="center">
                            <img src={orderDetails[0].imageUrls[0]} alt="" style={{height: 100, width: 100}}/>
                            <Flex.Item className="Item">
                                {
                                    orderDetails.map((item,index)=>(<div key={index}>
                                        <span style={{float:'right'}}>￥：{item.money}</span>
                                        {item.name+'*'+item.count}
                                    </div>))
                                }
                                <div style={{color:'red'}}>
                                    <span style={{float:'right'}}>￥：{tradeMoney}</span>
                                    实付：
                                </div>
                            </Flex.Item>
                        </Flex>
                    </Item>
                    {
                        courierName?(
                            <Item>
                                <Flex justify="center">
                                    <img alt="" style={{height: 100, width: 100}}/>
                                    <Flex.Item className="Item">
                                        配送员  {courierName}
                                        <Brief>{courierPhone}</Brief>
                                    </Flex.Item>
                                </Flex>
                            </Item>
                        ):null
                    }
                    <Item >

                        <Flex justify="center" align="center">
                            收货信息
                            <Flex.Item style={{marginLeft:20}}>
                                {userLocation+userHouseNumber}
                                <Brief>{userName+userPhone}</Brief>
                            </Flex.Item>
                        </Flex>
                    </Item>
                    <Item>
                        <div>
                            订单号：{orderNo}
                        </div>
                        <div>
                            支付方式：{payType*1==1?'线上付款':'货到付款'}
                        </div>
                        <div>
                            下单时间：{createdDate}
                        </div>
                    </Item>

                </List>
                <WhiteSpace/>
                <WingBlank>
                    <Button onClick={()=>{
                        Modal.alert('取消订单', '确定要取消此订单么?', [
                            { text: '取消' },
                            { text: '确定', onPress: () =>{
                                this.props.orderCancelConfirm(orderNo)
                            } },
                        ]);

                    }}>取消订单</Button>
                </WingBlank>


            </div>

        )
    }
}


@connect((state, ownProps)=>({
    data:state.order.item.data
}))
class OrderRequest extends Component {
    componentWillMount(){
        const id = this.props.params.id;
        this.props.fetchOrderIfNeeded(id)
    }
    render(){
        console.log('render',this.props)
        const {data} = this.props;
        if(!data){
            return null
        }
        return (
            <OrderDetail data={data} {...this.props} />
        )
    }
}



class OrderItem extends Component {
    render(){
        return (
           <Order>
               <OrderRequest {...this.props}/>
           </Order>
        )
    }
}


export default OrderItem;