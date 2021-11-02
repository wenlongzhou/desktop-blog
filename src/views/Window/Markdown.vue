<template>
  <div class="markdown">
    <div>
      <div class="toolbar" @mousedown="mousedown">
        <span @click="$emit('close')"><i class="iconfont" style="font-size: 13px; color: #f95a5a">&#xe62c;</i></span>
        <span @click="$emit('shrink')"><i class="iconfont" style="font-size: 13px; color: rgb(255 177 53)">&#xe62c;</i></span>
        <span ><i class="iconfont" style="font-size: 13px; color: rgb(69 191 69)">&#xe62c;</i></span>
      </div>
      <div class="content">
        <markdown-it-vue :content="markdownContent"></markdown-it-vue>
      </div>
      <div class="foot"></div>
    </div>
  </div>
</template>

<script>
import MarkdownItVue from 'markdown-it-vue'
import 'markdown-it-vue/dist/markdown-it-vue.css'
import axios from 'axios'

export default {
  name: 'Markdown',
  components: { MarkdownItVue },
  props: {
    content: Object,
  },
  data() {
    return {
      markdownContent: '',
    }
  },
  methods: {
    mousedown(e) {
      this.$emit('toolbarMousedown', e);
    },
  },
  created() {
    axios.get(this.content.url)
    .then((res) => {
      this.markdownContent = res.data
    })
  }
}
</script>

<style lang="less" scoped>
  @toolbar-height: 50px;
  @foot-height: 20px;
  @radius: 10px;

  .markdown {
    height: 100%;

    div {
      height: 100%;

      .toolbar {
        height: @toolbar-height;
        padding: 0 10px;
        border-bottom: 1px solid rgba(121, 121, 121, 0.15);
        border-top-left-radius:@radius;
        border-top-right-radius:@radius;
        background-color: #fff;

        span {
          line-height: @toolbar-height;
          margin-left: 8px;
        }
      }

      .content {
        height: calc(100% - @toolbar-height - @foot-height);
        box-sizing: border-box;
        padding: 50px;
        background-color: #fff;
        overflow: auto;
      }
      .content::-webkit-scrollbar{
        width:10px;
        height:10px;
      }
      .content::-webkit-scrollbar-track{
        background: rgb(255, 255, 255);
        border-radius:2px;
      }
      .content::-webkit-scrollbar-thumb{
        background: rgb(216, 216, 216);
        border-radius:10px;
      }
      .content::-webkit-scrollbar-thumb:hover{
        background: rgb(216, 216, 216);
      }

      .foot {
        height: @foot-height;
        border-bottom-left-radius:@radius;
        border-bottom-right-radius:@radius;
        background-color: #fff;
      }
    }
  }



</style>