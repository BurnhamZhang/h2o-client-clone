import React, {Component, PropTypes} from 'react';
import {Toast, List, Switch, Icon, Stepper,Radio,DatePicker,WhiteSpace,WingBlank,Button,TextareaItem} from 'antd-mobile';
const Item = List.Item;
const Brief = Item.Brief;

const RadioItem = Radio.RadioItem;




class ConfirmRemark extends Component {

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
    onSubmit(){

    }

    render() {
        const {router} = this.props;
        const {invoiceType,memo} = this.props.data;


        return <div>
            <List  renderHeader={() => '快速备注'}>
                <Item
                    extra={<Switch
                        checked={invoiceType=='2'}
                        onChange={(checked)=>{
                            this.update({
                                invoiceType:checked?'2':'1'
                            })
                        }
                        }
                    />}
                >需要发票</Item>
                {invoiceType=='2'?(
                    <TextareaItem title="其他备注" value={memo}
                                  placeholder="请输入发票抬头或您的其余需求~"
                                  rows="3" count="50"
                                  onChange={(memo)=>{
                                      this.update({
                                          memo
                                      })
                                  }
                                  }
                    />
                ):null}

            </List>
            <WhiteSpace/>
            <WingBlank>
                <Button  type="primary" onClick={()=>{
                    router.goBack();
                }}>
                   提交</Button>
            </WingBlank>


        </div>
    }
}
;


export default ConfirmRemark;
