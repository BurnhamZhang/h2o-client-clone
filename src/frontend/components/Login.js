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
        const code =this.props.location.query.code;
        console.log('code',code);
        if(this.props.data && this.props.data.token){
            const {location} = this.props;
            if (location.state && location.state.nextPathname) {
                this.props.router.replace(location.state.nextPathname)
            } else {
                this.props.router.replace('/main')
            }
            return
        }
        if(code){
            this.props.login({
                code
            })
        }

    }
    shouldComponentUpdate(nextProps) {
        console.log('shouldComponentUpdate',nextProps)
        if (nextProps.data.token) {
            const {location} = nextProps;
            if (location.state && location.state.nextPathname) {
                this.props.router.replace(location.state.nextPathname)
            } else {
                this.props.router.replace('/main')
            }
            return false
        }
        return true
    }
    render() {
        const {isFetching,didInvalidate} = this.props
        if(isFetching){
            return (
                <ActivityIndicator
                    toast
                    text="正在登录"
                    animating
                />
            );
        }

        return null

    }
}




export default Login;