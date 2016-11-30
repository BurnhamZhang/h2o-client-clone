import React, {Component , PropTypes } from 'react';
import { Toast } from 'antd-mobile';
import {withRouter} from 'react-router';



@withRouter
class Action extends Component {

    static defaultProps = {
        nextRoute:'',
        remoteMsg:'',
        didInvalidate:false,
        didUpdate:false,
    }
    static propTypes = {
        nextRoute: PropTypes.string,
        didInvalidate:PropTypes.bool,
        remoteMsg:PropTypes.string,
    }

    componentWillReceiveProps(nextProps){
        const  {didInvalidate,remoteMsg,didUpdate,router,nextRoute,updateHandle} = nextProps;

        if (didUpdate && didUpdate!=this.props.didUpdate  && typeof updateHandle =='function') {
            updateHandle(this)
            return false
        }

        if(didUpdate!=this.props.didUpdate || nextRoute!=this.props.nextRoute){
            if (didUpdate && nextRoute) {
                Toast.info('操作成功！',2);
                window.setTimeout(()=>{
                    console.warn('router>>>>>>>>>>>>',nextRoute);
                    router.push(nextRoute)
                },2000)
                return false
            }
        }
        if(didInvalidate!=this.props.didInvalidate || remoteMsg!=this.props.remoteMsg){
            if(didInvalidate && remoteMsg){
                Toast.info(remoteMsg)
            }
        }

    }

    render() {
     return  <div>
         {this.props.children||null}
     </div>
    }
}
;


export default Action;
