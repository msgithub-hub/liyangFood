<template>
	<view class="content">
		<view style="padding-bottom: 20rpx; display: flex;flex-direction: column;align-items: center;">
			<image class='logo' src='../../static/logo.png'></image>
			<image class='tittle' src='../../static/tittle.png'></image>
			<image class='chang_an' src='../../static/chang_an.png'></image>
			
			<!-- 菜单栏目ul -->
			<view class="page_all">
				<!-- li -->
				<view class="li_all">
					<view class='img_word wave' @click="bingto('/pages/group/group?type=1')">
						<image src="../../static/index/group_btn1.png" class="img_pic"></image>
						<view class='word'>	111在线分组</view>
					</view>

					<view class='img_word wave' @click="bingto('/pages/activityManual/activityManual?type=2')">
						<image src="../../static/index/activityManual_btn2.png" class="img_pic"></image>
						<view class='word'>活动手册</view>
					</view>
					
					<view class='img_word wave' @click="bingto('/pages/treasure/treasure?type=3')">
						<image src="../../static/index/Treasure_btn3.png" class="img_pic"></image>
						<view class='word'>宝藏通知</view>
					</view>
				</view>

				<!-- li -->
				<view class="li_all">
					<view class=' img_word wave' @click="bingto('/pages/video/video?type=4')">
						<image src="../../static/index/video_btn4.png" class="img_pic"></image>
						<view class='word'>我的视频</view>
					</view>

					<view class=' img_word wave' @click="scanQrCode">
						<image src="../../static/index/saoma_btn8.png" class="img_pic"></image>
						<view class='word1'>扫一扫</view>
					</view>
					
					<view class=' img_word wave' @click="bingto('/pages/manStyle/manStyle?type=5')">
						<image src="../../static/index/manStyle_btn5.png" class="img_pic"></image>
						<view class='word'>个人风采</view>
					</view>
				</view>

				<!-- li -->
				<view class="li_all">
					<view class=' img_word1 wave' @click="bingto('/pages/leaderboard/leaderboard?type=6')">
						<image src="../../static/index/Leaderboard_btn6.png" class="img_pic"></image>
						<view class='word'>排行榜</view>
					</view>
					
					<view class=' img_word2 wave' @click="show_ma">
						<image src="../../static/index/ma_btn7.png" class="img_pic"></image>
						<view class='word1'>我的二维码</view>
					</view>
				</view>

			</view>
			<image class='logo_bottom' src='../../static/logo_bottom.png'></image>
		</view>

		<!-- 二维码弹出框 -->
		<view class='modal' v-if='ma'>
			<view class='modal_center' :class="{'moveUpAnimate': ma}">
				<view class='ma_kuang'>
					<!-- 里面是放二维码的 -->
					<image class='ma' :src="qrCode"></image>
				</view>
				<image class='close' src='../../static/close.png' @click="hiden_ma"></image>
			</view>
		</view>
	</view>
</template>

<script>
	import { getQrCode, scanQrCode4Coach, scanQrCode4User } from "../../api/qrCode";
    import property from "../../property";
    import resultCode from "../../axios/resultCode";
    export default {
		data() {
			return {
				ma: false,
				qrCode: getQrCode(uni.getStorageSync('uid')),
			}
		},
		onLoad() {

		},
		methods: {
            async scanQrCode() {
                let [err, data] = await uni.scanCode();
                if (!err) {
                    let scanData = data.result || '';
                    console.log(scanData);
                    let action = scanData.split('|')[1] || '';
                    let qrStr = scanData.split('|')[0] || '';
					this.invokeAction(qrStr, action);
                }
            },
            /**
			 * 执行扫描二维码之后的方法
             * @param qrStr 二维码携带的主体信息
             * @param action 二维码扫描之后进行的操作标识
             */
			async invokeAction(qrStr, action) {
                console.log(action);
                switch (action) {
                    case property.QR_CODE_SCAN_ACTIONS.COACH:
                        uni.navigateTo({url: `/pages/plusPoint/plusPoint?qrStr=${qrStr}`});
                        break;
                    case property.QR_CODE_SCAN_ACTIONS.USER:
                        let {data} = await scanQrCode4User(qrStr);
                        if (data.code === resultCode.SUCCESS.code) {
                            let score = data.data.score || 0;
                            uni.navigateTo({url: `/pages/saoTreasure/saoTreasure?score=${score}&action=${action}`});
                        }else if( resultCode.SCAN_QR_CODE_ERROR.code){
                            uni.navigateTo({url: `/pages/saoTreasure/saoTreasure?score=${null}&action=${action}`});
						}else if( resultCode.SHIXIAO.code){
                            uni.navigateTo({url: `/pages/saoTreasure/saoTreasure?score=${null}&action=${action}&isExpire=1`});}
                        break;
                    case property.QR_CODE_SCAN_ACTIONS.SIGN:
                        uni.navigateTo({url: '/pages/checkIn/checkIn'});
                        break;

                    // case property.QR_CODE_SCAN_ACTIONS. USER:
                    //     let {data:data1} = await scanQrCode4User();
                    //     if (data1.code === resultCode.SUCCESS.code){
                    //         let score = data1.data.score || 0;
                    //         uni.navigateTo({url: `/pages/saoTreasure/saoTreasure?score=${score}&action=${action}`});
						// }
                    //
                    //     break;
                }
            },
            show_ma() {
				this.ma = true
			},
            hiden_ma() {
				this.ma = false
			},
            bingto(url){
				uni.navigateTo({ url })
			}

		},
		filters: {

		},
		computed: {

		}
	}
</script>

<style lang="scss" scoped>
	.logo {
		// display: block;
		width: 150rpx;
		height: 80rpx;
		float: left;
		margin-left: -72vw;
		margin-top: 30rpx;
		// margin: 4vh auto;
	}
	
	.tittle {
		display: block;
		width: 520rpx;
		height: 248rpx;
		margin-top: -20rpx;
		// margin: 0vh auto;
	}
	
	.chang_an {
		width: 582rpx;
		height: 150rpx;
		margin-top: -19rpx;
	}

	.page_all {
		width: 560rpx;
		padding-top: 7rpx;
		background: rgba(0, 0, 0, 0.4);
		border-radius: 40rpx;
		border: 4rpx solid rgba(0, 0, 0, 1);
		margin-top: 40rpx;
        
		position: relative;
		z-index: 10;
		padding-bottom: 30rpx;
	}

	.li_all {
		width: 100%;
		display: flex;
		align-items: center;
		 /*background: yellow;*/
		/* padding-bottom: 4px; */
		margin-top: 30rpx;
		margin-left: 0vw;


		/*margin-top: 3vh;*/
		/*position: relative;*/
		/*cursor: pointer;*/

	}

	.img_word {
		width: 33%;
		margin-left: 1%;
		// background: red;
		display: flex;
		flex-direction: column;
		align-items: center; 
	}

	.img_word1 {
		width: 50%;
		margin-left: 0%;
		display: flex;
		flex-direction: column;
		align-items: center; 
		// background: red;
		padding-left: 68rpx;
	}
	.img_word2 {
		width: 33%;
		margin-left: 0%;
		display: flex;
		flex-direction: column;
		align-items: center; 
		// background: green;
		padding-right: 120rpx;
	}

	.img_pic {
		display: block;
		width: 120rpx;
		height: 120rpx;
		// margin-left: 30%;
	}

	.word {
		width: 130rpx;
		height: 40rpx;
		font-size: 25rpx;
		font-family: PingFangSC-Semibold;
		font-weight: 600;
		color: rgba(255, 255, 255, 1);
		text-align: center;
		line-height: 40rpx;
		// margin-left: 30%;
	}

	.word1 {
		width: 151rpx;
		height: 40rpx;
		font-size: 25rpx;
		font-family: PingFangSC-Semibold;
		font-weight: 600;
		color: rgba(255, 255, 255, 1);
		text-align: center;
		line-height: 40rpx;
		// margin-left: 25%;
	}

	// 二维码弹出框 
	.modal {
		width: 100%;
		height: 100%;
		position: fixed;
		left: 0;
		top: 0;
		z-index: 200;
		background-color: rgba(0, 0, 0, 0.7);
		overflow: hidden;
	}

	.modal_center {
		width: 70%;
		height: 480rpx;
		// background: gold;
		position: absolute;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		margin: auto;
	}

	.ma_kuang {
		width: 360rpx;
		height: 360rpx;
		position: relative;
		margin-left: 14%;
		background: linear-gradient(136deg, rgba(255, 227, 129, 1) 0%, rgba(255, 177, 53, 1) 100%);
		border-radius: 20rpx;
		border: 12rpx solid rgba(0, 0, 0, 1);
	}

	.ma {
		width: 315rpx;
		height: 315rpx;
		position: absolute;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		margin: auto;
	}

	.close {
		width: 76rpx;
		height: 76rpx;
		margin-left: 43%;
		margin-top: 10rpx;
	}
</style>
