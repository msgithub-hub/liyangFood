<script>
    export default {
        onLaunch: function() {
            console.log('App Launch,我最帅')
        },
        onShow: function() {
            console.log('App Show，我最酷')
        },
        onHide: function() {
            console.log('App Hide')
        }
    }
</script>

<style>
    /*每个页面公共css */
    *{
        margin:0;
        padding:0;
        list-style: none;
    }

    .content {
        width: 100vw;
        min-height: 100vh;
        background: #fff6db;
        display: flex;
        flex-direction: column;
        align-items: center;
        position: relative;
    }
    .wave {
        position: relative;
        overflow: hidden;
    }
    .wave:after {
        content: "";
        display: block;
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        pointer-events: none;
        background-image: radial-gradient(circle, #666 10%, transparent 10.01%);
        background-repeat: no-repeat;
        background-position: 50%;
        transform: scale(10, 10);
        opacity: 0;
        transition: transform .3s, opacity .5s;
    }
    .wave:active:after {
        transform: scale(0, 0);
        opacity: .3;
        transition: 0s;
    }
    .wave:active {
        opacity: .8;
    }


    .logo_bottom {
        position: fixed;
        bottom: 0;
        width: 100%;
        height: 350rpx;
    }

    /*模态框弹出窗口的动画*/
    @keyframes moveUpAnimate {
        0% {
            transform: translateY(100%);
        }
        100% {
            transform: translateY(0);
        }
    }
    .moveUpAnimate {
        animation: moveUpAnimate .5s;
    }
    @keyframes fadeInAnimate {
        0% {
            opacity: 0;
        }
        100% {
            opacity: 1;
        }
    }
    .fadeInAnimate {
        animation: fadeInAnimate 0.5s;
    }

</style>
