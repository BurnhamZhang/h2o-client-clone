import React, {Component , PropTypes } from 'react';
import { message } from 'antd';
import {withRouter} from 'react-router';



@withRouter
class Action extends Component {

    static defaultProps = {
        nextRoute:'/',
        remoteMsg:'',
        didInvalidate:false,
        didUpdate:false,
    }
    static propTypes = {
        nextRoute: PropTypes.string,
        didInvalidate:PropTypes.bool,
        remoteMsg:PropTypes.string,
    }

    componentDidUpdate(){
        const  {didInvalidate,remoteMsg,didUpdate,router,nextRoute} = this.props;


        if (didUpdate) {
             router.push(nextRoute)
            return false
        }
        if(didInvalidate && remoteMsg){
            message.warn(remoteMsg)
        }
    }

    render() {
     return  <div/>
    }
}
;


export default Action;
