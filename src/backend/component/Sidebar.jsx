import React from 'react';
import {Menu, Breadcrumb, Icon} from 'antd';
import {Link,hashHistory} from 'react-router';
const SubMenu = Menu.SubMenu;

const data = [{
    name: '调度管理',
    key: 'manage',
    type: 'user',
    path:'/manage'
},{
    name: '订单管理',
    key: 'order',
    type: 'setting',
    path:'/order'
},{
    name: '商品管理',
    key: 'goods',
    type: 'notification',
    path:'/goods'
},{
    name: '门店管理',
    key: 'store',
    type: 'laptop',
    path:'/store'
},{
    name: '配送员管理',
    key: 'deliver',
    type: 'laptop',
    path:'/deliver'
},{
    name: '业绩管理',
    key: 'achievement',
    type: 'folder',
    path:'/achievement'
},{
    name: '配送记录',
    key: 'records',
    type: 'notification',
    path:'/records'
}]
class Sidebar extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            current: '',
            data:data
        }
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e){
        this.setState({
            current: e.key
        })
        hashHistory.push(e.key);
    }

    render() {
        return (
            <aside className="ant-layout-sider">
                <div className="ant-layout-logo">
                    <img src="http://temp.im/150x32/333/000" style={{height:32,width:150}} />
                </div>
                <Menu mode="inline" theme="dark" defaultSelectedKeys={[this.state.current||data[0].key]} onClick={this.handleClick}>
                    {this.state.data.map((item)=>(
                        <Menu.Item key={item.path}>
                            <Icon type={item.type}/><span className="nav-text">{item.name}</span>
                        </Menu.Item>
                    ))}
                </Menu>
                { this.props.children }
            </aside>
        );
    }
}


export default Sidebar;
