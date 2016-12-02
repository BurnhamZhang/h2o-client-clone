import React, {Component, PropTypes} from 'react';
import {Toast, List, Switch, Icon, Stepper, Radio, DatePicker, WhiteSpace, WingBlank, Button} from 'antd-mobile';
import 'moment/locale/zh-cn';
import {connect} from 'react-redux';
import moment from 'moment';
import {createForm} from 'rc-form';
const Item = List.Item;
const Brief = Item.Brief;

const RadioItem = Radio.RadioItem;


class MyRadio extends Component {
    constructor(props){
        super(props);
        let {checked, defaultChecked} = this.props;
        if(checked ===undefined){
            checked = defaultChecked
        }
        this.state = {
            checked
        }
    }
    componentWillReceiveProps({checked}){
        this.setState({
            checked
        })
    }
    render() {
        const { onChange ,style} = this.props;
        const { checked} = this.state;
        return (
            <span className="am-radio-wrapper" style={style}  onClick={()=> {
                onChange && onChange(true)
            }}>
                            <span className={ "am-radio " + (checked ? 'am-radio-checked' : '') }>
                                <span className="am-radio-inner"/>
                            </span>
                            <span>{this.props.children}</span>
                        </span>
        )
    }
}

@createForm()
class ConfirmType extends Component {


    render() {
        const {getFieldProps, getFieldValue} = this.props.form;
        const {router, cacheUpdate, type} = this.props;
        const {deliveryType, payType, orderDetails} = this.props.data;
        const minDate = moment().locale('zh-cn').utcOffset(8);
        const maxDate = moment().locale('zh-cn').utcOffset(8).add(2, 'days');
        const maxTime = moment(type.deliveryEnd, 'HH:mm:ss').utcOffset(8);
        const minTime = moment(type.deliveryStart, 'HH:mm:ss').utcOffset(8);
        const appointStart = moment(this.props.data.appointStart ? this.props.data.appointStart.split(' ')[1] : type.deliveryStart, 'HH:mm:ss').utcOffset(8);
        const appointEnd = moment(this.props.data.appointEnd ? this.props.data.appointEnd.split(' ')[1] : type.deliveryEnd, 'HH:mm:ss').utcOffset(8);

        getFieldProps('deliveryType', {
            initialValue: deliveryType,
        });
        getFieldProps('payType', {
            initialValue: payType,
        });
        return <div>
            <List renderHeader={() => '支付方式'}>
                <Item>
                    {
                        orderDetails.map((item,index)=>(<img key={index} src={item.imagesArray[0]} style={{width:100,height:100,margin:'10px 10px 0 0'}} alt=""/>))
                    }
                </Item>
                <Item>
                    <MyRadio style={{marginLeft: 10}}  {...getFieldProps('payType.1', {
                        valuePropName: 'checked',
                        exclusive: true,
                        getValueFromEvent: (checked)=> {
                            return checked ? '1' : ''
                        },
                        getValueProps: (value)=> {
                            return {
                                checked: value === '1',
                            }
                        },
                    })}>
                        在线支付
                    </MyRadio>
                    <MyRadio  style={{marginLeft: 100}} {...getFieldProps('payType.2', {
                        valuePropName: 'checked',
                        exclusive: true,
                        getValueFromEvent: (checked)=> {
                            return checked ? '2' : ''
                        },
                        getValueProps: (value)=> {
                            return {
                                checked: value === '2',
                            }
                        },
                    })}>
                        货到付款
                    </MyRadio>
                    <Radio style={{display: 'none'}}/>
                </Item>
            </List>
            <List renderHeader={() => '送货时间'}>
                {
                    type.allow=='1'?(
                        <RadioItem name='deliveryType'
                                   {...getFieldProps('deliveryType.1', {
                                       valuePropName: 'checked',
                                       exclusive: true,
                                       getValueFromEvent: ({target:{checked}})=> {
                                           return checked ? '1' : ''
                                       },
                                       getValueProps: (value)=> {
                                           return {
                                               checked: value === '1',
                                           }
                                       },
                                   })}>
                            即时送 <span className="am-list-brief">(半小时内到达)</span>
                        </RadioItem>
                    ):null
                }
                <RadioItem name='deliveryType'
                           {...getFieldProps('deliveryType.2', {
                               valuePropName: 'checked',
                               exclusive: true,
                               getValueFromEvent: ({target:{checked}})=> {
                                   return checked ? '2' : ''
                               },
                               getValueProps: (value)=> {
                                   return {
                                       checked: value === '2',
                                   }
                               },
                           })}
                >
                    预约选择 <span className="am-list-brief">每日({type.deliveryStart + '-' + type.deliveryEnd})</span>
                </RadioItem>
                {
                    getFieldValue('deliveryType') == '2' ? (
                        <div>
                            <DatePicker
                                mode="date"
                                title="选择日期"
                                extra="可选,小于结束日期"
                                {...getFieldProps('date', {
                                    initialValue: minDate,
                                })}
                                minDate={minDate}
                                maxDate={maxDate}
                            >
                                <List.Item arrow="horizontal">配送日期</List.Item>
                            </DatePicker>
                            <DatePicker mode="time"
                                        {...getFieldProps('appointStart', {
                                            initialValue: appointStart,
                                        })}
                                        minDate={minTime}
                                        maxDate={getFieldValue('appointEnd') || maxTime}

                            >
                                <List.Item arrow="horizontal">开始时间</List.Item>
                            </DatePicker>
                            <DatePicker
                                mode="time"
                                {...getFieldProps('appointEnd', {
                                    initialValue: appointEnd,
                                })}
                                minDate={getFieldValue('appointStart') || minTime}
                                maxDate={maxTime}
                            >
                                <List.Item arrow="horizontal">结束时间</List.Item>
                            </DatePicker>
                        </div>
                    ) : null
                }

            </List>
            <WhiteSpace/>
            <WingBlank>
                <Button type="primary" onClick={()=> {
                    this.props.form.validateFields((errors, values) => {
                        if (errors) {
                            console.log('Errors in form!!!');
                            return;
                        }
                        cacheUpdate(Object.assign({

                            deliveryType: values.deliveryType,
                            payType:values.payType,
                        },values.date?{
                            appointEnd: values.date.format('YYYY-MM-DD ') + values.appointEnd.format('HH:mm:ss'),
                            appointStart: values.date.format('YYYY-MM-DD ') + values.appointStart.format('HH:mm:ss'),
                        }:null))
                        router.goBack();

                    });
                }}>
                    确认</Button>
            </WingBlank>

        </div>
    }
}
;



export default ConfirmType;
