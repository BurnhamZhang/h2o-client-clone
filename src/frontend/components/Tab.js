import { TabBar } from 'antd-mobile';
import {withRouter} from 'react-router';

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

        console.log('selectedTab',selectedTab)

        return (
            <TabBar
                unselectedTintColor="#949494"
                tintColor="#33A3F4"
                barTintColor="white"
            >
                <TabBar.Item
                    icon={{ uri: 'https://zos.alipayobjects.com/rmsportal/UNQhIatjpNZHjVf.png' }}
                    selectedIcon={{ uri: 'https://zos.alipayobjects.com/rmsportal/HLkBvJOKnmOfBPO.png' }}
                    title="首页"
                    key="首页"
                    badge={1}
                    selected={selectedTab === '/main'}
                    onPress={() => {
                        this.onPress('/main')
                    }}
                    data-seed="logId1"
                >
                    {this.renderContent(selectedTab === '/main')}
                </TabBar.Item>
                <TabBar.Item
                    icon={{ uri: 'https://zos.alipayobjects.com/rmsportal/EljxLrJEShWZObW.png' }}
                    selectedIcon={{ uri: 'https://zos.alipayobjects.com/rmsportal/LWNaMdwAFSmYBFw.png' }}
                    title="购物车"
                    key="购物车"
                    selected={selectedTab === '/cart'}
                    onPress={() => {
                        this.onPress('/cart')
                    }}
                >
                    {this.renderContent(selectedTab === '/cart')}
                </TabBar.Item>
                <TabBar.Item
                    icon={{ uri: 'https://zos.alipayobjects.com/rmsportal/YWpPVCVOnJoCYhs.png' }}
                    selectedIcon={{ uri: 'https://zos.alipayobjects.com/rmsportal/WadBBxOIZtDzsgP.png' }}
                    title="我的"
                    key="我的"
                    selected={selectedTab === '/user'}
                    onPress={() => {
                        this.onPress('/user')
                    }}
                >
                    {this.renderContent(selectedTab === '/user')}
                </TabBar.Item>
            </TabBar>
        );
    }
};

export default Tab;