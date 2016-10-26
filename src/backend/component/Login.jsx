import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Button, Form, Input, Row, Col, Spin} from 'antd';
import { withRouter } from 'react-router';
import {fetchUserIfNeeded} from '../actions/user';
const createForm = Form.create;
const FormItem = Form.Item;


function noop() {
    return false;
}

@connect((state, ownProps)=>({
    user: state.user.payload,
    isFetching:state.user.isFetching
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
            console.log(values);
            this.props.login(values);
        });
    }
    shouldComponentUpdate(nextProps) {
        if (nextProps.user) {
            const { location } = nextProps;
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
        const {isFetching} = this.props;


        const formItemLayout = {
            labelCol: {span: 7},
            wrapperCol: {span: 12},
        };
        const form = (
            <Form horizontal>
                <FormItem
                    {...formItemLayout}
                    label="用户名"
                    hasFeedback
                    help={(getFieldError('name') || []).join(', ')}
                >
                    {getFieldDecorator('name', {
                        rules: [
                            {required: true, min: 2, message: '请至少输入两个字符'},
                        ],
                    })(
                        <Input placeholder="请输入用户名"/>
                    )}
                </FormItem>


                <FormItem
                    {...formItemLayout}
                    label="密码"
                    hasFeedback
                >
                    {getFieldDecorator('password', {
                        rules: [
                            {required: true, whitespace: true, message: '请输入您的密码'},
                        ],
                    })(
                        <Input type="password" autoComplete="off"
                               onContextMenu={noop} onPaste={noop} onCopy={noop} onCut={noop}
                        />
                    )}
                </FormItem>


                <FormItem wrapperCol={{span: 12, offset: 7}}>
                    <Button type="primary" onClick={this.handleSubmit}>确定</Button>
                    &nbsp;&nbsp;&nbsp;
                    <Button type="ghost" onClick={this.handleReset}>重置</Button>
                </FormItem>
            </Form>
        )
        return (
            <Row type="flex" justify="center" align="middle" className='full-height'>

                <Col span={12} style={{width: 600}}>
                    { isFetching ? <Spin tip="登录中...请稍后">{ form }</Spin> : form }
                </Col>
            </Row>

        );
    }
}


export default Login;








