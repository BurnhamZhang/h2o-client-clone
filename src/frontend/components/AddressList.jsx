import React, {Component} from 'react';

import { List } from 'antd-mobile';
const Item = List.Item;
const Brief = Item.Brief;

class AddressItem extends Component {
        render(){
            const {edit} = this.props;
            const {houseNumber,name,phone} = this.props.data;
           return edit?(
               <Item extra="内容内容" multipleLine>
                   垂直居中对齐 <Brief>辅助文字内容</Brief>
               </Item>
           ):(
               <Item  multipleLine arrow="horizontal">
                   {name+'  '+phone}
                   <Brief> {houseNumber}</Brief>
               </Item>
           )
        }
}


class AddressList extends Component {
    render() {
        const {data, edit} = this.props;
        return (
            <List {...this.props} >
                {data.map((item,index)=>(
                    <AddressItem key={index} data={item} edit={edit} />
                ))}
            </List>
        );
    }
}




export default AddressList;