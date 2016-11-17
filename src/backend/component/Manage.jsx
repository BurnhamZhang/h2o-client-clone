import React, {Component} from 'react';
import {Menu, Breadcrumb, Icon, Button, Card, Col, Row, Popover, Tag, Checkbox, Modal} from 'antd';
import {DragSource, DragDropContext, DropTarget} from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
const CheckboxGroup = Checkbox.Group;
import {Link} from 'react-router';
import {connect} from 'react-redux';
import {manage_login} from '../actions/manage';
import {fetchCandidateCourierListIfNeeded} from '../actions/courier';
import Delivery from './Delivery';

const courierData = [{
    id: 1,
    name: '张三',
    image: 'http://placeholder.qiniudn.com/80x80/4CD964/fff',
    has: 5,
    all: 10
}, {
    id: 2,
    name: '李四',
    image: 'http://placeholder.qiniudn.com/80x80/4CD964/fff',
    has: 3,
    all: 4
}, {
    id: 3,
    name: '王五',
    image: 'http://placeholder.qiniudn.com/80x80/4CD964/fff',
    has: 5,
    all: 23
}, {
    id: 4,
    name: '唐僧',
    image: 'http://placeholder.qiniudn.com/80x80/4CD964/fff',
    has: 9,
    all: 10
}, {
    id: 5,
    name: '孙悟空',
    image: 'http://placeholder.qiniudn.com/80x80/4CD964/fff',
    has: 25,
    all: 53
}, {
    id: 6,
    name: '猪八戒',
    image: 'http://placeholder.qiniudn.com/80x80/4CD964/fff',
    has: 4,
    all: 5
}, {
    id: 7,
    name: '沙悟净',
    image: 'http://placeholder.qiniudn.com/80x80/4CD964/fff',
    has: 5,
    all: 18
}]

const Types = {
    ORDER: 'order',
    COURIER:'courier'
};

class Courier extends Component {
    render() {
        return (
            <div style={{margin: '10px 10px 10px 0', float: 'left', width: 100, textAlign: 'center'}}>
                <img src={this.props.image} alt=""/>
                <h3>{this.props.name}</h3>
                <h3>({this.props.doing}/{this.props.done})</h3>
            </div>
        )
    }
}



class Order extends Component {
    render() {
        const {createdDate, userHouseNumber, userName, userPhone, orderDetails, invoiceType} = this.props;
        let name, count, tag;


        if (orderDetails.length == 1) {
            name = orderDetails[0].name;
            count = orderDetails[0].count;
        }
        else {
            name = orderDetails.length + '样商品';
            count = ( <Popover content={ orderDetails.map((item, index)=> {
                return <p key={index}>{item.name + '/' + item.count}</p>
            }) }>
                <Button type="primary">查看</Button>
            </Popover>)
        }

        if (invoiceType != 1) {
            tag = <Tag color="#87d068">发票</Tag>
        }


        return (
            <div style={{borderBottom: '1px solid #e9e9e9', padding: '5px'}}>
                <Row type="flex" justify="space-between" align="center">
                    <Col span={4}>xxx</Col>
                    <Col span={2}>1</Col>
                    <Col span={18}>
                <span style={{float: 'right'}}>
                                <Tag color="#f50">超时</Tag> { tag }
                </span>
                        <p>{createdDate}</p>
                        <p>{userHouseNumber}</p>
                        <p>{userName + '/' + userPhone}</p>
                    </Col>
                </Row>
            </div>
        )
    }
}


@connect((state, ownProps)=>({
    ...state.manage.order
}))
class OrderBox extends Component {

    render(){
        const {orderMap, data} = this.props;
        console.warn('render OrderBox',data);

        const Orders = data ? data.map((item, index)=> {
            return <DragOrder data={item} key={index} chosen={orderMap[item.id]}/>
        }) : '';
        return (
            <Card title="最新订单" extra={'共'+(data?data.length:0)+'条待处理'} bodyStyle={{padding: 0}}>
                <div style={{height: 400, overflowY: 'scroll'}}>
                    { Orders }
                </div>
            </Card>
        )
    }
}

@connect((state, ownProps)=>({
    data:state.courier.candidate.data
}),(dispatch, ownProps)=>({
    fetchCandidateCourierListIfNeeded: ()=>dispatch(fetchCandidateCourierListIfNeeded())
}))
class CourierBox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible:false,
        }
    }
    componentWillMount(){
        this.props.fetchCandidateCourierListIfNeeded()
    }
    setVisible(visible) {
        this.setState({visible});
    }
    render(){
        const {data} = this.props;

        let count = '0/0';
        let options = [];
        let defaultValue = [];
        let available = [];
        if(data){
            available = data.filter((item)=>item==0);
            count =  available.length +'/' +data.length;
            options = data.map((item)=>({value:item.id,label:item.name}))
            defaultValue =  available.map((item)=>item.id)
        }

        return (
            <Card title={ '候选配送员（'+count+'）' } extra={<a href="#" onClick={()=>this.setVisible(true)}>修改</a>}
                  bodyStyle={{padding: 0}}>
                <div style={{height: 400, overflowY: 'scroll'}}>
                    {
                        available.map((item, index)=> {
                            return <DragCourier data={item} key={index}/>
                        })
                    }
                </div>
                <Modal
                    title="调整候选配送员"
                    wrapClassName="vertical-center-modal"
                    visible={this.state.visible}
                    onOk={() => this.setVisible(false)}
                    onCancel={() => this.setVisible(false)}
                >
                    <CheckboxGroup options={options} defaultValue={defaultValue}/>
                </Modal>
            </Card>
        )
    }
}



@DragSource(Types.COURIER, {
    beginDrag(props, monitor, component) {
        // Return the data describing the dragged item
        return props.data;
    },

    endDrag(props, monitor, component) {
        if (!monitor.didDrop()) {
            // You can check whether the drop was successful
            // or if the drag ended but nobody handled the drop
            return;
        }

        // When dropped on a compatible target, do something.
        // Read the original dragged item from getItem():
        const item = monitor.getItem();

        // You may also read the drop result from the drop target
        // that handled the drop, if it returned an object from
        // its drop() method.
        const dropResult = monitor.getDropResult();

        if (dropResult) {
            console.warn('endDrag', item, dropResult)
        }
    }
}, (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
}))
class DragCourier extends Component {
    render() {
        const {isDragging, connectDragSource,data} = this.props;
        const opacity = isDragging ? 0.4 : 1;


        return connectDragSource(
            <div style={{opacity}}>
                <Courier {...data} />
            </div>
        )
    }
}


@DragSource(Types.ORDER, {
    canDrag(props) {
        // You can disallow drag based on props
        return !props.chosen;
    },
    beginDrag(props, monitor, component) {
        // Return the data describing the dragged item
        return props.data;
    },

    endDrag(props, monitor, component) {
        if (!monitor.didDrop()) {
            // You can check whether the drop was successful
            // or if the drag ended but nobody handled the drop
            return;
        }

        // When dropped on a compatible target, do something.
        // Read the original dragged item from getItem():
        const item = monitor.getItem();

        // You may also read the drop result from the drop target
        // that handled the drop, if it returned an object from
        // its drop() method.
        const dropResult = monitor.getDropResult();

        if (dropResult) {
            console.warn('endDrag', item, dropResult)
        }
    }
}, (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
}))
class DragOrder extends Component {
    render() {
        const {isDragging, connectDragSource,chosen} = this.props;
        const opacity = chosen|| isDragging ? 0.4 : 1;


        return connectDragSource(
            <div style={{opacity}}>
                <Order {...this.props.data} />
            </div>
        )
    }
}


@DropTarget(Types.ORDER, {
    drop(props, monitor, component) {
        const item = monitor.getItem();
        component.props.addOrder(item)
        return {name: 'Dustbin'};
    }
}, (connect, monitor) => ({
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop()
}))
class ChosenOrderBox extends Component {
    render() {
        const {canDrop, isOver, connectDropTarget,orders} = this.props;
        const isActive = canDrop && isOver;
        let content;
        let backgroundColor = 'transparent';
        if (isActive) {
            backgroundColor = '#4CD964';
        } else if (canDrop) {
            backgroundColor = 'yellow';
        }

        if(orders.length ==0){
            content =(<div style={{lineHeight:'200px',textAlign:'center'}}>{ isActive ?
                '松开鼠标以放置订单' :
                '将订单拖拽至此'}</div>)
        }
        else {
            content = orders.map((item,index)=><Order key={index} {...item}></Order>)
        }
        return connectDropTarget(
            <div style={{height: 200, overflowY: 'scroll', backgroundColor}}>
                {
                    content
                }
            </div>
        )
    }
}

@DropTarget(Types.COURIER, {
    drop(props, monitor, component) {
        const item = monitor.getItem();
        component.props.setCourier(item);
        return {name: 'Dustbin'};
    }
}, (connect, monitor) => ({
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop()
}))
class ChosenCourierBox extends Component {

    render() {
        const {canDrop, isOver, connectDropTarget,courier} = this.props;
        const isActive = canDrop && isOver;
        let content;
        let backgroundColor = 'transparent';
        if (isActive) {
            backgroundColor = '#4CD964';
        } else if (canDrop) {
            backgroundColor = 'yellow';
        }


        if(!courier){
            content =(<div style={{lineHeight:'200px',textAlign:'center'}}>{ isActive ?
                '松开鼠标以放置配送员' :
                '将配送员拖拽至此'}</div>)
        }
        else {
            content = <Courier {...courier} />
        }
        return connectDropTarget(
            <div style={{height: 200, overflowY: 'scroll', backgroundColor}}>
                {
                    content
                }
            </div>
        )
    }
}




@DragDropContext(HTML5Backend)
class DeliveryController extends Component {
    constructor(props) {
        super(props);
        this.state = {
            chosenOrders:[],
            orderMap:{},
            courier:null
        }
    }
    setCourier(courier){
        this.setState({
            courier
        })
    }
    addOrder(order){

        const chosenOrders = this.state.chosenOrders.concat([]);
        const orderMap = Object.assign({},this.state.orderMap);

        orderMap[order.id]=true;
        chosenOrders.push(order);

        this.setState({
            chosenOrders,
            orderMap
        })
    }

    handleSubmit(){
        console.log('handleSubmit',this.state);
    }
    handleCancel(){
        this.setState({
            chosenOrders:[],
            orderMap:{},
            courier:null
        });
    }
    render() {

        const { chosenOrders ,orderMap ,courier } = this.state



        return (
            <div>
                <Row>
                    <Col span={12}>
                        <OrderBox orderMap={orderMap}/>
                    </Col>
                    <Col span={1}/>
                    <Col span={11}>
                         <CourierBox/>
                    </Col>
                </Row>
                <div style={{margin: '10px 0 '}}>
                    <Row type="flex" justify="space-around" align="middle">
                        <Col span={12}>
                            <Card bodyStyle={{padding: 0}}>
                                <ChosenOrderBox addOrder={(order)=>this.addOrder(order)} orders={chosenOrders} />
                            </Card>
                        </Col>
                        <Col span={1}>
                            <h1 style={{textAlign: 'center'}}>+</h1>
                        </Col>
                        <Col span={6}>
                            <Card bodyStyle={{padding: 0}}>
                                <ChosenCourierBox setCourier={(courier)=>this.setCourier(courier)} courier={courier}/>
                            </Card>
                        </Col>
                        <Col span={5} style={{textAlign: 'center'}}>
                            <Button type="primary" onClick={()=>this.handleSubmit()}>确认</Button>
                            <br/>
                            <Button type="dashed" onClick={()=>this.handleCancel()}>清除</Button>
                        </Col>
                    </Row>
                </div>

            </div>
        )
    }
}





@connect(null, (dispatch, ownProps)=>({
    manage_login: ()=>dispatch(manage_login())
}))
class Manage extends Component {

    componentWillMount() {
        this.props.manage_login();
    }

    render() {
        return (
            <div className="ant-layout-content">
                 <DeliveryController/>
                <Delivery/>
            </div>
        )
    }
}


export default Manage;
