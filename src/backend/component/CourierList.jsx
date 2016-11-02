import React, {Component} from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import {fetchCourierListIfNeeded} from '../actions/courier';
import {Table, DatePicker, Radio, Form, Button, Select, Input, Row, Col} from 'antd';
const ButtonGroup = Button.Group;

const statusList = ['休息','正常','停用']

const columns = [
    {title: '照片', dataIndex: 'image', key: '1',
        render: (text, record, index) => (
            <img src={text} style={{width: 60, height:60}}/>
        ),
    },
    {
        title: '姓名', dataIndex: 'name', key: '2',

    },
    {title: '账号', dataIndex: 'account', key: '3'},
    {title: '电话', dataIndex: 'phone', key: '4'},
    {
        title: '状态', dataIndex: 'shelves', key: '5',
        render: (text, record, index) =>  statusList[text]
    },
    {
        title: '操作',
        key: '6',
        fixed: 'right',
        width: 100,
        render: (text, record, index) => (
            <ButtonGroup>
                <Link to={ '/courier/' + record.id }><Button type="primary">编辑</Button></Link>
            </ButtonGroup>
        ),
    },
];


@connect((state, ownProps)=>({
    ...state.courier.list
}), (dispatch, ownProps)=>({
    fetchCourierListIfNeeded: (payload)=>dispatch(fetchCourierListIfNeeded(payload))
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


    handleSubmit(pageNum = this.props.pageNum, pageSize = this.props.pageSize) {
        console.log('handleSubmit', pageNum, pageSize);
        this.props.fetchCourierListIfNeeded({
            pageNum,
            pageSize,
        });
    }

    render() {
        const pagination = {
            pageSize:this.props.pagination.pageSize,
            current	: this.props.pagination.pageNum,
            total: this.props.pagination.totalCount,
            defaultPageSize: this.props.pagination.pageSize,
            defaultCurrent: this.props.pageNum,
            showQuickJumper: true,
            showSizeChanger: true,
            onShowSizeChange: this.handleSubmit,
            onChange: this.handleSubmit
        }

        console.log('pagination', pagination)

        return (<div className="ant-layout-content">
            <Row>
                <Col span={8}>
                    <h3>商品管理</h3>
                </Col>
                <Col span={8} offset={8}>
                    <div style={{marginBottom: 16, float: 'right'}}>
                        <Link to="/courier/create">
                            <Button type="primary">添加配送员</Button>
                        </Link>
                    </div>
                </Col>
            </Row>
            <Table columns={columns} dataSource={this.props.data} bgoodsed loading={this.props.isFetching}
                   pagination={pagination}/>
        </div>)
    }
}


export default CourierList;
