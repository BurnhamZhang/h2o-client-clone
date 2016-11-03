import React ,{ Component } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import { Menu, Breadcrumb, Icon } from 'antd';
const SubMenu = Menu.SubMenu;

import '../assets/scss/app.scss';
import Sidebar from './Sidebar';

import io from 'socket.io-client';

// const socket = io();
// console.log('socket',socket);

// socket.on('new message',function (data) {
//   console.warn('new message',data);
// })
// socket.emit('get message', {
//   test:1,
//   name:'dsd'
// });


class App extends Component {

  constructor(props){
     super(props);
     this.state = {
       collapse: false,
     }
     this.onCollapseChange = this.onCollapseChange.bind(this);
  }
  onCollapseChange() {
    this.setState({
      collapse: !this.state.collapse,
    })
  }
  render() {

    const collapse = this.state.collapse;
    const key = this.props.location.pathname.split('/')[1] || 'root'
    return (
      <div className={collapse ? "ant-layout-aside ant-layout-aside-collapse" : "ant-layout-aside"}>
        <Sidebar>
          <div className="ant-aside-action" onClick={this.onCollapseChange}>
            {collapse ? <Icon type="right" /> : <Icon type="left" />}
          </div>
        </Sidebar>
        <div className="ant-layout-main">
          <div className="ant-layout-header"></div>
          <div className="ant-layout-breadcrumb">
            <Breadcrumb>
              <Breadcrumb.Item>首页</Breadcrumb.Item>
              <Breadcrumb.Item>应用列表</Breadcrumb.Item>
              <Breadcrumb.Item>某应用</Breadcrumb.Item>
            </Breadcrumb>
          </div>
          <ReactCSSTransitionGroup className="ant-layout-container"
                                   component="div" transitionName="swap"
                                   transitionEnterTimeout={500} transitionLeaveTimeout={500}
          >
            {React.cloneElement(this.props.children || <div/>, {key})}
          </ReactCSSTransitionGroup>
          <div className="ant-layout-footer">
            京东金融 © 2016
          </div>
        </div>
      </div>
    );
  }
};


export default App;
