import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import {fetchUserIfNeeded} from '../actions/user';
import { ActivityIndicator } from 'antd-mobile';


@connect((state, ownProps)=>({
    ...state.user
}), (dispatch, ownProps)=>({
    login: (payload)=>dispatch(fetchUserIfNeeded(payload))
}))
@withRouter
class Login extends Component {
    componentDidMount(){
        this.props.login({
            loginType:4,
            account:'15682553619'
        })
    }
    shouldComponentUpdate(nextProps) {
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