import React, {Component} from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import moment from 'moment';
import {fetchBucketListIfNeeded, fetchBucketStatisticalIfNeeded,updateBucket} from '../actions/bucket';
import {Table, DatePicker, Radio, Form, Button, Select, Input, InputNumber, Popover, Row, Col, Spin,Icon,Modal,message} from 'antd';
const Option = Select.Option;
const createForm = Form.create;
const FormItem = Form.Item;
const ButtonGroup = Button.Group;
import Action from './Action';


@connect((state, ownProps)=>({
    remoteMsg: state.bucket.item.remoteMsg,
    didInvalidate: state.bucket.item.didInvalidate,
    didUpdate: state.bucket.item.didUpdate,
}))
class BucketAction extends Action {

}

const itemLayout = {
    labelCol: {span: 8},
    wrapperCol: {span: 16}
};



@createForm({
})
class UpdateModal extends Component {
    handleCancel() {
        this.props.onCancel()
    }
    handleOk(){
        const {userId} = this.props.payload;
        this.props.form.validateFields((errors, values) => {
            if (errors) {
                console.log('Errors in form!!!');
                return;
            }



            this.props.onOk({
                userId,                    // 用户id
                "buckets":[// 桶信息
                    {
                        "scale":"11.3L",        // 小桶
                        "count": values.little          // 数量
                    },
                    {
                        "scale":"18.9L",        // 大桶
                        "count":values.big           // 数量
                    }
                ]
            });


        });
    }
    render(){
        const payload = this.props.payload;
        const {getFieldDecorator} = this.props.form;

        return (<Modal title="调整空桶数量" visible={!!payload}
                      onOk={()=>this.handleOk()} onCancel={()=>this.handleCancel()}
        >
            {payload ? <Form horizontal>
                <FormItem label="线下退小桶数量"   {...itemLayout} >
                    {
                        getFieldDecorator('little', {
                            initialValue: 0,
                            rules: [
                                {type:'number',required: true,message:'请输入小桶数量'},
                            ],
                        })(
                            <InputNumber min={0}  step={1} max={payload.littleCount*1} placeholder="输入数量"/>
                        )
                    }
                </FormItem>
                <FormItem label="线下退大桶数量"   {...itemLayout} >
                    {
                        getFieldDecorator('big', {
                            initialValue: 0,
                            rules: [
                                {type:'number',required: true,message:'请输入大桶数量'},
                            ],
                        })(
                            <InputNumber min={0}  step={1} max={payload.bigCount*1}  placeholder="输入数量"/>
                        )
                    }
                </FormItem>
            </Form>
            :null}
        </Modal>)
    }
}

@createForm()
class BucketForm extends Component {
    constructor(props) {
        super(props)
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        this.handleSubmit();
    }

    handleSubmit() {
        const validateFields = this.props.form.validateFields;
        const fetchData = this.props.fetchData
        setTimeout(function () {
            validateFields((errors, values) => {
                if (errors) {
                    console.log('Errors in form!!!');
                    return;
                }
                fetchData(1, 20, values);
            });
        }, 0)
    }

    render() {
        const {getFieldDecorator, getFieldError} = this.props.form;
        return (
            <Form horizontal>
                <FormItem
                    label="搜索"
                    labelCol={{span: 2}}
                    wrapperCol={{span: 22}}
                >

                    <span style={{display: 'inline-block', width: 300, verticalAlign: 'middle'}}>
                         {getFieldDecorator('userId', {})(
                             <Input placeholder="输入" size="large"
                                    addonBefore={
                                        <Select defaultValue="order" style={{width: 80}}>
                                            <Option value="order">用户编号</Option>
                                        </Select>
                                    }
                             />
                         )}


                    </span>
                    <Button type="primary" htmlType="submit" style={{margin: ' 0 10px'}}
                            onClick={()=>(this.handleSubmit())}>确定</Button>
                    <a onClick={ ()=> {
                        this.props.form.resetFields();
                        this.handleSubmit();
                    }  }>重置</a>
                </FormItem>
            </Form>
        )
    }
}


@connect((state, ownProps)=>({
    data: state.bucket.statistical.data,
    isFetching: state.bucket.statistical.isFetching,
}), (dispatch, ownProps)=>({
    fetchBucketStatisticalIfNeeded: (payload)=>dispatch(fetchBucketStatisticalIfNeeded(payload))
}))
class Record extends Component {
    componentWillMount() {
        this.props.fetchBucketStatisticalIfNeeded();
    }

    render() {
        const { activeNum, addressNum, bigBucketNum, bigMoneyNum, littleBucketNum, littleMoneyNum } = this.props.data;
        const isFetching = this.props.isFetching;
        return (
            <Spin tip="更新数据中" spinning={isFetching}>
                <Row type="flex" justify="space-around" align="middle" style={{textAlign: 'center', marginBottom: 20}}>
                    <Col span={4}>
                        <h2>活跃用户</h2>
                        <p>{ activeNum }人</p>
                    </Col>
                    <Col span={4}>
                        <h2>收货地址</h2>
                        <p>{ addressNum }人</p>
                    </Col>
                    <Col span={4}>
                        <h2>大桶总数</h2>
                        <p>{ bigBucketNum }人</p>
                    </Col>
                    <Col span={4}>
                        <h2>大桶押金</h2>
                        <p>{ bigMoneyNum }人</p>
                    </Col>
                    <Col span={4}>
                        <h2>小桶总数</h2>
                        <p>{ littleBucketNum }人</p>
                    </Col>
                    <Col span={4}>
                        <h2>小桶押金</h2>
                        <p>{ littleMoneyNum }人</p>
                    </Col>
                </Row>
            </Spin>
        )
    }
}


@connect((state, ownProps)=>({
    data: state.bucket.list.data,
    pagination: state.bucket.list.pagination
}), (dispatch, ownProps)=>({
    fetchBucketListIfNeeded: (payload)=>dispatch(fetchBucketListIfNeeded(payload)),
    updateBucket: (payload)=>dispatch(updateBucket(payload))
}))
class BucketRecord extends Component {
    constructor(props) {
        super(props)
        this.fetchData = this.fetchData.bind(this);
        this.updateHandle = this.updateHandle.bind(this);
        this.onCancel = this.onCancel.bind(this);
        this.onOk = this.onOk.bind(this);
        this.state = {
            chosen:undefined,
        }
    }

    fetchData(pageNum = this.props.pagination.pageNum, pageSize = this.props.pagination.pageSize, data) {
        if (!data) {
            data = this.state;
        }
        this.setState(data);

        const values = Object.assign({}, data, {
            pageNum,
            pageSize,
        })


        if (!values.userId) {
            delete  values.userId;
        }
        console.log('Submit!!!', values);

        this.props.fetchBucketListIfNeeded(values);
    }

    onClick(chosen) {

        this.setState({
            chosen
        })

    }
    onOk(payload){
        console.log(payload)
        this.props.updateBucket(payload);
        this.setState({
            chosen:undefined
        })
    }
    onCancel(){
        this.setState({
            chosen:undefined
        })
    }
    updateHandle(){
        message.success('调整空桶数量成功')
        this.fetchData();
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


        return (<div className="ant-layout-content">
            <Record/>
            <BucketAction  updateHandle={this.updateHandle}/>
            <UpdateModal payload={this.state.chosen} onOk={this.onOk} onCancel={this.onCancel} />
            <Table columns={[
                {
                    title: '用户编号', dataIndex: 'userId', key: '1'
                },
                {
                    title: '地址/收货人/电话', key: '2', dataIndex: 'userAddresses', render: (userAddresses)=> {
                    const [{houseNumber, name, phone}] = userAddresses;
                    if(userAddresses.length<2){
                        return `${houseNumber}/${name}/${phone}`
                    }

                    const content = userAddresses.map(({houseNumber, name, phone},index)=><p key={index}>{`${houseNumber}/${name}/${phone}`}</p>)
                    return  (<Popover content={content}>
                        <div>
                            {`${houseNumber}/${name}/${phone}`} <Icon type="down" />
                        </div>
                    </Popover>)

                }
                },
                {
                    title: '大桶数量', dataIndex: 'bigCount', key: '3'
                },
                {
                    title: '大桶押金', dataIndex: 'bigMoney', key: '4'
                },
                {
                    title: '小桶数量', dataIndex: 'littleCount', key: '5'
                },
                {
                    title: '小桶押金', dataIndex: 'littleMoney', key: '6'
                },
                {
                    title: '操作',
                    key: '7',
                    render: (text, record, index) => (
                        <ButtonGroup>
                            <Button type="primary" onClick={()=>this.onClick(record)}>编辑</Button>
                        </ButtonGroup>
                    ),
                },
            ]} title={()=><BucketForm fetchData={this.fetchData}/>} dataSource={this.props.data}
                   bordered
                   pagination={pagination}/>
        </div>)
    }
}


export default BucketRecord;
