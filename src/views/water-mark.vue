<template>
    <div>
        <div class="form">
            姓名： <input v-model="username" type="text"/>
            <br><br>
            <input type="file" accept="image/*" @change="get_file_data" />
            <button @click="get_img">生成图片</button>
        </div>
        <div class="container">
            <div class="img-container">
                <img :src="imgUrl" alt />
                <span>@{{username}}</span>
            </div>
        </div>
    </div>
</template>

<script>
import Methods from '@/assets/js/tools.js'
export default {
    data() {
        return {
            imgUrl:'',
            username: ''
        }
    },
    mounted() {
        
    },
    methods: {
        get_file_data(data) {
                const fileReader = new FileReader()
                fileReader.onload = (e) => {
                    this.imgUrl = e.target.result
                }
                // readAsDataURL
                fileReader.readAsDataURL(data.target.files[0])
                fileReader.onerror = () => {
                    new Error('blobToBase64 error')
                }
        },
        async get_img() {
            let $dom = document.getElementsByClassName('img-container')[0]
            let option = {
                width: $dom.clientWidth,
                height: $dom.clientHeight,
                style: {
                    margin: '0 auto'
                }
            }
            Methods.htmlTocanvas($dom, option)
        }
    }
}
</script>

<style lang="scss" scoped>
.form {
    margin: 20px auto;
}
.container {
    display: flex;
    justify-content: center;
}
.img-container {
    position: relative;
    width: 400px;
    img {
        width: 100%;
        height: 100%;
    }
    span {
        color: white;
        font-size: 24px;
        position: absolute;
        right: 5%;
        bottom: 5%;
        transform: rotate(-30deg);
    }
}
</style>