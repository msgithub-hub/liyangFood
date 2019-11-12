<!--微信授权页面-->
<template>
  <div class="main-container">
    <div class="title">"溧阳美食"小程序</div>
    <div class="title">需授权获取你的个人信息</div>
    <div class="wrap">
      <button class="inner" open-type="getUserInfo" @getuserinfo="bindGetUserInfo">授权登录</button>
    </div>
  </div>
</template>

<script>
  import { userInfo } from "../../api/user";
  import resultCode from "../../axios/resultCode";
  export default {
    data () {
      return {}
    },
    methods: {
      async bindGetUserInfo(e) {
        uni.showLoading({
          title: '执行中'
        });
          console.log();
          if (e.target.errMsg === 'getUserInfo:ok') {
              uni.setStorageSync('userInfo', JSON.stringify(e.target.userInfo));
          let { data } = await userInfo(e.target.userInfo);
          if (data.code === resultCode.SUCCESS.code) {
            uni.hideLoading();
            uni.reLaunch({
                url: '/pages/entry/entry'
            })
          }
        }
      }
    },
  }
</script>

<style scoped lang="scss">
  .main-container {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding-top: 80rpx;
    .wrap {
      border-radius: 35rpx;
      border: 1rpx solid rgb(248, 219, 53);
      width: 240rpx;
      height: 66rpx;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-top: 190rpx;
      .inner {
        display: flex;
        justify-content: center;
        color: #000;
        font-size: 30rpx;
        line-height: 58rpx;
        width: 232rpx;
        height: 58rpx;
        background: linear-gradient(to bottom, rgb(248, 221, 44), rgb(247, 208, 47));
        border-radius: 35rpx;
      }
    }
    .title {
      display: flex;
      justify-content: center;
      width: 100%;
      font-size: 38rpx;
      margin-top: 30rpx;
    }
    .btn {
      width: 300rpx;
      margin-top: 30rpx;
    }
  }
</style>
