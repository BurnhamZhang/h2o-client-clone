import React, {Component} from 'react';
import {withRouter,Link} from 'react-router';
import {connect} from 'react-redux';
import { ListView,List,Flex ,Button,Modal,Tag} from 'antd-mobile';
import {fetchOrderListIfNeeded} from '../actions/order'
import Order from './Order';
const Item = List.Item
const Brief = Item.Brief

@withRouter
class OrderItem extends Component {

    render(){
        const  { orderDetails ,tradeMoney,orderNo} = this.props.data;
        return (
        <Item onClick={
            ()=>{
                this.props.router.push(`/order/${orderNo}`)
            }
        }>
            <Flex justify="center">
                <img src={orderDetails[0].imageUrls[0]} alt="" style={{height: 100, width: 100}}/>
                <Flex.Item className="Item">
                    <Flex justify="between" align="start">
                        <span>{orderDetails[0].name +'*'+orderDetails[0].count}</span>
                       <span>
                            {
                                this.props.renderTag.call(this)
                            }
                       </span>
                    </Flex>
                    <Flex justify="between">
                        <Brief>￥{tradeMoney} </Brief>
                        {
                            this.props.renderButton.call(this)

                        }

                    </Flex>
                </Flex.Item>
            </Flex>
        </Item>
        )
    }
}

@connect((state, ownProps)=>({
    data:state.order.list.data
}), (dispatch, ownProps)=>({
    fetchOrderListIfNeeded: (payload)=>dispatch(fetchOrderListIfNeeded(payload)),
}))
class OrderList  extends Component {
    constructor(props) {
        super(props);
        const dataSource = new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1 !== row2,
        });
        this.state=  {
            dataSource: dataSource.cloneWithRows([]),
            isLoading: false,
        };
    }
    componentWillMount(){
        this.props.fetchOrderListIfNeeded()
    }

    componentWillReceiveProps(nextProps){
        console.warn('componentWillReceiveProps',nextProps);
        this.setState({
            dataSource: this.state.dataSource.cloneWithRows(nextProps.data),
            isLoading: false,
        });
    }

    onEndReached(event) {
        // load new data
        alert('onEndReached')
        console.log('reach end', event);
    }

    render() {
        const row = (rowData, sectionID, rowID) => {
            return (
                <Order key={rowID} >
                    <OrderItem data={rowData}/>
                </Order>
            );
        };

        return (
            <ListView style={{marginBottom:100}}
                      dataSource={this.state.dataSource}
                      renderFooter={() => <div style={{ padding: 30, textAlign: 'center' }}>
                          {this.state.isLoading ? '加载中...' : '加载完毕'}
                      </div>}
                      renderRow={row}
                      className="am-list"
                      pageSize={4}
                      scrollRenderAheadDistance={500}
                      scrollEventThrottle={20}
                      onScroll={() => { console.log('scroll'); }}
                      useBodyScroll
                      onEndReached={(event)=>this.onEndReached(event)}
                      onEndReachedThreshold={10}
            />
        );
    }
}


export default OrderList