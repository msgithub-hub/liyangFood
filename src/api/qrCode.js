/**
 * 二维码相关
 */
import property from '../property'
import { axios } from 'castle-haozijunqaq-uni-utils'

/**
 * 获取用户二维码
 * @param uid 用户id
 * @returns {string}
 */
export function getQrCode(uid) {
    return `${property.BASE_URL}/qrcode/qr_code.php?url=${uid}|${property.QR_CODE_SCAN_ACTIONS.COACH}`
}

/**
 * 普通用户扫描二维码获取积分
 * @param str 二维码携带的主体信息
 */
export function scanQrCode4User(str) {
    return axios.postData('/keyanshi/login/addScore', { str });
}

/**
 * 教练用户扫描二维码获取积分
 * @param uid 二维码所有者的uid
 * @param score 积分
 */
export function scanQrCode4Coach(uid, score) {
    return axios.postData('/keyanshi/login/coach', { uid, score });
    // return axios.postJSON('/keyanshi/login/getInfo',{ uid, score })
}

/**
 * 学员扫草料的二维码进行签到
 **/
export function sign() {
    return axios.postJSON('/keyanshi/login/sign');
}

/**教练扫学员二维码获取信息（group,name）**/
export function getInfo(uid) {
    return axios.postJSON('/keyanshi/login/getInfo',{ uid });
}