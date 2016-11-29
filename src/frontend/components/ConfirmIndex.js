import React, {Component, PropTypes} from 'react';
import {Toast, List, Switch, Icon, Stepper,Result,Flex,Button} from 'antd-mobile';
import {connect} from 'react-redux';
import {getDeliveryAddress} from '../actions/address';


const Item = List.Item;
const Brief = Item.Brief;



import Action from './Action';

@connect((state, ownProps)=>({
    remoteMsg: state.order.create.remoteMsg,
    didInvalidate: state.order.create.didInvalidate,
    didUpdate: state.order.create.didUpdate,
}))
class ConfirmAction extends Action {
}



@connect((state, ownProps)=>({
    payload: state.address.delivery.data
}), (dispatch, ownProps)=>({
    getDeliveryAddress: ()=>dispatch(getDeliveryAddress())
}))
class AddressItem extends Component {
    componentWillMount() {
        const {payload, getDeliveryAddress} = this.props;
        console.warn('AddressItem', payload);
        if (!payload) {
            getDeliveryAddress();
        }
    }

    componentWillReceiveProps(nextProps) {
        if (!this.props.payload && nextProps.payload && nextProps.payload.id) {
            console.warn('componentWillReceiveProps>>>>>>>>>>>>>', nextProps)
            const {id, name, geo, houseNumber, streetId, phone, location} = nextProps.payload
            this.props.cacheUpdate({
                addressId: id,
                name,
                geo,
                location,
                houseNumber,
                streetId,
                phone
            })
        }
    }

    render() {
        const {payload} =  this.props;
        const cache = this.props.location.query.cache;
        if (this.props.data.addressId) {
            const {name, phone, houseNumber, location} =this.props.data;
            return (
                <Item thumb={<Icon type="environment"/>} multipleLine arrow="horizontal" onClick={()=> {
                    this.props.router.push({
                        pathname: `/confirm/address`,
                        query: {
                            cache,
                            address: Math.random().toString(36).substr(2)
                        }
                    })
                }
                }>
                    {name + '   ' + phone}
                    <Brief>{location + houseNumber}</Brief>
                </Item>
            )
        }
        if (payload && !payload.id) {
            return (
                <Item thumb={<Icon type="environment"/>} arrow="horizontal" onClick={()=> {
                    this.props.router.push({
                        pathname: `/address/create`,
                        query: {
                            cache,
                            address: Math.random().toString(36).substr(2)
                        }
                    })
                }
                }>
                    新建收货地址
                </Item>
            )
        }

        return null

    }
}


class ConfirmIndex extends Component {
    render() {

        const {data, cacheUpdate} = this.props;
        const cache = this.props.location.query.cache;

        const {orderDetails, bucketType, buckets, payType,showMoneyYuan,tradeMoneyYuan,bucketMoneyYuan} = this.props.data;

        const bigCount = buckets[0].count;
        const smallCount = buckets[1].count;

        if (orderDetails.length == 0) {
            return   (
                <Result
                    imgUrl="https://zos.alipayobjects.com/rmsportal/LUIUWjyMDWctQTf.png"
                    title="无选择商品"
                    message="请选择商品"
                    buttonType="primary"
                    buttonText="确认"
                    buttonClick={
                        ()=>this.props.router.push('/cart')
                    }
                />
            )
        }
        const footer = (<Flex className="confirm-footer">
            <Flex.Item>
                <div className="confirm-info">
                    <p>合计：￥{tradeMoneyYuan}</p>
                    <p>商品：￥{showMoneyYuan} 桶押金：￥{bucketMoneyYuan}</p>
                </div>
            </Flex.Item>
            <button className="submit" onClick={
                ()=> {
                    this.props.createOrder({
                        ...data
                    })
                }
            }>立即下单
            </button>
        </Flex>)

        return <div id="confirm">
            <ConfirmAction/>
            <List>
                <AddressItem {...this.props }/>
                <Item arrow="horizontal" onClick={()=> {
                    this.props.router.push({
                        pathname: '/confirm/type',
                        query: {
                            cache
                        }
                    })
                }}>
                    <div style={{float: 'right'}}>{payType == '1' ? '在线支付' : '货到付款'}</div>
                    支付方式
                    <Brief><Icon type="clock-circle-o"/>配送时间段内0.5h送达，三天内可预约</Brief>
                </Item>
                <Item arrow="horizontal" onClick={()=> {
                    this.props.router.push({
                        pathname: '/confirm/remark',
                        query: {
                            cache
                        }
                    })
                }}>
                    <div style={{float: 'right'}}>是否需要发票等</div>
                    备注
                </Item>
                <Item extra={<Switch checked={bucketType == '2'} onChange={(checked)=> {
                    cacheUpdate({
                        bucketType: checked ? '2' : '1'
                    })
                }
                }/>}
                >是否已有宾田空桶</Item>
                {
                    bucketType == '2' ? (
                        <div>
                            <Item extra={<Stepper showNumber min={1} value={bigCount * 1} onChange={ (count)=> {
                                buckets[0].count = count;
                                cacheUpdate({
                                    buckets
                                })
                            }}/>}>
                                大桶数量
                            </Item>
                            <Item extra={<Stepper showNumber min={1} value={smallCount * 1} onChange={ (count)=> {
                                buckets[1
                                    ].count = count;
                                cacheUpdate({
                                    buckets
                                })
                            }}/>}>
                                小桶数量
                            </Item>
                        </div>
                    ) : null
                }

            </List>
            {footer}

        </div>
    }
}
;


export default ConfirmIndex;
