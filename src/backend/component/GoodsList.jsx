import React, {Component} from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import {fetchGoodsListIfNeeded} from '../actions/goodsList';
import {Table, DatePicker, Radio, Form, Button, Select, Input, Row, Col} from 'antd';
const ButtonGroup = Button.Group;



const columns = [
    {title: '商品名', dataIndex: 'name', key: '1'},
    {
        title: '商品图片', dataIndex: 'images', key: '2',
        render: (text, record, index) => (
            <img src={text[0]} style={{width: 144, height: 144}}/>
        ),
    },
    {title: '商品描述', dataIndex: 'memo', key: '3'},
    {title: '单价', dataIndex: 'price', key: '4'},
    {title: '库存', dataIndex: 'stock', key: '5'},
    {
        title: '状态', dataIndex: 'shelves', key: '6',
        render: (text, record, index) => (
            text == 0 ? '已下架' : '销售中'
        )
    },
    {
        title: '操作',
        key: '7',
        fixed: 'right',
        width: 100,
        render: (text, record, index) => (
            <ButtonGroup>
                <Link to={ '/goods/' + record.goodsId }><Button type="primary">详情</Button></Link>
            </ButtonGroup>
        ),
    },
];


@connect((state, ownProps)=>({
    ...state.goodslist
}), (dispatch, ownProps)=>({
    fetchGoodsListIfNeeded: (payload)=>dispatch(fetchGoodsListIfNeeded(payload))
}))
class GoodsList extends Component {
    constructor(props) {
        super(props)

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        console.log('componentDidMount', this.props)
        this.handleSubmit(1, 20);
    }


    handleSubmit(current = this.props.current, pageSize = this.props.pageSize) {
        console.log('handleSubmit', current, pageSize);
        this.props.fetchGoodsListIfNeeded({
            current,
            pageSize,
        });
    }

    render() {
        const pagination = {
            ...this.props,
            defaultPageSize: this.props.pageSize,
            defaultCurrent: this.props.current,
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
                        <Link to="/goods/create">
                            <Button type="primary">添加商品</Button>
                        </Link>
                    </div>
                </Col>
            </Row>
            <Table columns={columns} dataSource={this.props.data} bgoodsed loading={this.props.isFetching}
                   pagination={pagination}/>
        </div>)
    }
}


export default GoodsList;
