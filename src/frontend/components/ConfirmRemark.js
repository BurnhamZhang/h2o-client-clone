import React, {Component, PropTypes} from 'react';
import {Toast, List, Switch, Icon, Stepper,Radio,DatePicker,WhiteSpace,WingBlank,Button,TextareaItem} from 'antd-mobile';
import { createForm } from 'rc-form';
const Item = List.Item;
const Brief = Item.Brief;

const RadioItem = Radio.RadioItem;



@createForm()
class ConfirmRemark extends Component {

    constructor(props){
        super(props);
        const {invoiceType,memo} = props.data;
        this.state ={invoiceType,memo};
    }
    onSubmit(){
        const {router,cacheUpdate} = this.props;
        this.props.form.validateFields((errors, values) => {
            if (errors) {
                Toast.info('请输入发票抬头')
                return;
            }

            const {invoiceType,memo} = values;
            cacheUpdate({
                invoiceType:invoiceType?'2':'1',
                 memo
            })
            router.goBack();

        });
    }

    render() {
        const { getFieldProps ,getFieldValue} = this.props.form;

        const {invoiceType,memo} = this.state;


        return <div>
            <List  renderHeader={() => '快速备注'}>
                <Item
                    extra={<Switch  {...getFieldProps('invoiceType',{
                        initialValue:invoiceType=='2',
                        valuePropName:'checked'
                    })}
                    />}
                >需要发票</Item>
                (
                    <TextareaItem title="其他备注"
                                  placeholder="请输入发票抬头或您的其余需求~"
                                  rows="3" count="50"
                                  {...getFieldProps('memo',{
                                      initialValue:memo,
                                      rules: [
                                          { required: getFieldValue('invoiceType')=='2' },
                                      ],
                                  })}
                    />
                )

            </List>
            <WhiteSpace/>
            <WingBlank>
                <Button  type="primary" onClick={()=>{
                    this.onSubmit()
                }}>
                   提交</Button>
            </WingBlank>


        </div>
    }
}
;


export default ConfirmRemark;
