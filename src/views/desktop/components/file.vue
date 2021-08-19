<template>
  <div class="file">
    <div class="file-default" v-if="folderIconLayout" v-on:dblclick="openFile">
      <img src="" alt="">
      <span></span>
    </div>

    <div class="file-list" v-if="folderListLayout" v-on:dblclick="openFile">
      <img src="" alt="">
      <span></span>
    </div>
  </div>
</template>

<script>
export default {
  name: "File",
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
    width: 100px;
    height: 120px;
    background-color: rgb(158, 158, 158);
  }
</style>