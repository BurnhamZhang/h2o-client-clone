import React, {Component, PropTypes} from 'react';
import {Toast, List, Switch, Icon, Stepper,Result,Flex,Button,NavBar,WingBlank,WhiteSpace} from 'antd-mobile';
import {connect} from 'react-redux';
import {getBucketAddress} from '../actions/address';
import {getBucketRecord} from '../actions/bucket';
import {withRouter,Link} from 'react-router';

const Item = List.Item;
const Brief = Item.Brief;


@withRouter
class RetreatContent extends Component {
    render() {

        const {
            id,
            userId,
            name,
            phone,
            houseNumber,
            location,
        } = this.props.data;

        const {
            bigCount,
            littleCount
        } = this.props.bucket;




        return <div >
            <NavBar leftContent="返回"
                    rightContent={<span onClick={()=>{
                      this.props.router.push('/retreat/record')
                    }
                    }>申退历史</span>}
                    mode="light" onLeftClick={() =>this.props.router.goBack() }
            >押金申退</NavBar>
            {
                bigCount==0 && littleCount==0?(
                    <Result
                        imgUrl="https://zos.alipayobjects.com/rmsportal/LUIUWjyMDWctQTf.png"
                        title="没有可申退的桶"
                    />
                ):(
                    <div>
                    <List>
                        {
                            id?(
                                <Item thumb={<Icon type="environment"/>} multipleLine arrow="horizontal" onClick={()=> {
                                    this.props.router.push({
                                        pathname: `/confirm/address`,
                                        query: {
                                            address: Math.random().toString(36).substr(2)
                                        }
                                    })
                                }
                                }>
                                    {name + '   ' + phone}
                                    <Brief>{location + houseNumber}</Brief>
                                </Item>
                            ):(
                                <Item thumb={<Icon type="environment"/>} arrow="horizontal" onClick={()=> {
                                    this.props.router.push({
                                        pathname: `/address/create`,
                                        query: {
                                            address: Math.random().toString(36).substr(2)
                                        }
                                    })
                                }
                                }>
                                    新建收货地址
                                </Item>
                            )
                        }
                        {
                            bigCount*1>0?(
                                <Item extra={<Stepper showNumber min={0} max={bigCount*1}  onChange={ (count)=> {

                                }}/>}>
                                    大桶数量
                                </Item>
                            ):null
                        }
                        {
                            littleCount*1>0?(
                                <Item extra={<Stepper showNumber min={0} max={littleCount*1}  onChange={ (count)=> {

                                }}/>}>
                                    小桶数量
                                </Item>
                            ):null
                        }
                    </List>
                        <WhiteSpace/>
                        <WingBlank>
                            <Button type="primary">提交</Button>
                        </WingBlank>
                    </div>
                )
            }
        </div>
    }
}
;



@connect((state, ownProps)=> ({
    data: state.address.bucket.data,
    bucket: state.bucket.data
}), (dispatch, ownProps)=>({
    getBucketAddress: ()=>dispatch(getBucketAddress()),
    getBucketRecord: ()=>dispatch(getBucketRecord()),
}))
class Retreat extends Component {
    componentWillMount() {
        this.props.getBucketAddress();
        this.props.getBucketRecord();
    }

    render() {
        const {data,bucket} = this.props;

        if(!data ||!bucket){
            return null
        }

        return (
            <RetreatContent data={data} bucket={bucket} />
        )
    }
}


export default Retreat;
