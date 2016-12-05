import React, {Component} from 'react';
import { ListView,List,Flex ,Button,Modal,Tag,Toast,Result} from 'antd-mobile';



class MyListView  extends Component {
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
        this.props.fetchData({
            pageNum:0,
            pageSize:this.props.pageSize||20
        })
    }
    resetData (){
        this.data = [];
        this.props.fetchData({
            pageNum:0,
            pageSize:this.props.pageSize||20
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
        if(nextProps.didUpdate && !this.props.didUpdate) {
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
        // load new data
        // alert('onEndReached')]

        if(this.state.isEnd){
            return
        }
        if(this.props.pagination.totalCount*1 >this.state.dataSource.getRowCount()){
            this.props.fetchData({
                pageNum:this.props.pagination.pageNum*1+1,
                pageSize:this.props.pageSize
            })
        }


    }

    render() {
        return  this.state.isEnd && this.state.dataSource.getRowCount()==0?(
            this.props.endView||null
        ):(
            <ListView
                dataSource={this.state.dataSource}
                renderFooter={() => <div style={{ padding: 30, textAlign: 'center' }}>
                    {this.state.isEnd?'到底了':(this.state.isLoading ? '加载中...' : '加载完毕')}
                </div>}
                renderRow={this.props.row}
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
}






export default MyListView