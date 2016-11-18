import React, {Component} from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import {fetchGoodsListIfNeeded} from '../../actions/enterprise/goods';
import {Table, DatePicker, Radio, Form, Button, Select, Input, Row, Col} from 'antd';
const ButtonGroup = Button.Group;



const columns = [
    {title: '商品名', dataIndex: 'name', key: '1'},
    {
        title: '商品图片', dataIndex: 'imagesArray', key: '2',
        render: (text, record, index) => (
            <div>
                { text.map((item)=>(<img src={item} style={{width: 60, height: 60}} key={item}/>))}
            </div>

        ),
    },
    {title: '商品描述', dataIndex: 'memo', key: '3'},
    {title: '单价', dataIndex: 'priceYuan', key: '4'},
    {
        title: '操作',
        key: '5',
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
    ...state.enterprise.goods.list
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


    handleSubmit(pageNum = this.props.pagination.pageNum, pageSize = this.props.pagination.pageSize) {
        console.log('handleSubmit', pageNum, pageSize);
        this.props.fetchGoodsListIfNeeded({
            pageNum,
            pageSize,
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

        console.log('pagination', pagination)
        return (<div className="ant-layout-content">

            <Table title={()=>(
                <div>
                    <Link to="/goods/create">
                        <Button type="primary" style={{float: 'right'}}>添加商品</Button>
                    </Link>
                    <h3>商品管理</h3>
                </div>
            )} columns={columns}  bordered dataSource={this.props.data} bgoodsed
                   pagination={pagination}/>
        </div>)
    }
}


export default GoodsList;
