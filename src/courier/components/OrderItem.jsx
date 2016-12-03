import React, {Component, PropTypes} from 'react';
import {Card,Button} from 'antd-mobile';
import {withRouter} from 'react-router';


@withRouter
class OrderItem extends Component {

    render() {
        const data = {
            "id": "订单id",
            "source": "订单来源 1-线上订单,2-线下订单",
            "shopId": "门店Id",
            "orderNo": "订单号",
            "userName": "用户名",
            "userGeo": "收货地址经纬度",
            "userLocation": "收货地址（到街道）",
            "userHouseNumber": "收货地址（到门牌）",
            "userPhone": "联系电话",
            "count": "商品总数",
            "showMoney": "商品金额",
            "discountType": "折扣类型 1-无折扣 , 2-满减",
            "discountMoney": "折扣金额",
            "deliveryMoney": "配送费",
            "tradeMoney": "实收金额",
            "invoiceType": "发票类型 1-无发票 , 2-普通发票,3-增值税发票",
            "invoiceTitle": "发票抬头",
            "status": "订单状态 （订单状态（1-待支付(在线支付),2-待支付(货到付款),3-申请退桶,4-已取消,5-申请取消,6-已支付,7-已完成,8-超时完成,9-已关闭(超时未付)",
            "cancelUserId": "取消用户id",
            "cancelUseType": "取消用户类型 1-用户取消，2-配送员取消",
            "cancelUserName": "取消人名字",
            "cancelUserPhone": "联系方式联系方式",
            "cancelReason": "取消理由",
            "deliveryType": "配送方式，1-立即送，2-预约送",
            "appointStart": "预约送货时间开始",
            "appointEnd": "预约送货时间结束",
            "payType": "支付方式 , 1-线上付款,2-货到付款",
            "payChannel": "支付渠道",
            "payTime": "支付时间",
            "bucketType": "是否有空桶 1-无空桶，2-有空通",
            "createdDate": "下单时间",
            "modifiedDate": "订单完成时间",
            "userId": "用户ID",
            "version": "版本号",
            "courierName": "配送员姓名",
            "courierPhone": "配送员电话",
            "courierImageUrl": "配送员头像",
            "deliveryStatus": "配送状态，0-待接单，1-已接单，2-配送中，3-换人，4-申请取消，5-已取消，6-配送完成",
            "orderDetails": [{
                "goodsId": "商品ID",
                "name": "名字",
                "price": "单价",
                "scale": "规格",
                "count": "数量",
                "depositType": "有无押金",
                "depositMoney": "押金",
                "money": "总价",
                "imageUrls": []
            }],
            "buckets": [{
                "name": "名字",
                "scale": "规格",
                "price": "单价",
                "count": "数量",
                "money": "总价"
            }]
        }

        const {orderNo,tradeMoney} = data;

        return  <Card full>
            <Card.Header
                title={orderNo}
                extra={tradeMoney}
            />
            <Card.Body>
                <div>收货信息：武侯区丰德万瑞中心A座23楼白先生</div>
                <div>
                    货物信息：宾田20L桶装水*10
                </div>
                <div>
                    收货时间：即时送
                </div>
                <div>
                    备注信息：需要发票（网银北京科技有限公司）
                </div>
            </Card.Body>
            <Card.Footer content={
              <Button type='primary'>抢单</Button>
            } />
        </Card>
    }
}
;


export default OrderItem;
