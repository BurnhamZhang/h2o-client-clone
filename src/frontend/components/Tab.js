import '../assets/base.scss';
import { TabBar } from 'antd-mobile';
import {withRouter} from 'react-router';

import React, {Component} from 'react';


const Hello = withRouter(React.createClass({
    getInitialState() {
        return {
            selectedTab: 'main',
            hidden: false,
        };
    },
    renderContent(isRender) {
        return isRender && this.props.children
    },
    render() {
        console.log(this.props)
        return (
            <TabBar
                unselectedTintColor="#949494"
                tintColor="#33A3F4"
                barTintColor="white"
                hidden={this.state.hidden}
            >
                <TabBar.Item
                    icon={{ uri: 'https://zos.alipayobjects.com/rmsportal/UNQhIatjpNZHjVf.png' }}
                    selectedIcon={{ uri: 'https://zos.alipayobjects.com/rmsportal/HLkBvJOKnmOfBPO.png' }}
                    title="首页"
                    key="首页"
                    badge={1}
                    selected={this.state.selectedTab === 'main'}
                    onPress={() => {
                        this.setState({
                            selectedTab: 'main',
                        });
                    }}
                    data-seed="logId1"
                >
                    {this.renderContent(this.state.selectedTab === 'main')}
                </TabBar.Item>
                <TabBar.Item
                    icon={{ uri: 'https://zos.alipayobjects.com/rmsportal/EljxLrJEShWZObW.png' }}
                    selectedIcon={{ uri: 'https://zos.alipayobjects.com/rmsportal/LWNaMdwAFSmYBFw.png' }}
                    title="购物车"
                    key="购物车"
                    selected={this.state.selectedTab === 'cart'}
                    onPress={() => {
                        this.setState({
                            selectedTab: 'cart',
                        });
                    }}
                >
                    {this.renderContent(this.state.selectedTab === 'cart')}
                </TabBar.Item>
                <TabBar.Item
                    icon={{ uri: 'https://zos.alipayobjects.com/rmsportal/YWpPVCVOnJoCYhs.png' }}
                    selectedIcon={{ uri: 'https://zos.alipayobjects.com/rmsportal/WadBBxOIZtDzsgP.png' }}
                    title="我的"
                    key="我的"
                    selected={this.state.selectedTab === 'user'}
                    onPress={() => {
                        this.setState({
                            selectedTab: 'user',
                        });
                    }}
                >
                    {this.renderContent(this.state.selectedTab === 'user')}
                </TabBar.Item>
            </TabBar>
        );
    },
}));

export default Hello;