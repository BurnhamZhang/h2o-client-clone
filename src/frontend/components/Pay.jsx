import React, {Component, PropTypes} from 'react';
import {Result} from 'antd-mobile';
import {withRouter} from 'react-router';


@withRouter
class Action extends Component {
    componentDidMount(){
        this.refs.form && this.refs.form.submit();
    }
    render() {

        const {jdpayUrl,orderNo,payInfo} = this.props.location.state;
        if(!jdpayUrl){
            return (
                <Result
                    imgUrl="https://zos.alipayobjects.com/rmsportal/LUIUWjyMDWctQTf.png"
                    title="不存在的订单"
                    message="生成订单错误"
                    buttonType="primary"
                    buttonText="确认"
                    buttonClick={
                        ()=>this.props.router.push('/main')
                    }
                />
            )
        }
        const inputList = []
        for(var name in payInfo){
            inputList.push(<input key={name} type="hidden" name={name} value={payInfo[name]}/>)
        }
        return (<form action={jdpayUrl} ref="form" method="POST">
            {
                inputList
            }
        </form>)
    }
}
;


export default Action;
