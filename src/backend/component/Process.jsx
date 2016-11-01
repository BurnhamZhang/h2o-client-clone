import React from 'react';
import {Menu, Breadcrumb, Icon} from 'antd';
import {Link} from 'react-router';

import {connect} from 'react-redux';

@connect(state=>({
    process:state.process
}))
class Process extends React.Component {
    render() {
        console.warn('Process')
        return <div></div>
    }
}


export default Process;
