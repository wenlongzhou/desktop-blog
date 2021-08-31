<template>
  <div class="file">
    <div class="file-default" v-if="folderIconLayout" v-on:dblclick="openFile">
      <div>{{ item.name }}</div>
    </div>

    <div class="file-list" v-if="folderListLayout" v-on:dblclick="openFile">
      <div>{{ item.name }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "File",
  props: {
    item: Object,
  },
  computed: {
    folderIconLayout() {
      return this.$store.state.folderLayout === 'icon';
    },
    folderListLayout() {
      return this.$store.state.folderLayout === 'list';
    },
  },
  methods: {
    openFile() {
      
    }
  }
}
</script>

<style lang="less" scoped>
  .file-default {
    width: 60px;
    height: 80px;
    background-image: url('../assets/img/doc.png');
    background-size: 100%;
    background-repeat: no-repeat;
    margin: 10px;
    position: relative;

    div {
      width: 100%;
      font-size: 12px;
      text-align: center;
      position: absolute;
      bottom: 5px;
      overflow:hidden;
      text-overflow:ellipsis;
      white-space:nowrap;
    }
  }
</style>