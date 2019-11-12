<template>
    <!--微信登录页面-->
    <view class='content'></view>

</template>

<script>
    import {login, authLogin, auth, getUid} from "../../api/user";
    import resultCode from '../../axios/resultCode'
    export default {
        data() {
            return {
                groupNum: 0,
                redirect: '',
                user: {
                    name: '',
                    miYao: '',
                }
            }
        },
        methods: {
            async login() {
                let [err, loginData] = await uni.login();
                if (err) {
                    uni.showToast({title: '小程序登录接口认证失败!'})
                }
                let {data} = await login(loginData.code);
                if (data.code === resultCode.SUCCESS.code) {
                    let resultData = data.data || {};
                    this.$axios.addHeader('token', resultData.token);
                    console.log(resultData.token);
                    if (this.redirect) {
                        uni.redirectTo({
                            url: this.redirect + '?groupNum=' + this.groupNum,
                        })
                    }
                    const value = uni.getStorageSync('userInfo');
                    if (value) {
                        let { data } = await authLogin();
                        if (data.code === resultCode.USER_NOT_AUTH.code) {
                            if (!this.redirect) {
                                uni.redirectTo({
                                    url: '/pages/login/login'
                                })
                            }
                        } else if (data.code === resultCode.SUCCESS.code) {
                            let { data: uidData } = await getUid();
                            if (uidData.code === resultCode.SUCCESS.code) {
                                uni.setStorageSync('uid', uidData.data.uid);
                                uni.setStorageSync('groupInfo', JSON.stringify(uidData.data.arr));
                                if (!this.redirect) {
                                    uni.redirectTo({
                                        url: '/pages/index/index'
                                    })
                                }
                            }
                        }
                    } else {
                        if (!this.redirect) {
                            uni.redirectTo({
                                url: '/pages/register/register'
                            })
                        }
                    }
                }
            },
            async getUid() {

            }
        },
        onLoad(option) {
            console.log(option, 'entry')
            this.redirect = option.redirect || '';
            this.groupNum = option.groupNum || '';
            this.login();
        }
    }
</script>

<style lang="scss" scoped>

</style>
