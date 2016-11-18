import React, {Component} from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import {fetchDeliveryListIfNeeded} from '../actions/delivery';
import {Table, DatePicker, Radio, Form, Button, Select, Input, Row, Col,Popover} from 'antd';
const ButtonGroup = Button.Group;


const columns = [
    {title: '指派时间', dataIndex: 'deliveryCreatedDate', key: '1'},
    {
        title: '下单时间', dataIndex: 'orderCreatedDate', key: '2',
    },
    {title: '商品/数量',dataIndex:'goods' ,key: '3', render: (items, record, index) => {
        if (items.length == 1) {
            return items[0].goodsName + '/' + items[0].count
        }
        const content = items.map((item, index)=> (<p key={index}>{item.goodsName + '/' + item.count}</p>))

        return (<Popover content={content} trigger="hover">
            <a>{ items.length }样商品</a>
        </Popover>)
    }
    },
    {
        title: '地址/收货人/电话', key: '4', render: (v, {userAddress, userName, userPhone})=> {
        return `${userAddress}/${userName}/${userPhone}`
        }
    },
    {title: '配送人/电话', key: '5',render: (v, {courierName, courierPhone})=> {
        return `${courierName}/${courierPhone}`
    }},
    {
        title: '状态/时间', dataIndex: 'shelves', key: '6',
        render: (v, {status, date})=> {
            return `${status}\n${date}`

        }
    }
];


@connect((state, ownProps)=>({
    ...state.delivery.list
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
            status:[0,1],
        });
    }

    render() {
        const pagination = {
            pageSize:this.props.pagination.pageSize*1,
            current	: this.props.pagination.pageNum*1,
            total: this.props.pagination.totalCount*1,
            defaultPageSize: this.props.pagination.pageSize*1,
            defaultCurrent: this.props.pageNum*1,
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
                )} columns={columns}  bordered dataSource={this.props.data} bgoodsed
                       pagination={pagination}/>
            )
    }
}


export default DeliveryList;
