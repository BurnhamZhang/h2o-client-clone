import React, {Component} from 'react';

import  ListView  from 'antd-mobile/lib/list-view';

const data = [
    {
        img: 'http://temp.im/100x100/FF9500/000',
        title: '景田纯天然矿泉水小瓶装',
        des: '规格：100ml',
        prize: '5.00'
    },
    {
        img: 'http://temp.im/100x100/FF9500/000',
        title: '景田纯天然矿泉水',
        des: '规格：500ml',
        prize: '8.00'
    },
    {
        img: 'http://temp.im/100x100/FF9500/000',
        title: '景田精致桶装',
        des: '规格：1000ml',
        prize: '18.00'
    },
];
let index = data.length - 1;

const NUM_SECTIONS = 5;
const NUM_ROWS_PER_SECTION = 5;
let pageIndex = 0;

const Main = React.createClass({
    getInitialState() {
        const getSectionData = (dataBlob, sectionID) => dataBlob[sectionID];
        const getRowData = (dataBlob, sectionID, rowID) => dataBlob[rowID];

        const dataSource = new ListView.DataSource({
            getRowData,
            getSectionHeaderData: getSectionData,
            rowHasChanged: (row1, row2) => row1 !== row2,
            sectionHeaderHasChanged: (s1, s2) => s1 !== s2,
        });

        this.dataBlob = {};
        this.sectionIDs = [];
        this.rowIDs = [];
        this.genData = (pIndex = 0) => {
            for (let i = 0; i < NUM_SECTIONS; i++) {
                const ii = (pIndex * NUM_SECTIONS) + i;
                const sectionName = `Section ${ii}`;
                this.sectionIDs.push(sectionName);
                this.dataBlob[sectionName] = sectionName;
                this.rowIDs[ii] = [];

                for (let jj = 0; jj < NUM_ROWS_PER_SECTION; jj++) {
                    const rowName = `S${ii}, R${jj}`;
                    this.rowIDs[ii].push(rowName);
                    this.dataBlob[rowName] = rowName;
                }
            }
            // new object ref
            this.sectionIDs = [].concat(this.sectionIDs);
            this.rowIDs = [].concat(this.rowIDs);
        };
        this.genData();
        return {
            dataSource: dataSource.cloneWithRowsAndSections(this.dataBlob, this.sectionIDs, this.rowIDs),
            isLoading: false,
        };
    },

    onEndReached(event) {
        // load new data
        console.log('reach end', event);
        this.setState({isLoading: true});
        setTimeout(() => {
            this.genData(++pageIndex);
            this.setState({
                dataSource: this.state.dataSource.cloneWithRowsAndSections(this.dataBlob, this.sectionIDs, this.rowIDs),
                isLoading: false,
            });
        }, 1000);
    },

    render() {
        const row = (rowData, sectionID, rowID) => {
            if (index < 0) {
                index = data.length - 1;
            }
            const obj = data[index--];
            return (
                <div key={rowID}
                     style={{
                         padding: '8px 16px',
                         backgroundColor: 'white',
                         display: 'flex',
                         borderTop: '1px solid #ECECED',
                         borderBottom: '1px solid #ECECED',
                         margin: '8px 0'
                     }}
                >
                    <img style={{height: 100 * (window.viewportScale || 1), marginRight: 8}} src={obj.img}/>
                    <div style={{display: 'inline-block'}}>
                        <h3 style={{marginBottom: 8}}>
                            {obj.title}
                        </h3>
                        <p>{obj.des}</p>
                        <p><span style={{fontSize: '1.6em', color: '#FF6E27'}}>{obj.prize}</span>元</p>
                    </div>
                </div>
            );
        };
        return (
            <ListView
                dataSource={this.state.dataSource}
                renderFooter={() => <div style={{padding: 30, textAlign: 'center'}}>
                    {this.state.isLoading ? '加载中...' : '加载完毕'}
                </div>}
                renderRow={row}
                className="fortest"
                style={{
                    height: '100%',
                    overflow: 'auto',
                }}
                pageSize={4}
                scrollRenderAheadDistance={500}
                scrollEventThrottle={20}
                onScroll={() => {
                    console.log('scroll');
                }}
                onEndReached={this.onEndReached}
                onEndReachedThreshold={10}
            />
        );
    },
});

export default Main;