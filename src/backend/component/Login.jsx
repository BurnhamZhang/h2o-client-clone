import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Button, Form, Input, Row, Col, Spin, Icon, Checkbox} from 'antd';
import {withRouter, Link} from 'react-router';
import {fetchUserIfNeeded} from '../actions/user';
const createForm = Form.create;
const FormItem = Form.Item;


@connect((state, ownProps)=>({
    ...state.user
}), (dispatch, ownProps)=>({
    login: (payload)=>dispatch(fetchUserIfNeeded(payload))
}))
@createForm()
@withRouter
class Login extends Component {
    constructor(props) {
        super(props);
        this.handleReset = this.handleReset.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.shouldComponentUpdate = this.shouldComponentUpdate.bind(this);
    }

    handleReset(e) {
        e.preventDefault();
        this.props.form.resetFields();
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.form.validateFields((errors, values) => {
            if (errors) {
                console.log('Errors in form!!!');
                return;
            }
            console.log('Submit!!!');
            values.loginType = values.loginType ? 1 : 2;
            console.log(values);
            this.props.login(values);
        });
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
        const {getFieldDecorator, getFieldError} = this.props.form;
        const {isFetching,remoteMsg} = this.props;


        const formItemLayout = {
            wrapperCol: {span: 12, offset: 6},
        };
        const help = remoteMsg||(getFieldError('account') || []).join(', ');

        const form = (
            <Form horizontal onSubmit={this.handleSubmit}>
                <FormItem   {...formItemLayout} hasFeedback help={help} validateStatus={help?'error':null} >
                    {getFieldDecorator('account', {
                        rules: [
                            {required: true, min: 2, message: '请至少输入两个字符'},
                        ],
                    })(
                        <Input addonBefore={<Icon type="user"/>} placeholder="用户名"/>
                    )}
                </FormItem>


                <FormItem   {...formItemLayout} hasFeedback>
                    {getFieldDecorator('password', {
                        rules: [
                            {required: true, whitespace: true, message: '请输入您的密码'},
                        ],
                    })(
                        <Input addonBefore={<Icon type="lock"/>} placeholder="密码" type="password" autoComplete="off"/>
                    )}
                </FormItem>


                <FormItem  {...formItemLayout}>
                    {getFieldDecorator('loginType', {
                        valuePropName: 'checked',
                        initialValue: false,
                    })(
                        <Checkbox>企业号登录</Checkbox>
                    )}
                    <a onClick={this.handleReset} style={{float: 'right'}}>重置</a>
                    <Button type="primary" htmlType="submit" style={{width: '100%'}}>登录</Button>
                </FormItem>
            </Form>
        )
        return (
            <Row type="flex" justify="center" align="middle" className='full-height'>
                <Col span={12} style={{width: 600}}>
                    <Spin tip="登录中...请稍后" spinning={isFetching}>{ form }</Spin>
                </Col>
            </Row>

        );
    }
}


export default Login;








