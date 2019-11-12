import { axios } from 'castle-haozijunqaq-uni-utils'

/**
 * PHP服务登录
 * @param code 小程序登录code
 * @returns {*}
 */

/**登录**/
export function login(code) {
	return axios.postData('/keyanshi/login/login', { code })
}

/**更新微信信息**/
export function userInfo(userInfo) {
    return axios.postJSON('/keyanshi/login/userInfo', { userInfo })
}

/**验证认证**/
export function authLogin() {
    return axios.postData('/keyanshi/login/authLogin');
}

/**认证**/
export function auth(name,miYao) {
    return axios.postData('/keyanshi/login/auth', { name,miYao })
}

/**分组**/
export function group(name,miYao) {
    return axios.postJSON('/keyanshi/login/group', { name,miYao })
}

/**
 * 获取用户id
 */
export function getUid() {
    return axios.postData('/keyanshi/login/getUid');
}

/**活动手册、积分规则、电子地图**/
export function article(id) {
    return axios.postJSON('/keyanshi/login/article',{ id });
}

/**宝藏通知**/
export function mine(id) {
    return axios.postJSON('/keyanshi/login/mine',{ id });
}

/**获取照片**/
export function imgList(type, group) {
    return axios.postJSON('/keyanshi/login/imgList',{ type, group });
}

/**图片上传**/
export function upFile(path) {
    return axios.postMultipart('/keyanshi/login/upFile', { file: path });
}

/**图片提交**/
export function submitFile(imgArr) {
    return axios.postJSON('/keyanshi/login/subImg', { imgArr });
}

/**
 * 图片点赞
 * @param id 图片id
 * @returns {*}
 */
export function like(id) {
    return axios.postData('/keyanshi/login/imgZan', { id });
}

/**
 * 视频上传
 * @param path 视频临时地址
 */
export function uploadVideo(path) {
    return axios.postMultipart('/keyanshi/login/upVideo', { file: path })
}

/**
 * 获取视频列表
 * @param type 列表类型 1-本小组 2-其他小组
 * @param group 查询条件 组
 */
export function getVideos(type, group) {
    return axios.postData('/keyanshi/login/videoList', { type, group })
}

/**
 * 获取排行榜
 */
export function getRank() {
    return axios.postData('/keyanshi/login/phb');
}

// 删除图片或视频
export function shanchu(id) {
    return axios.postJSON('/keyanshi/login/delete',{ id });
}

/**
 * 浏览视频加积分
 * @param {number} id 视频id
 */
export function watchVideo(id) {
    return axios.postData('/keyanshi/login/browseVideo', { id })
}








