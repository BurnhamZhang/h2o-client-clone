import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import { List,InputItem ,Button,WhiteSpace,WingBlank,Toast} from 'antd-mobile';
import { createForm } from 'rc-form';
import { fetchUserIfNeeded } from '../actions/user';


@createForm()
@withRouter
@connect((state, ownProps)=>({
    data:state.user.data,
}), (dispatch, ownProps)=>({
    login: (payload)=>dispatch(fetchUserIfNeeded(payload)),
}))
class Login extends Component {
    componentDidMount(){
        if(this.props.data && this.props.data.token){
            const {location} = this.props;
            if (location.state && location.state.nextPathname) {
                this.props.router.replace(location.state.nextPathname)
            } else {
                this.props.router.replace('/pending')
            }
        }


    }
    shouldComponentUpdate(nextProps) {
        console.log('shouldComponentUpdate',nextProps)
        if (nextProps.data.token) {
            const {location} = nextProps;
            if (location.state && location.state.nextPathname) {
                this.props.router.replace(location.state.nextPathname)
            } else {
                this.props.router.replace('/pending')
            }
            return false
        }
        return true
    }
    onSubmit(){
        this.props.form.validateFields((errors, values) => {
            if (errors) {
                Toast.info(errors[Object.keys(errors)[0]].errors[0].message, 1);
                return;
            }

            this.props.login({
                ...values,
                loginType:3
            })
        });
    }
    render() {
        const { getFieldProps } = this.props.form;
        return (
            <div>
                <List>
                    <InputItem  {...getFieldProps('account',{
                        rules:[{
                            required:true,message:'帐号必填'
                        }]
                    })}
                                placeholder="请输入帐号">账号</InputItem>
                    <InputItem  {...getFieldProps('password',{
                        rules:[{
                            required:true,message:'密码必填'
                        }]
                    })}
                                type="password"
                                placeholder="请输入密码">密码</InputItem>
                </List>
                <WhiteSpace/>
                <WingBlank>
                    <Button type="primary" onClick={()=>{
                        this.onSubmit();
                    }}>登录</Button>
                </WingBlank>
            </div>
        );
    }
}




export default Login;