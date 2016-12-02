import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import {fetchUserIfNeeded,receiveUser} from '../actions/user';
import { ActivityIndicator } from 'antd-mobile';

@connect((state, ownProps)=>({
    ...state.user
}), (dispatch, ownProps)=>({
    login: (payload)=>dispatch(fetchUserIfNeeded(payload)),
    receiveUser: (payload)=>dispatch(receiveUser(payload))
}))
@withRouter
class Login extends Component {
    componentDidMount(){
        if(process.env.NODE_ENV === 'production' ||true){
            this.props.receiveUser({
                data:{
                    account:'15682553619',
                    token:'U6JD3B2TWLHOEPGBHC3RCBQRLMUSJX6Y5MVM2DZ6J3QWMUVCJL3ELUN4BO3QWHXIJJA2HDOXDBFREZ5OJOOTODZIGGO4VDGKC4HFYT7WT2YIHC5L3OGE3FV6G6T4BDEVQEZ6KUG6SFEA4U4UQJ7AY4QLWM'
                }
            })
        }
        else {
            this.props.login({
                loginType:4,
                account:'15682553619'
            })
        }

    }
    shouldComponentUpdate(nextProps) {
        console.log('shouldComponentUpdate',nextProps)
        if (nextProps.data.account) {
            const {location} = nextProps;
            if (location.state && location.state.nextPathname) {
                this.props.router.replace(location.state.nextPathname)
            } else {
                this.props.router.replace('/manage')
            }
            return false
        }
        return true
    }
    render() {
        return (
            <ActivityIndicator
                toast
                text="正在登录"
                animating
            />
        );
    }
}




export default Login;