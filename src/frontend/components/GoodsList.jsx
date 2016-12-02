import React, {Component} from 'react';
import {withRouter,Link} from 'react-router';
import {connect} from 'react-redux';
import { ListView,List } from 'antd-mobile';
import {fetchGoodsListIfNeeded} from '../actions/goods'
import GoodsItem from './GoodsItem'

const Item = List.Item




@connect((state, ownProps)=>({
    data:state.goods.list.data,
    pagination:state.goods.list.pagination,
    isLoading:state.goods.list.isFetching,
    didUpdate:state.goods.list.didUpdate,
}), (dispatch, ownProps)=>({
    fetchGoodsListIfNeeded: (payload)=>dispatch(fetchGoodsListIfNeeded(payload)),
}))
class GoodsList  extends Component {
    constructor(props) {
        super(props);
        const dataSource = new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1 !== row2,
        });
        this.state=  {
            dataSource: dataSource.cloneWithRows([]),
            isLoading: false,
            isEnd:false,
        };
        this.data = [];
    }
    componentWillMount(){
        this.props.fetchGoodsListIfNeeded({
            pageNum:0,
            pageSize:20,
            shelves:0
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
            console.log(this.data.length);
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

        if(this.state.isEnd){
            return
        }
        if(this.props.pagination.totalCount*1 >this.state.dataSource.getRowCount()){
            this.props.fetchGoodsListIfNeeded({
                pageNum:this.props.pagination.pageNum*1+1,
                pageSize:20,
                shelves:0
            })
        }
    }

    render() {
        const row = (rowData, sectionID, rowID) => {


            console.warn('row',rowData)
            return (
                <GoodsItem key={rowID} data={rowData}/>
            );
        };
        console.warn('rData',this.rData)

        return (
            <ListView style={{marginBottom:100}}
                dataSource={this.state.dataSource}
                renderFooter={() => <div style={{ padding: 30, textAlign: 'center' }}>
                    {this.state.isEnd?'到底了':(this.state.isLoading ? '加载中...' : '加载完毕')}
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


export default GoodsList