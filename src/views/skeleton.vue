<template>
    <div>
        <div class="abs">
            <div class="left">
                <div class="left-header">
                    <div class="header-left">
                        <img :src="imgPhoto" alt="">
                    </div>
                    <div class="header-right">
                        <h1>{{text.title}}</h1>
                        <p>{{text.littleTitle}}</p>
                    </div>
                </div>
                <div class="left-bottom">
                    <span>{{text.des}}</span>
                </div>
            </div>
            <div class="right">
                <img :src="imgheader" alt="">
            </div>
        </div>
        <div class="bbs">
            <div class="top">
                <img :src="imgheader" alt="">
            </div>
             <div class="middle">
                <div class="middle-left">
                    <img :src="imgPhoto" alt="">
                </div>
                <div class="middle-right">
                    <h1>{{text.title}}</h1>
                    <p>{{text.littleTitle}}</p>
                </div>
            </div>
            <div class="bottom">
                <span>{{text.des}}</span>
            </div>
        </div>
    </div>
</template>

<script>
import Methods from '@/assets/js/tools.js';
export default {
    data() {
        return {
            imgPhoto: '',
            imgheader: '',
            text: {
                title: '',
                littleTitle: '',
                des: ''
            }

        };
    },
    mounted() {
        const $dom = document.getElementsByClassName('abs')[0];
        const $dom1 = document.getElementsByClassName('bbs')[0];
        Methods.skeleton($dom, this.init_data);
        Methods.skeleton($dom1, this.init_data);
    },
    methods: {
        init_data() {
            return new Promise(resolve => {
                setTimeout(() => {
                    this.imgPhoto = this.imgheader = 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2060961797,1848438389&fm=26&gp=0.jpg';
                    this.text = {
                        title: '我的中国梦',
                        littleTitle: 'I want become a luck and rich man',
                        des: '在此相遇，我的幸运, we are so happy meet you in the company'
                    };
                    resolve(true);
                }, 3000);
            });
        }
    }
};
</script>

<style lang="scss" scoped>
.abs {
    width: 420px;
    margin: 0 auto;
    display: flex;
    .left {
        width: 300px;
        .left-header {
            display: flex;
            img {
                width: 50px;
                height: 50px;
                border-radius: 50%;
                overflow: hidden;
            }
            h1, p {
                margin-bottom:5px;
            }
        }
        .left-bottom {
            text-align: left;
            text-indent: 10px;
        }
    }
    .right {
        margin-left: 10px;
        flex: 1;
        img {
            width: 100%;
            height: 100%;
        }
    }
}
.bbs {
    height: 450px;
    width: 300px;
    margin: 50px auto;
    .top {
        img {
            width: 100%;
            height: 200px;
        }
    }
    .middle {
        margin-top: 20px;
        display: flex;
        .middle-left {
            display: flex;
            img {
                width: 50px;
                height: 50px;
                border-radius: 50%;
                overflow: hidden;
            }
        }
        h1, p {
            margin-bottom:5px;
        }
    }
    .bottom {
        text-align: left;
        text-indent: 10px;
    }
}
</style>
