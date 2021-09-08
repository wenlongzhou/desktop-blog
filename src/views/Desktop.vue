<template>
  <div class="desktop">
    <top-bar></top-bar>
    <div class="main" @mousemove="mousemove" @mouseup="mouseup" ref="main">
      <file-item v-for="item, k in desktopFiles" :key="k" :type="item.type" :item="item"></file-item>
      <windows v-for="item, index in windows" :key="item.uuid" :item="item" :index="index" @windowMousedown="windowMousedown(index, item)" @toolbarMousedown="toolbarMousedown($event, index)"></windows>
    </div>
    <dock></dock>
  </div>
</template>

<script>
import FileItem from './FileItem'
import TopBar from './TopBar'
import Dock from './Dock'
import Windows from './Windows'
// import { getDesktop } from '@/api/desktop';

export default {
  components: { FileItem, TopBar, Dock, Windows },
  name: "Desktop",
  data() {
    return {
      windowNum: 0,
      windowMove: false,
      windowIndex: undefined,
      desktopFiles: [
        {
          type: 'folder',
          name: '文章',
          child: [
            {
              type: 'file',
               url: 'https://www.nazzzz.cn/test.md',
              name: 'test',
            },
            {
              type: 'file',
              url: 'https://www.nazzzz.cn/test.md',
              name: 'test',
            },
            {
              type: 'file',
              url: 'https://www.nazzzz.cn/test.md',     
              name: 'test',
            },
          ]
        },
        {
          type: 'folder',
          name: '照片',
        },
        {
          type: 'folder',
          name: 'demo',
        },
        {
          type: 'file',
          url: 'https://www.nazzzz.cn/test.md',
          name: 'test',
        },
      ],
    }
  },
  created() {
    // this.desktopFiles = getDesktop();

  },
  computed: {
    windows(){
      return this.$store.state.windows;
    },
  },
  methods: {
    toolbarMousedown(e, index) {
      this.windowMove = true;
      this.deltaLeft = e.clientX-e.currentTarget.parentElement.parentElement.parentElement.offsetLeft;
      this.deltaTop = e.clientY-e.currentTarget.parentElement.parentElement.parentElement.offsetTop;
      this.$store.commit('changeWindowStyle', {
        index: index,
        style: {
          'transition-property': 'none',
        }
      })
    },
    windowMousedown(index, item) {
      this.windowIndex = index;
      this.$store.commit('zIndexIncr');
      this.$store.commit('windowsShowType', item.type);
      this.$store.commit('changeWindowStyle', {
        index: index,
        style: {
          'z-index': this.$store.state.zIndex,
        }
      })
    },
    mousemove(e) {
      if (this.windowMove)  {
        const cx = e.clientX;
        const cy = e.clientY;

        /** 相减即可得到相对于父元素移动的位置 */
        let dx = cx - this.deltaLeft
        let dy = cy - this.deltaTop

        this.$store.commit('changeWindowStyle', {
          index: this.windowIndex,
          style: {
            'left': dx + 'px',
            'top': dy + 'px'
          }
        })
      }
    },
    mouseup() {
      if (this.windowMove || this.windowIndex !== undefined)  {
        console.log('aaaa');
        this.$store.commit('changeWindowStyle', {
          index: this.windowIndex,
          style: {
            'transition-property': 'transform,top,left,width,height'
          }
        })

        this.windowMove = false;
        this.windowIndex = undefined;
      }
    },
  }
}
</script>

<style lang="less" scoped>
  .desktop {
    width: 100vw;
    height: 100vh;
    background-image: url('../assets/img/bg.png');
    background-repeat: no-repeat;
    background-size: cover;
    overflow: hidden;

    .main {
      display: flex;
      flex-direction: column;
      flex-wrap: wrap;
      align-content: flex-start;
      width: 100%;
      height: calc(100% - 0px);
      
      .file-item {
        color: white;
      }
    }
  }
</style>