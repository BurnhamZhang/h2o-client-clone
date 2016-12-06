import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter,Link} from 'react-router';
import {fetchAddressIfNeeded,updateAddressById,createAddress} from '../actions/address';
import {unsetGeoCache} from '../actions/geo';
import { ActivityIndicator,NavBar ,Icon,Button,Radio,List,InputItem,WhiteSpace,WingBlank,TextareaItem,Popup,Toast} from 'antd-mobile';
import { createForm } from 'rc-form';
const Item = List.Item;
const Brief = Item.Brief;

import Action from './Action';

@connect((state, ownProps)=>({
    remoteMsg: state.address.item.remoteMsg,
    didInvalidate: state.address.item.didInvalidate,
    didUpdate: state.address.item.didUpdate,
}))
class AddressAction extends Action{

}


@createForm()
@connect((state, ownProps)=>({
}), (dispatch, ownProps)=>({
    createAddress: (payload)=>dispatch(createAddress(payload)),
    updateAddressById: (id,payload)=>dispatch(updateAddressById(id,payload)),
}))
class AddressItem extends Component {
    constructor(props){
        super(props);
        this.state= props.data
    }
    onSubmit(){
        const type = this.props.params.id;
        const {sex} = this.state;
        this.props.form.validateFields((errors, values) => {
            if (errors) {
                Toast.info(errors[Object.keys(errors)[0]].errors[0].message, 1);
                return;
            }
            values.phone = values.phone.replace(/\s/g,'')
            const payload = Object.assign({},this.state,values,{sex});
            console.log('payload', payload)
            if(type =='create'){
                this.props.createAddress(payload)
            }
            else {
                this.props.updateAddressById(type,payload)
            }

        });

    }
    changeSex(sex){
        this.setState({
            sex
        })
    }
    render() {
        const { getFieldProps,getFieldsValue } = this.props.form;
        const type = this.props.params.id;

        const value = getFieldsValue();
        const {sex,name,phone,location ,houseNumber} = this.state;
        return (
            <div>
                <AddressAction     updateHandle={()=>{
                    console.log('update');
                    this.props.router.goBack();
                }}
                />

                <NavBar leftContent="返回" mode="light" onLeftClick={() =>this.props.router.goBack() }
                >{type=='create'?'新建':'编辑'}收货地址</NavBar>
                <List renderFooter={()=>'温馨提示：6层以上无电梯需要加收少量楼层搬运费'}>
                    <InputItem
                        {...getFieldProps('name',{
                            initialValue:name,
                            rules:[{
                                required:true,message:'请输入您的姓名'
                            }]
                        })}
                        placeholder="您的姓名" clear
                    >联系人</InputItem>
                    <Item>
                        <span className="am-radio-wrapper" style={{ marginLeft: 166 }} onClick={()=>this.changeSex('M')}>
                            <span className={ "am-radio "+ (sex=='M'?'am-radio-checked':'') }>
                                <span className="am-radio-inner"/>
                            </span>
                            <span>先生</span>
                        </span>
                        <span className="am-radio-wrapper" style={{ marginLeft: 100 }}  onClick={()=>this.changeSex('F')}>
                            <span className={ "am-radio "+ (sex=='F'?'am-radio-checked':'') }>
                                <span className="am-radio-inner"/>
                            </span>
                            <span>女士</span>
                        </span>
                        <Radio style={{display:'none'}}/>
                    </Item>
                    <InputItem
                        {...getFieldProps('phone',{
                            initialValue:phone,
                            rules:[{
                                required:true,message:'请输入您的手机号'
                            }]
                        })}
                        placeholder="您的手机号" type="phone" clear
                    >联系电话</InputItem>
                    <InputItem editable={false}
                        {...getFieldProps('location', {
                            initialValue:  location,
                            rules:[{
                                required:true,message:'请选择收货地址'
                            }]
                        })}
                        onFocus={()=>{
                            this.props.cacheUpdate({
                                key:this.props.location.query.address,
                                data:{
                                    ...this.state,
                                    ...value
                                }
                            })
                            this.props.router.push({
                                pathname:`/address/${type}/map`,
                                query:this.props.location.query
                            })
                        }}
                    >收货地址</InputItem>
                    <TextareaItem title="详细地址"
                               {...getFieldProps('houseNumber',{
                                   initialValue: houseNumber,
                                   rules:[{
                                       required:true,message:'请输入详细地址'
                                   }]
                               })}
                               placeholder="您所在的具体地址(门牌号等)"
                                  rows="3" count="20"
                    />
                </List>
                <WhiteSpace/>
                <WingBlank>
                    <Button  type="primary" onClick={()=>this.onSubmit()}>
                            <Icon type="plus" />
                            {type=='create'?'新建收货地址':'编辑收货地址'}</Button>
                </WingBlank>

            </div>
        );
    }
}

export default AddressItem;