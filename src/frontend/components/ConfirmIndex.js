import React, {Component, PropTypes} from 'react';
import {Toast, List, Switch, Icon, Stepper,Result,Flex,Button} from 'antd-mobile';
import {connect} from 'react-redux';


const Item = List.Item;
const Brief = Item.Brief;



class ConfirmIndex extends Component {
    render() {

        const {data, cacheUpdate} = this.props;
        const cache = this.props.location.query.cache;

        const {addressId,name, phone, houseNumber, location,orderDetails, bucketType, buckets, payType,showMoneyYuan,tradeMoneyYuan,bucketMoneyYuan} = this.props.data;

        const bigCount = buckets[0].count;
        const smallCount = buckets[1].count;


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
            <List>
                {
                    addressId?(
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
                    ):(
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
