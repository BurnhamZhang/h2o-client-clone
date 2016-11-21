/**
 * Created by zhangbohan on 16/11/18.
 */
import React from 'react';
import {  Button,  Popover, Timeline} from 'antd';
import moment from  'moment';


const statusMap = {
    0: '待接单',
    1: '配送中',
    2: '换人',
    3: '配送完成',
    4: '申请取消',
    5: '已取消',
}

const colorMap = {
    0:'blue',
    1:'blue',
    2:'blue',
    3:'green',
    4:'yellow',
    5:'red',
}
const columns = [
    {
        title: '指派时间', dataIndex: 'deliveryCreatedDate', key: '1', render(date){
        return moment(date).format('YYYY.MM.DD HH:mm:ss')
    }
    },
    {
        title: '下单时间', dataIndex: 'orderCreatedDate', key: '2', render(date){
        return moment(date).format('YYYY.MM.DD HH:mm:ss')
    }
    },
    {
        title: '商品/数量', dataIndex: 'goods', key: '3', render: (items, record, index) => {
        if (items.length == 1) {
            return items[0].goodsName + '/' + items[0].count
        }
        const content = items.map((item, index)=> (<p key={index}>{item.goodsName + '/' + item.count}</p>))

        return (<Popover content={content} trigger="hover">
            <div>{ items.length }样商品</div>
        </Popover>)
    }
    },
    {
        title: '地址/收货人/电话', key: '4', render: (v, {userAddress, userName, userPhone})=> {
        return `${userAddress}/${userName}/${userPhone}`
    }
    },
    {
        title: '配送人/电话', key: '5', render: (v, {courierName, courierPhone})=> {
        return `${courierName}/${courierPhone}`
    }
    },
    {
        title: '状态/时间', dataIndex: 'logs', key: '6',
        render: (logs,{status,modifiedDate})=> {

            console.warn('logs>>>>>>>>>>',logs)
            const content = logs.map((item, index)=> {
                return (<Timeline.Item key={index} color={colorMap[item.status]}>
                    <p>{statusMap[item.status]}</p>
                    <p>{ moment(item.date).format('YYYY.MM.DD HH:mm:ss')}</p>
                </Timeline.Item>)
            })
            return (
                <Popover content={<Timeline>
                    {content}
                </Timeline>} trigger="hover">
                    <div>
                        <p>{ statusMap[status]}</p>
                        <p>{ moment(modifiedDate).format('YYYY.MM.DD HH:mm:ss') }</p>
                    </div>
                </Popover>
            )

        }
    }
];

export  default  columns