<template>
  <div class="desktop">
    <top-bar></top-bar>
    <div class="main">
      <file-item v-for="item, k in desktopFiles" :key="k" :type="item.type" :item="item"></file-item>
      <windows v-for="item, index in windows" :key="item.uuid" :item="item" :index="index"></windows>
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
      desktopFiles: [
        {
          type: 'folder',
          name: '博客',
          child: [
            {
              type: 'file',
              name: '简历',
            },
            {
              type: 'file',
              name: '简历',
            },
            {
              type: 'file',
              name: '简历',
            },
          ]
        },
        {
          type: 'folder',
          name: '这是什么',
        },
        {
          type: 'folder',
          name: '你猜',
        },
        {
          type: 'file',
          name: '简历',
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