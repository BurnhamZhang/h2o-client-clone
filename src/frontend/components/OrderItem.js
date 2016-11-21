/**
 * Created by zhangbohan on 16/11/21.
 */
import React, {Component} from 'react';
import { List,Icon } from 'antd-mobile';

const Item = List.Item;
const Brief = Item.Brief;


class OrderItem extends Component {
    render(){
        const  {} = this.props;
        return (
            <div
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
        )
    }
}
export default OrderItem;