import React, {Component, PropTypes} from 'react';
import {Toast, List, Switch, Icon, Stepper,Result,Flex,Button} from 'antd-mobile';
import {connect} from 'react-redux';


const Item = List.Item;
const Brief = Item.Brief;



class ConfirmIndex extends Component {
    render() {

        const {data, cacheUpdate} = this.props;
        const cacheId = this.props.location.state.cacheId;

        const {addressId,name, phone, houseNumber, location,orderDetails, bucketType, buckets, payType,showMoneyYuan,tradeMoneyYuan,bucketMoneyYuan} = this.props.data;

        console.warn('ConfirmIndex',this.props.data);
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
                                pathname: `/address`,
                                state: {
                                    cacheId,
                                    choose:true,
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
                                state: {
                                    cacheId,
                                }
                            })
                        }
                        }>
                            新建收货地址
                        </Item>
                    )
                }
                <Item>
                    <Flex justify="center">
                        <img src={orderDetails[0].imagesArray[0]} alt="" style={{height: 100, width: 100}}/>
                        <Flex.Item className="Item">
                            {orderDetails[0].name + orderDetails[0].memo}
                            <List.Item.Brief>￥：{orderDetails[0].priceYuan +'*'+orderDetails[0].count}</List.Item.Brief>
                        </Flex.Item>
                    </Flex>
                </Item>
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
                {
                    buckets[0].max >0 ||  buckets[1].max >0?(
                        <div>
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
                                        {
                                            buckets[0].max>0?(
                                                <Item extra={<Stepper showNumber min={0} max={buckets[0].max} value={buckets[0].count} onChange={ (count)=> {
                                                    buckets[0].count = count;
                                                    cacheUpdate({
                                                        buckets
                                                    })
                                                }}/>}>
                                                    大桶数量
                                                </Item>
                                            ):null
                                        }
                                        {
                                            buckets[1].max>0?(
                                                <Item extra={<Stepper showNumber min={0}  max={buckets[1].max} value={buckets[1].count} onChange={ (count)=> {
                                                    buckets[1
                                                        ].count = count;
                                                    cacheUpdate({
                                                        buckets
                                                    })
                                                }}/>}>
                                                    小桶数量
                                                </Item>
                                            ):null
                                        }
                                    </div>
                                ) : null
                            }
                        </div>
                    ):null
                }
            </List>
            {footer}

        </div>
    }
}
;


export default ConfirmIndex;
