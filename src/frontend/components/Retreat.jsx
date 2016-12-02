import React, {Component, PropTypes} from 'react';
import {Toast, List, Switch, Icon, Stepper,Result,Flex,Button,NavBar,WingBlank,WhiteSpace} from 'antd-mobile';
import {connect} from 'react-redux';
import {getBucketAddress} from '../actions/address';
import {getBucketRecord} from '../actions/bucket';
import {cacheUpdate} from '../actions/cache';
import {orderBucket} from '../actions/order';
import {withRouter,Link} from 'react-router';
import Shop from './Shop';

const Item = List.Item;
const Brief = Item.Brief;


import Action from './Action';

@connect((state, ownProps)=>({
    remoteMsg: state.order.bucket.remoteMsg,
    didInvalidate: state.order.bucket.didInvalidate,
    didUpdate: state.order.bucket.didUpdate,
    nextRoute:'/user'
}))
class BucketAction extends Action {
}


@withRouter
@connect((state, ownProps)=>({
}), (dispatch, ownProps)=>({
    cacheUpdate: (data)=>dispatch(cacheUpdate(data)),
    orderBucket: (data)=>dispatch(orderBucket(data)),
}))
class RetreatContent extends Component {
    cacheUpdate(data){
        console.log(this.props)
        this.props.cacheUpdate({
            key: this.props.cache,
            data
        })
    }
    render() {

        const {
            addressId,
            name,
            phone,
            houseNumber,
            location,
            showMoneyYuan,
            buckets
        } = this.props.data;

        const {
            bigCount,
            littleCount
        } = this.props.bucket;



        return <div >
            <BucketAction/>
            <NavBar leftContent="返回"
                    rightContent={<span onClick={()=>{
                      this.props.router.push('/retreat/record')
                    }
                    }>申退历史</span>}
                    mode="light" onLeftClick={() =>this.props.router.goBack() }
            >押金申退</NavBar>
            {
                bigCount==0 && littleCount==0?(
                    <Result
                        imgUrl="https://zos.alipayobjects.com/rmsportal/LUIUWjyMDWctQTf.png"
                        title="没有可申退的桶"
                    />
                ):(
                    <div>
                    <List>
                        {
                            addressId?(
                                <Item thumb={<Icon type="environment"/>} multipleLine arrow="horizontal" onClick={()=> {
                                    this.props.router.push({
                                        pathname: `/confirm/address`,
                                        query: {
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
                                            address: Math.random().toString(36).substr(2)
                                        }
                                    })
                                }
                                }>
                                    新建收货地址
                                </Item>
                            )
                        }
                        {
                            bigCount*1>0?(
                                <Item extra={<Stepper showNumber min={0} max={bigCount*1}  onChange={ (count)=> {
                                    buckets[0
                                        ].count = count;
                                    this.cacheUpdate({
                                        buckets
                                    })
                                }}/>}>
                                    大桶数量
                                </Item>
                            ):null
                        }
                        {
                            littleCount*1>0?(
                                <Item extra={<Stepper showNumber min={0} max={littleCount*1}  onChange={ (count)=> {
                                    buckets[1
                                        ].count = count;
                                    this.cacheUpdate({
                                        buckets
                                    })
                                }}/>}>
                                    小桶数量
                                </Item>
                            ):null
                        }
                        <Item>
                            <span style={{float:'right'}}>￥：{showMoneyYuan}</span>
                            价格
                        </Item>
                    </List>
                        <WhiteSpace/>
                        <WingBlank>
                            <Button type="primary" onClick={()=>{
                                if(this.props.showMoneyYuan*1!=0){
                                    this.props.orderBucket(this.props.data)
                                }
                            }}>提交</Button>
                        </WingBlank>
                    </div>
                )
            }
        </div>
    }
}
;



@connect((state, ownProps)=> {
    const {id, name, geo, houseNumber, streetId, phone, location} = state.address.bucket.data || {}
    const data = Object.assign({
        shopId: Array.isArray(state.shop.data) ? state.shop.data[0] : null,
        buckets: [                             // 空桶信息，非必填
            {
                scale: "18.9L",          // 规格，必填
                priceYuan: "35",      // 单价，必填
                count:0
            },
            {
                scale: "11.3L",
                priceYuan: "30",      // 单价，必填
                count:0
            }
        ],

    }, id ? {
        addressId: id,
        name,
        geo,
        location,
        houseNumber,
        streetId,
        phone
    } : null, state.cache[ownProps.location.query.cache])

    const showMoneyYuan = data.buckets.reduce((value, item)=>value + item.count * item.priceYuan, 0).toFixed(2);

    return {
        data: {
            ...data,
            showMoneyYuan
        },
        bucket:state.bucket.data,
    }
}, (dispatch, ownProps)=>({
    getBucketAddress: ()=>dispatch(getBucketAddress()),
    getBucketRecord: ()=>dispatch(getBucketRecord()),
}))
class RetreatContorl extends Component {
    componentWillMount() {
        if(!this.props.cache){
            this.props.getBucketAddress();
            this.props.getBucketRecord({
                shopId:this.props.data.shopId
            });
        }
    }

    render() {
        const {data,bucket} = this.props;

        if(!data ||!bucket){
            return null
        }

        return (
            <RetreatContent data={data} bucket={bucket}  cache={this.props.location.query.cache} />
        )
    }
}


class Retreat extends Component {
    render(){
        return <Shop>
            <RetreatContorl  {...this.props}/>
        </Shop>
    }
}


export default Retreat;
