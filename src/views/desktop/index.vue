<template>
  <div class="desktop">
    <item v-for="item, k in desktopFiles" :key="k" :type="item.type"></item>
  </div>
</template>

<script>
import item from './components/item.vue'
// import { getDesktop } from '@/api/desktop';

export default {
  components: { item },
  name: "Desktop",
  data() {
    return {
      desktopFiles: [
        {
          type: 'folder',
          name: '111',
        },
        {
          type: 'file',
          name: '111',
        },
        {
          type: 'folder',
          name: '111',
        },
        {
          type: 'folder',
          name: '111',
        },
        {
          type: 'file',
          name: '111',
        },
        {
          type: 'folder',
          name: '111',
        },
        {
          type: 'folder',
          name: '111',
        },
        {
          type: 'file',
          name: '111',
        },
        {
          type: 'folder',
          name: '111',
        },
        {
          type: 'folder',
          name: '111',
        },
        {
          type: 'file',
          name: '111',
        },
      ],
    }
  },
  created() {
    // this.desktopFiles = getDesktop();
  },
}
</script>

<style lang="less" scoped>
  .desktop {
    width: 100vw;
    height: 100vh;
    background-color: rgb(102, 121, 129);
    overflow: hidden;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    align-content: flex-start;

    .item {
      width: 100px;
      height: 120px;
    }
  }
</style>