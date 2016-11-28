import {GOODS_REQUEST, GOODS_SUCCESS, GOODS_FAILURE} from '../../actions/goods';

export default function (state = {
    isFetching: false,
    didInvalidate: true,
    data:{
        "orderDetails":[                           // 订单详情，必填
            {
                "goodsId":"1",            // 商品id，必填
                "name":"shui",            // 商品名称，必填
                "priceYuan":"3.23",       // 商品单价，必填
                "scale":"10L",            // 规格，必填
                "count":"2",              // 数量，必填
                "moneyYuan":"1.23",       // 总价，必填
                "depositType":"1",        // 是否有押金，0，没押金；1，有押金，必填
                "depositMoneyYuan":"1.11" // 押金，非必填
            },
            {
                "goodsId":"2",
                "name":"he",
                "priceYuan":"2.23",
                "scale":"20L",
                "count":"2",
                "moneyYuan":"2.46",
                "depositType":"1",
                "depositMoneyYuan":"1.11"
            }
        ],
        "discountType":"2",                     // 折扣，1，无折扣，2，满减，非必填
        "discountMoneyYuan":"1.21",             // 折扣多少，非必填
        "deliveryMoneyYuan":"1.111",            // 配送费，非必填
        "tradeMoneyYuan":"111.2",               // 总价，必填
        "invoiceType":"1",                      // 有无发票，1，无；2，普票；3，增票，必填
        "invoiceTitle":"JD",                    // 发票抬头，非必填
        "deliveryType":"2",                     // 配送方式，1，立刻送；2，预约送，必填
        "payType":"1",                          // 支付方式，1，线上；2，到付，必填
        "bucketType":"1",                       // 有无空桶，1，无，2，有，必填
    },
}, action) {
    switch (action.type) {
        case GOODS_FAILURE:
            return Object.assign({}, state, {
                isFetching: false,
                didInvalidate: true,
                didUpdate: false,
                ...action.payload
            })
            break;
        case GOODS_REQUEST:
            return Object.assign({}, state, {
                isFetching: true,
                didInvalidate: false,
                didUpdate: false,
                data:null,
            })
            break;
        case GOODS_SUCCESS:
            return Object.assign({}, state, {
                isFetching: false,
                didInvalidate: false,
                didUpdate: false,
                ...action.payload
            })
            break;

        default:
            return state
    }
}
