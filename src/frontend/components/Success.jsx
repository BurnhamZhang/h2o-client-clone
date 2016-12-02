import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import { Result,Flex,Button,WingBlank } from 'antd-mobile';

@withRouter
class Success extends Component {

    onClick(path){
        this.props.router.push(path)
    }
    render(){

        console.log('render',this.props)
        const {orderNo,amount,payType} = Object.assign({},this.props.location.query,this.props.location.state)
        return (
                <Result title="恭喜下单成功，配送员对应处理中"
                        imgUrl="https://zos.alipayobjects.com/rmsportal/hbTlcWTgMzkBEiU.png"
                        message={
                            <div>
                                <p>订单号：{orderNo}</p>
                                <p>金额：￥{amount}</p>
                                <p>支付方式：{payType=='2'?'货到付款':'在线支付'}</p>
                                <WingBlank>
                                    <Flex>
                                        <Flex.Item>
                                            <Button type='primary' onClick={()=>{
                                                this.props.router.push('/main')
                                            }}>回到首页</Button>
                                        </Flex.Item>
                                        <Flex.Item>
                                            <Button onClick={()=>{
                                                this.props.router.push(`/order/${orderNo}`)
                                            }}>订单详情</Button>
                                        </Flex.Item>
                                    </Flex>
                                </WingBlank>

                            </div>
                        }
                />
        )
    }
}




export default Success;