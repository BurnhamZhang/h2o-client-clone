import React, {Component, PropTypes} from 'react';
import {Toast, List, Switch, Icon, Stepper} from 'antd-mobile';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import {fetchAddressListIfNeeded} from '../actions/address';
import {cacheUpdate} from '../actions/cache';

const Item = List.Item;
const Brief = Item.Brief;



@connect((state, ownProps)=>({
    list: state.address.list.data
}))
class AddressItem extends Component {
    componentWillMount() {
        const {payload, data, fetchAddressListIfNeeded} = this.props;
        if (!payload && !data) {
            fetchAddressListIfNeeded();
        }
    }

    render() {
        const {list} =  this.props;
        const cache = this.props.location.query.cache;
        if (!list) {
            return null
        }
        if (Array.isArray(list) && list.length == 0) {
            return (
                <Item thumb={<Icon type="environment"/>} arrow="horizontal" onClick={()=> {
                    this.props.router.push({
                        pathname:`/confirm/address/create`,
                        query:{
                            cache
                        }
                    })
                }
                }>
                    新建收货地址
                </Item>
            )
        }
        return (
            <Item thumb={<Icon type="environment"/>} multipleLine arrow="horizontal" onClick={()=> {
                this.props.router.push(`/confirm/address`)
            }
            }>
                白先生 184****1555
                <Brief>成都丰德万瑞中心A座23楼</Brief>
            </Item>
        )
    }
}



class ConfirmIndex extends Component {


    render() {

        console.warn('render>>>>>',this.props);
        const {data, cacheUpdate} = this.props;
        const cache = this.props.location.query.cache;

        const {addressId, name, geo, location, houseNumber, streetId, phone, bucketType, buckets,payType} = this.props.data;

        const bigCount = buckets[0].count;
        const smallCount = buckets[1].count;

        console.warn('>>>>', addressId ? {addressId, name, geo, location, houseNumber, streetId, phone} : null)
        return <div>
            <List>
                <AddressItem {...this.props }/>
                <Item arrow="horizontal" onClick={()=>{
                    this.props.router.push({
                        pathname:'/confirm/type',
                        query:{
                            cache
                        }
                    })
                }}>
                    <div style={{float: 'right'}}>{payType=='1'?'在线支付':'货到付款'}</div>
                    支付方式
                    <Brief><Icon type="clock-circle-o"/>配送时间段内0.5h送达，三天内可预约</Brief>
                </Item>
                <Item arrow="horizontal" onClick={()=>{
                    this.props.router.push({
                        pathname:'/confirm/remark',
                        query:{
                            cache
                        }
                    })
                }}>
                    <div style={{float: 'right'}}>是否需要发票等</div>
                    备注
                </Item>
                <Item extra={<Switch checked={bucketType == '2'} onChange={(checked)=> {
                    cacheUpdate({
                        key: cache,
                        data: {
                            ...data,
                            bucketType: checked ? '2' : '1'
                        },
                    })
                }
                }/>}
                >是否已有宾田空桶</Item>
                {
                    bucketType == '2' ? (
                        <div>
                            <Item extra={<Stepper showNumber min={1} value={bigCount * 1} onChange={ (count)=> {
                                buckets[0].count= count;
                                cacheUpdate({
                                    key: cache,
                                    data: {
                                        ...data,
                                        buckets
                                    }
                                })
                            }}/>}>
                                大桶数量
                            </Item>
                            <Item extra={<Stepper showNumber min={1} value={smallCount * 1} onChange={ (count)=> {
                                buckets[1
                                    ].count= count;
                                cacheUpdate({
                                    key: cache,
                                    data: {
                                        ...data,
                                        buckets
                                    }
                                })
                            }}/>}>
                                小桶数量
                            </Item>
                        </div>
                    ) : null
                }

            </List>

        </div>
    }
}
;


export default ConfirmIndex;
