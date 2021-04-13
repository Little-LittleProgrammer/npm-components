<template>
    <div class="qm-highlight" :style="{'height': highLightData.height ? highLightData.height : 'auto'}" :class="{'line': type == 'title'}">
        <div class="qm-highlight-box">
            <textarea class="qm-highlight-textarea" ref="ref-highlight-textarea" :placeholder="highLightData.placeholder ? highLightData.placeholder : ''" v-model="highLightData.content" @blur="textarea_blur"></textarea>
            <div :class="['qm-highlight-html', 'highlight', { 'eye-care': isEyeCare }]" v-html="highLightHtml+ '<span class=ban></span>'"></div>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        highLightInfo: { type: Object, default: () => {} },
        type: { type: String, default: 'book' },
        isEyeCare: { type: Boolean, default: false }
    },
    data() {
        return {
            changeTimeId: '',
            spaceIndentation: '　　', // 全角空格 中文输入法下 mac电脑 option + space
            singlSpace: '　',
            highlightType: this.type,
            highLightData: {}
        };
    },
    mounted() {
        this.$el.onkeydown = (e) => {
            if (e.metaKey == true && e.key == 'v'){
                clearTimeout(this.changeTimeId);
                this.changeTimeId = setTimeout(() => {
                    this.newFormat();
                    this.highLightHtml;
                }, 200);
            }
        };
    },
    watch: {
        highLightInfo: {
            immediate: true,
            deep: true,
            handler(val) {
                this.highLightData = { ...val };
                // this.highLightData.sensitiveWords += ',?';
                if (this.highLightData.content) this.highLightData.content = this.replace_p_to_linefeed(this.highLightData.content);
            }
        }
    },
    computed: {
        highLightHtml(){ // div里的内容
            let _html = '';
            // eslint-disable-next-line vue/no-side-effects-in-computed-properties
            this.highLightData.length = this.highLightData.content.replace(/\s+/g, '').length; // 子组件不应该更改父组件的值
            _html = this.highLightData.content;

            // if (this.highLightData.banWords != ''){
            //     if (this.highLightData.banWords.search((/[a-zA-Z]+/)) != -1){
            //         _html = _html.replace(/[A-Za-z]/g, '<mark>$&</mark>');
            //     }
            //     if (this.highLightData.banWords.search((/[0-9]+/)) != -1){
            //         _html = _html.replace(/[0-9]/g, '<mark>$&</mark>');
            //     }
            // }
            console.log('htnl', _html);

            // 禁词高亮
            _html = this.add_bg_color_by_words(this.highLightData.banWords, _html, 'mark');

            // 高危词高亮
            _html = this.add_bg_color_by_words(this.highLightData.dangerWords, _html, 'span');

            // 敏感词高亮
            _html = this.add_bg_color_by_words(this.highLightData.sensitiveWords, _html, 'label');

            if (this.highlightType == 'book'){
                _html = _html.replace(/\n/g, '<br>').replace(/\s/g, this.singlSpace);
                // _html += '<br><br>';
            } else if (this.highlightType == 'txt'){
                _html = _html.replace(/\n/g, '<br>').replace(/\s/g, this.singlSpace);
                _html += '<br><br>';
            } else if (this.highlightType == 'title'){
                _html = _html.trim().replace(/\n/g, '').replace(/\s+/g, this.singlSpace);
            }

            return _html;
        }
    },
    methods: {
        newFormat(){ // 格式化textarea内的文字
            // eslint-disable-next-line no-irregular-whitespace
            const _arr = this.highLightData.content.split('\n').map(item => '　　' + item.replace(/　　/gi, '').replace(/ /gi, ''));
            // console.log('arr', _arr);
            this.highLightData.content = _arr.join('\n');
        },
        focus(){
            this.$refs['ref-highlight-textarea'].focus();
        },
        textarea_blur(){
            this.newFormat();
            const _saveContent = this.replace_linefeed_to_p(this.highLightData.content);
            this.$emit('realTimeBackEndContent', _saveContent);
        },
        replace_p_to_linefeed(changeString) { // 把<p></p>换成\n
            if (!changeString) return '';
            const newChangeString = changeString.replace(/ /gi, '').replace(/<p><\/p>/gi, '').replace(/<p>/gi, '　　').replace(/<\/p>/gi, '</p>'); // 后面</p>的替换是为了解决有的返回</P> 的问题，此处的空格为option+spce
            const chapterArr = newChangeString.split('</p>');
            if (!chapterArr[chapterArr.length]) chapterArr.pop();
            // eslint-disable-next-line no-irregular-whitespace
            return chapterArr.join('\n').replace(/<\/?.+?>/g, '');
        },
        replace_linefeed_to_p(changeString) { // 把\n换成<p></p>
            // eslint-disable-next-line no-irregular-whitespace
            const chapterContent = '<p>' + changeString.replace(/　　/gi, '') + '</p>';
            return chapterContent.replace(/\n/gi, '</p><p>');
        },
        add_bg_color_by_words(words, html, htmlTag) { // 通过词，给词加背景色，相比没抽离，相对更占用内存空间
            let _words = [];
            if (words) _words = Array.from(new Set(words.split(',')));

            if (_words.length > 0){
                _words.forEach((n) => {
                    if (isNaN(n)){
                        // if (n == '+1s') n = '\\' + n;
                        n = this.check_first_initial_include_special_symbol(n);
                        html = html.replace(new RegExp(n, 'gi'), `<${htmlTag}>$&</${htmlTag}>`);
                    }
                });
            }
            return html;
        },
        check_first_initial_include_special_symbol(word) { // 判断首字母有无特殊符号
            const _specialSymbol = ['+', '?', '.', '*'];
            const _firstInitial = word.slice(0, 1);
            if (_specialSymbol.includes(_firstInitial)) word = '\\' + word;
            return word;
        }
    }
};
</script>
<style lang="scss" scoped>
@mixin hack($attr,$param){
    -moz-#{$attr}: #{$param};
    -webkit-#{$attr}: #{$param};
    -ms-#{$attr}: #{$param};
    -o-#{$attr}: #{$param};
    #{$attr}: #{$param};
}
    .qm-highlight{
        border: 1px solid #DCDFE6;
        @include hack(border-radius, 4px);
        background: #fff;
        // padding: 7px 15px;
        padding: 10px;
        overflow: hidden;
        overflow-y: auto;
        &-box{
            position: relative;
            width: 100%;
            min-height: 100%;
        }
        &-html,&-textarea{
            width: 100%;
            @include hack(box-sizing, border-box);
            position: relative;
            z-index: 10;
            border: 0 none;
            background: none;
            line-height: 32px;
            font-size: 16px;
            word-break: break-all;
            padding: 0;
            letter-spacing: 1px;
            resize: none;
            vertical-align: top;
            display: block;
            overflow: hidden;
            font-family: Arial, simsun;
            min-height: 30px;
            word-break: break-word;
        }
        &-textarea{
            position: absolute;
            top: 0;
            left: 0;
            height: 100%;
        }
        &-html{
            width: 100%;
            z-index: 1;
            background: #fff;
            color: transparent;
            /deep/mark{ // 禁词
                color: transparent;
                background: red;
                padding: 0;
                // 当禁词和高危词出现重叠
                span {
                    color: transparent;
                    background: red;
                    padding: 0;
                }
                label { // 当禁词和敏感词出现重叠
                    color: transparent;
                    background: red;
                    padding: 0;
                }
            }
            /deep/span { // 高危词
                color: transparent;
                background: yellow;
                padding: 0;
                label { // 当高危词和敏感词出现重叠
                    color: transparent;
                    background: yellow;
                    padding: 0;
                }
            }
            /deep/label { // 敏感词
                color: transparent;
                background: #05f505;
                padding: 0;
            }
        }
        .eye-care {
            background: #F7F4ED;
        }
        &.line{
            overflow: hidden;
            .qm-highlight-box{
                height: 100%;
                overflow: hidden;
            }
        }
    }

</style>
