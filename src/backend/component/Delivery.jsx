import React, {Component} from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import {fetchDeliveryListIfNeeded} from '../actions/delivery';
import {Table, DatePicker, Radio, Form, Button, Select, Input, Row, Col, Popover, Timeline} from 'antd';
const ButtonGroup = Button.Group;
import columns from  '../common/DeliveryColumns';




@connect((state, ownProps)=>({
    data: state.delivery.list.data,
    pagination: state.delivery.list.pagination
}), (dispatch, ownProps)=>({
    fetchDeliveryListIfNeeded: (payload)=>dispatch(fetchDeliveryListIfNeeded(payload))
}))
class DeliveryList extends Component {
    constructor(props) {
        super(props)

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        console.log('componentDidMount', this.props)
        this.handleSubmit(1, 20);
    }


    handleSubmit(pageNum = this.props.pagination.pageNum, pageSize = this.props.pagination.pageSize) {
        console.log('handleSubmit', pageNum, pageSize);


        this.props.fetchDeliveryListIfNeeded({
            pageNum,
            pageSize,
            status: [0, 1],
        });
    }

    render() {
        const pagination = {
            pageSize: this.props.pagination.pageSize * 1,
            current: this.props.pagination.pageNum * 1,
            total: this.props.pagination.totalCount * 1,
            defaultPageSize: this.props.pagination.pageSize * 1,
            defaultCurrent: this.props.pageNum * 1,
            showQuickJumper: true,
            showSizeChanger: true,
            onShowSizeChange: this.handleSubmit,
            onChange: this.handleSubmit
        }

        console.log('pagination', columns)

        return (
            <Table title={()=>(
                <div>
                    <a style={{float: 'right'}}>共{this.props.pagination.totalCount}条配送中</a>
                    <h3>配送状态</h3>
                </div>
            )} columns={columns} bordered dataSource={this.props.data} bgoodsed
                   pagination={pagination}/>
        )
    }
}


export default DeliveryList;
