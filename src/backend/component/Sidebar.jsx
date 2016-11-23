import React, {Component} from 'react';
import {Menu, Breadcrumb, Icon} from 'antd';
import {Link, hashHistory  } from 'react-router';
import {connect} from 'react-redux';

const SubMenu = Menu.SubMenu;

const enterprise = [{
    name: '门店账号管理',
    key: 'shop',
    type: 'user',
    path: '/shop'
}, {
    name: '商品管理',
    key: 'goods',
    type: 'notification',
    path: '/goods'
}, {
    name: '业绩管理',
    key: 'achievement',
    type: 'laptop',
    path: '/achievement'
}]

const shop = [{
    name: '调度管理',
    key: 'manage',
    type: 'user',
    path: '/manage'
}, {
    name: '订单管理',
    key: 'order',
    type: 'setting',
    path: '/order'
}, {
    name: '空桶管理',
    key: 'bucket',
    type: 'setting',
    path: '/bucket'
},{
    name: '商品管理',
    key: 'goods',
    type: 'notification',
    path: '/goods'
}, {
    name: '门店管理',
    key: 'shop',
    type: 'laptop',
    path: '/shop'
}, {
    name: '配送员管理',
    key: 'courier',
    type: 'laptop',
    path: '/courier'
},{
    name: '配送记录',
    key: 'records',
    type: 'notification',
    path: '/records'
}]

@connect((state, ownProps)=>({
    ...state.user,
    location:state.routing.locationBeforeTransitions
}))
class Sidebar extends Component {
    constructor(props) {
        super(props)
        this.state = {
            current: '',
        }
        this.handleClick = this.handleClick.bind(this);
        this.changeCurrent = this.changeCurrent.bind(this);
    }

    handleClick(e) {
        hashHistory.push(e.key);
    }
    componentWillMount(){
        const pathname = this.props.location.pathname;
        this.changeCurrent(pathname);
    }
    changeCurrent(pathname){
        const test = /\/\w+/.exec(pathname);
        if(test && test.length>0){
            const current =test[0];
            this.setState({
                current
            })
        }
    }

    componentWillReceiveProps (nextProps) {
        const pathname = nextProps.location.pathname;
        this.changeCurrent(pathname);
    }
    render() {
        const data = this.props.data.loginType == 1 ? enterprise : shop;

        return (
            <aside className="ant-layout-sider">
                <div className="ant-layout-logo">
                    <img src="http://temp.im/150x32/333/000" style={{height: 32, width: 150}}/>
                </div>
                <Menu mode="inline" theme="dark" defaultSelectedKeys={[this.state.current || data[0].key]}
                      onClick={this.handleClick}>
                    {data.map((item)=>(
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
