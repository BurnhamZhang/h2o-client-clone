/**
 * Created by zhangbohan on 16/11/1.
 */

import React, {Component, PropTypes} from 'react';
import {Spin} from 'antd';


class Block extends Component {
    static propTypes = {
        spinning: PropTypes.bool,
        size: PropTypes.string,
        tip: PropTypes.string,
        children: PropTypes.node,
    }

    render() {
        const {tip, spinning, size, children}  = this.props;

        return (
            <div className="ant-layout-content">
                <Spin tip={tip | "获取数据中...请稍后"} spinning={spinning} size={size}>
                    { spinning ? <div></div> : children }
                </Spin>
            </div>
        )
    }
}


export default Block