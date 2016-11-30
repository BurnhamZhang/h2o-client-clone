import React, {Component} from 'react';
import {withRouter,Link} from 'react-router';
import {connect} from 'react-redux';
import { ListView,List } from 'antd-mobile';
import {fetchGoodsListIfNeeded} from '../actions/goods'
import GoodsItem from './GoodsItem'

const Item = List.Item




@connect((state, ownProps)=>({
    data:state.goods.list.data
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
        };
    }
    componentWillMount(){
        this.props.fetchGoodsListIfNeeded()
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
        console.log('reach end', event);
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


export default GoodsList