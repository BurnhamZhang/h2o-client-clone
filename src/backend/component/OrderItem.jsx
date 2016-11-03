import React, {Component} from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import {fetchOrderIfNeeded} from '../actions/order';
import {Table, DatePicker, Radio, Form, Button, Select, Input, InputNumber, Icon} from 'antd';
import Block from './Block';




class OrderItem extends Component {
    constructor(props) {
        super(props)
    }


    render() {

        const data = this.props.data;


        console.warn('render', data);


        return (<div className="ant-layout-content">
            { JSON.stringify({data}) }
        </div>)
    }
}

@connect((state, ownProps)=>({
    ...state.order.list,
}), (dispatch, ownProps)=>({
    fetchOrderIfNeeded: (payload)=>dispatch(fetchOrderIfNeeded(payload)),
}))
class OrderForm extends Component {

    componentWillMount() {
        console.warn('componentWillMount'.toLocaleUpperCase());
        const id = this.props.params.id;
        // this.props.fetchOrderIfNeeded(id);
    }

    componentWillReceiveProps(nextProps) {

        const id = nextProps.params.id;
        console.warn('componentWillReceiveProps', this.props, nextProps)
        if (this.props.params.id !== id) {
            // this.props.fetchOrderIfNeeded(id);
        }
    }

    render() {
        // const data = this.props.data;
        const data = {
            id:2323,
            dsd:'dsds',
            sd:'sdsd'
        }
        return (
            data  ? <OrderItem  payload={data} ></OrderItem> : <Block spinning/>
        )
    }
}

export default OrderForm;
