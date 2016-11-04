import React, {Component} from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import {fetchShopListIfNeeded} from '../../actions/enterprise/shop';
import {Table, DatePicker, Radio, Form, Button, Select, Input, Row, Col} from 'antd';
const ButtonGroup = Button.Group;

const statusList = {'1': '正常', '0': '停用'}

const columns = [
    {
        title: '门店名', dataIndex: 'shopName', key: '1',
    },
    {
        title: '门店负责人', dataIndex: 'leader', key: '2',
    },
    {title: '账号', dataIndex: 'account', key: '3'},
    {title: '电话', dataIndex: 'phone', key: '4'},
    {
        title: '状态', dataIndex: 'status', key: '5',
        render: (text, record, index) => statusList[text]
    },
    {
        title: '操作',
        key: '6',
        fixed: 'right',
        width: 100,
        render: (text, record, index) => (
            <ButtonGroup>
                <Link to={ '/shop/' + record.id }><Button type="primary">编辑</Button></Link>
            </ButtonGroup>
        ),
    },
];


@connect((state, ownProps)=>({
    ...state.enterprise.shop.list
}), (dispatch, ownProps)=>({
    fetchShopListIfNeeded: (payload)=>dispatch(fetchShopListIfNeeded(payload))
}))
class CourierList extends Component {
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
        this.props.fetchShopListIfNeeded({
            pageNum,
            pageSize,
        });
    }

    render() {
        const pagination = {
            pageSize: this.props.pagination.pageSize,
            current: this.props.pagination.pageNum,
            total: this.props.pagination.totalCount,
            defaultPageSize: this.props.pagination.pageSize,
            defaultCurrent: this.props.pageNum,
            showQuickJumper: true,
            showSizeChanger: true,
            onShowSizeChange: this.handleSubmit,
            onChange: this.handleSubmit
        }

        console.log('pagination', pagination)

        const title = ()=>(
            <div>
                <Link to="/shop/create">
                    <Button type="primary" style={{float: 'right'}}>添加账号</Button>
                </Link>
                <h3>门店账号管理</h3>
            </div>
        )
        return (<div className="ant-layout-content">
            <Table title={title} columns={columns} bordered dataSource={this.props.data} bgoodsed
                   loading={this.props.isFetching}
                   pagination={pagination}/>
        </div>)
    }
}


export default CourierList;
