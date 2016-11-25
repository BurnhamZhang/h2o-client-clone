import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter,Link} from 'react-router';
import {fetchAddressIfNeeded,setAddressCache,unsetAddressCache,updateAddressById,createAddress} from '../actions/address';
import {unsetGeoCache} from '../actions/geo';
import { ActivityIndicator,NavBar ,Icon,Button,Radio,List,InputItem,WhiteSpace,WingBlank,TextareaItem,Popup,Toast} from 'antd-mobile';
import { createForm } from 'rc-form';
const Item = List.Item;
const Brief = Item.Brief;

import Action from './Action';

@connect((state, ownProps)=>({
    nextRoute: '/address',
    remoteMsg: state.address.item.remoteMsg,
    didInvalidate: state.address.item.didInvalidate,
    didUpdate: state.address.item.didUpdate,
}))
class AddressAction extends Action{

}


@withRouter
@createForm()
@connect((state, ownProps)=>({
}), (dispatch, ownProps)=>({
    setAddressCache: (payload)=>dispatch(setAddressCache(payload)),
    createAddress: (payload)=>dispatch(createAddress(payload)),
    updateAddressById: (id,payload)=>dispatch(updateAddressById(id,payload)),

}))
class AddressControl extends Component {
    constructor(props){
        super(props);
        this.state= props.data
    }
    onSubmit(){
        const type = this.props.type;
        const {sex} = this.state;
        this.props.form.validateFields((errors, values) => {
            if (errors) {
                Toast.info(errors[Object.keys(errors)[0]].errors[0].message, 1);
                return;
            }
            values.phone = values.phone.replace(/\s/g,'')
            const payload = Object.assign({},this.state,values,{sex});
            delete payload.cache;
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
        const type = this.props.type;

        const value = getFieldsValue();
        const {cache,sex,name,phone,location ,houseNumber} = this.state;
        return (
            <div>
                <AddressAction/>
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
                            initialValue:  cache?cache.name:location,
                            rules:[{
                                required:true,message:'请选择收货地址'
                            }]
                        })}
                        onFocus={()=>{
                            this.props.setAddressCache({
                                sex,
                                ...value
                            })
                            this.props.router.push('/map')
                        }}
                    >收货地址</InputItem>
                    <TextareaItem title="详细地址"
                               {...getFieldProps('houseNumber',{
                                   initialValue: cache?cache.addressComponents.streetNumber:houseNumber,
                                   rules:[{
                                       required:true,message:'请输入详细地址'
                                   }]
                               })}
                               placeholder="您所在的具体地址(门牌号等)"
                                  rows="3" count="100"
                    />
                </List>
                <WhiteSpace/>
                <WingBlank>
                    <Button  type="primary" onClick={()=>this.onSubmit()}>
                            <Icon type="plus" />
                            {type=='create'?'新建':'编辑'}收货地址</Button>
                </WingBlank>

            </div>
        );
    }
}

@connect((state, ownProps)=>({
    data:state.address.item.data,
    isFetching:state.address.item.isFetching,
    cache:state.geo.cache,
    addressCache:state.address.cache,
}), (dispatch, ownProps)=>({
    fetchAddressIfNeeded: (payload)=>dispatch(fetchAddressIfNeeded(payload)),
    unsetGeoCache: (payload)=>dispatch(unsetGeoCache(payload)),
    unsetAddressCache: ()=>dispatch(unsetAddressCache()),
}))
class AddressContainer extends Component{
    componentWillMount(){
        const {cache,addressCache,data,isFetching} = this.props;
        const id = this.props.params.id;
        if(id !='create'){
            this.props.fetchAddressIfNeeded(id)
        }
        this.combineData({cache,addressCache,data,isFetching});
    }
    componentWillReceiveProps(nextProps){
        const {cache,addressCache} = this.props;
        const {data,isFetching} = nextProps;
        this.combineData({cache,addressCache,data,isFetching});
    }
    combineData({cache,addressCache,data,isFetching}){

        const id = this.props.params.id;
        if(id !='create' && (!data || isFetching)){
            return
        }

        const state = Object.assign({
            sex:'M',
            addressComponents:cache?cache.addressComponents:{},
            geo:cache?(cache.location.lat+','+cache.location.lng):''
        },data,{...addressCache},{cache})

        console.warn('state',this.state)
        console.warn('data',data)
        console.warn('addressCache',addressCache)
        console.warn('cache',cache)

        console.warn('state',state)

        if(cache){

            this.props.unsetGeoCache();
        }
        if(addressCache){

            this.props.unsetAddressCache();
        }
        this.setState(state)
    }
    render(){
        const id = this.props.params.id;
        const data = this.state;
        return data?<AddressControl type={id} data={data} />:null
    }
}



export default AddressContainer;