import fetch from '../common/fetch';



export const SHOP_CHOOSE = 'SHOP_CHOOSE';



// 选择当前门店
export function shopChoose(payload) {
    return {
        type: SHOP_CHOOSE,
        payload
    };
}

