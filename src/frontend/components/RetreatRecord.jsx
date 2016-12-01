import React, {Component} from 'react';
import {withRouter,Link} from 'react-router';
import {connect} from 'react-redux';
import { ListView,List,Flex ,Button,Modal,Tag,Result} from 'antd-mobile';
import {fetchOrderListIfNeeded} from '../actions/order'
import Order from './Order';
const Item = List.Item
const Brief = Item.Brief
import Action from './Action';

@connect((state, ownProps)=>({
    remoteMsg: state.order.pay.remoteMsg,
    didInvalidate: state.order.pay.didInvalidate,
    didUpdate: state.order.pay.didUpdate,
    res: state.order.pay.data,
}))
class OrderPayAction extends Action {
}


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


@withRouter
@connect((state, ownProps)=>({
    data:state.order.list.data,
    pagination:state.order.list.pagination,
    isLoading:state.order.list.isFetching,
    didUpdate:state.order.list.didUpdate,
}), (dispatch, ownProps)=>({
    fetchOrderListIfNeeded: (payload)=>dispatch(fetchOrderListIfNeeded(payload)),
}))
class OrderList  extends Component {
    constructor(props) {
        super(props);
        const dataSource = new ListView.DataSource({
            rowHasChanged: (row1, row2) => {
                return row1.id !== row2.id
            },
        });
        this.state=  {
            dataSource: dataSource.cloneWithRows([]),
            isLoading: false,
            isEnd:false
        };
        this.data =[];
    }
    componentWillMount(){
        this.props.fetchOrderListIfNeeded({
            pageNum:0,
            pageSize:20,
            orderType:2
        })
    }

    combineData(data){
        this.data = this.data.concat(data)
    }
    componentWillReceiveProps(nextProps){
        console.warn('componentWillReceiveProps',nextProps);
        if(nextProps.isLoading){
            this.setState({
                isLoading: true,
            });
        }
        if(nextProps.didUpdate) {
            this.combineData(nextProps.data)
            let isEnd = false;
            if(nextProps.pagination.totalCount*1==this.data.length){
                isEnd = true;
            }
            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(this.data),
                isLoading: false,
                isEnd
            });
        }

    }

    onEndReached(event) {
        // load new data
        // alert('onEndReached')]

        if(this.state.isEnd){
            return
        }
        if(this.props.pagination.totalCount*1 >this.state.dataSource.getRowCount()){
            this.props.fetchOrderListIfNeeded({
                pageNum:this.props.pagination.pageNum*1+1,
                pageSize:20,
                orderType:2
            })
        }


    }

    render() {
        const row = (rowData, sectionID, rowID) => {
            console.log('rowData',rowData.id)
            return (
                <Order key={rowID} >
                    <OrderItem data={rowData}/>
                </Order>
            );
        };
        return (
            <div>
                <OrderPayAction updateHandle={(component,nextProps)=>{
                    if (nextProps.res && nextProps.res.orderNo && !component.props.res) {
                        this.props.router.push({
                            pathname: `/pay/${nextProps.res.orderNo}`,
                            state: nextProps.res
                        })

                    }
                }}/>
                {
                    this.state.isEnd && this.state.dataSource.getRowCount()==0?(
                        <Result title="申退历史为空"
                                imgUrl="https://zos.alipayobjects.com/rmsportal/NRzOqylcxEstLGf.png"
                                buttonText="返回首页"
                                buttonType="primary"
                                buttonClick={()=>{
                                    this.props.router.push('/main')
                                }}
                        />
                    ):(
                        <ListView style={{marginBottom:100}}
                                  dataSource={this.state.dataSource}
                                  renderFooter={() => <div style={{ padding: 30, textAlign: 'center' }}>
                                      {this.state.isEnd?'到底了':(this.state.isLoading ? '加载中...' : '加载完毕')}
                                  </div>}
                                  renderRow={row}
                                  className="am-list"
                                  scrollRenderAheadDistance={500}
                                  scrollEventThrottle={20}
                                  onScroll={() => { console.log('scroll'); }}
                                  useBodyScroll
                                  onEndReached={(event)=>this.onEndReached(event)}
                                  onEndReachedThreshold={20}
                        />
                    )
                }
            </div>

        );
    }
}






export default OrderList