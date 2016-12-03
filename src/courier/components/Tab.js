import { TabBar } from 'antd-mobile';
import {withRouter} from 'react-router';
import {connect} from 'react-redux';
import React, {Component} from 'react';





@withRouter
class Tab  extends Component {
    renderContent(isRender) {
        return isRender && this.props.children
    }
    onPress(route){
        this.props.router.push(route);
    }
    render() {

        const selectedTab ='/'+ this.props.routes[2].path;

        return (
            <TabBar
                unselectedTintColor="#949494"
                tintColor="#33A3F4"
                barTintColor="white"
            >
                <TabBar.Item
                    icon={{ uri: 'https://zos.alipayobjects.com/rmsportal/UNQhIatjpNZHjVf.png' }}
                    selectedIcon={{ uri: 'https://zos.alipayobjects.com/rmsportal/HLkBvJOKnmOfBPO.png' }}
                    title="待处理单"
                    key="待处理单"
                    selected={selectedTab === '/pending'}
                    onPress={() => {
                        this.onPress('/pending')
                    }}
                    data-seed="logId1"
                >
                    {this.renderContent(selectedTab === '/pending')}
                </TabBar.Item>
                <TabBar.Item
                    icon={{ uri: 'https://zos.alipayobjects.com/rmsportal/EljxLrJEShWZObW.png' }}
                    selectedIcon={{ uri: 'https://zos.alipayobjects.com/rmsportal/LWNaMdwAFSmYBFw.png' }}
                    title="配送中单"
                    key="配送中单"
                    selected={selectedTab === '/processing'}
                    onPress={() => {
                        this.onPress('/processing')
                    }}
                >
                    {this.renderContent(selectedTab === '/processing')}
                </TabBar.Item>
                <TabBar.Item
                    icon={{ uri: 'https://zos.alipayobjects.com/rmsportal/YWpPVCVOnJoCYhs.png' }}
                    selectedIcon={{ uri: 'https://zos.alipayobjects.com/rmsportal/WadBBxOIZtDzsgP.png' }}
                    title="已完成单"
                    key="已完成单"
                    selected={selectedTab === '/done'}
                    onPress={() => {
                        this.onPress('/done')
                    }}
                >
                    {this.renderContent(selectedTab === '/done')}
                </TabBar.Item>
            </TabBar>
        );
    }
};

export default Tab;