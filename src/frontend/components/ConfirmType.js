import React, {Component, PropTypes} from 'react';
import {Toast, List, Switch, Icon, Stepper,Radio,DatePicker,WhiteSpace,WingBlank,Button} from 'antd-mobile';
import 'moment/locale/zh-cn';
import moment from 'moment';
const Item = List.Item;
const Brief = Item.Brief;

const RadioItem = Radio.RadioItem;




class ConfirmType extends Component {

    update(config){
        const {data, cacheUpdate} = this.props;
        const cache = this.props.location.query.cache;
        cacheUpdate({
            key: cache,
            data: {
                ...data,
                ...config
            },
        })
    }

    render() {
        const {router} = this.props;
        const cache = this.props.location.query.cache;
        const {deliveryType,payType,orderDetails} = this.props.data;
        const zhNow = moment().locale('zh-cn').utcOffset(8);
        const maxDate = moment('2018-12-03 +0800', 'YYYY-MM-DD Z').utcOffset(8);
        const minDate = moment('2015-08-06 +0800', 'YYYY-MM-DD Z').utcOffset(8);
        const maxTime = moment('22:00 +0800', 'HH:mm Z').utcOffset(8);
        const minTime = moment('00:30 +0800', 'HH:mm Z').utcOffset(8);

        return <div>
            <List  renderHeader={() => '支付方式'}>
                <Item>

                </Item>
                <Item>
                       <span className="am-radio-wrapper" style={{ marginLeft: 10 }} onClick={()=>  {this.update({
                           payType:  '1'
                       })}}>
                            <span className={ "am-radio "+ (payType=='1'?'am-radio-checked':'') }>
                                <span className="am-radio-inner"/>
                            </span>
                            <span>在线支付</span>
                        </span>
                    <span className="am-radio-wrapper" style={{ marginLeft: 100 }}  onClick={()=>{
                        this.update({
                            payType:  '2'
                        })
                    }}>
                            <span className={ "am-radio "+ (payType=='2'?'am-radio-checked':'') }>
                                <span className="am-radio-inner"/>
                            </span>
                            <span>货到付款</span>
                        </span>
                    <Radio style={{display:'none'}}/>
                </Item>
            </List>
            <List  renderHeader={() => '送货时间'}>
                <RadioItem name='deliveryType' checked={deliveryType=='1'} onChange={({target:{checked}})=>{
                    this.update({
                        deliveryType: checked ? '1' : '2'
                    })
                }}>
                    即时送 <span>(半小时内到达)</span>
                </RadioItem>
                {
                    deliveryType=='2'?(
                        <DatePicker className="forss"
                                    mode="datetime"
                                    onChange={()=>{
                                        this.update({
                                            deliveryType: checked ? '2' : '1'
                                        })
                                    }}
                                    disabled
                                    value={zhNow}
                        >
                            <List.Item arrow="horizontal">日期+时间</List.Item>
                        </DatePicker>
                    ):null
                }

            </List>
            <WhiteSpace/>
            <WingBlank>
                <Button  type="primary" onClick={()=>{
                    router.goBack();
                }}>
                    确认</Button>
            </WingBlank>

        </div>
    }
}
;


export default ConfirmType;
