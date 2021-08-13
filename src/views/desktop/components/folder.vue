<template>
  <div class="folder">
    <div class="folder-default" v-if="folderIconLayout">
      <img src="" alt="">
      <span></span>
    </div>

    <div class="folder-list" v-if="folderListLayout">
      <img src="" alt="">
      <span></span>
    </div>
  </div>
</template>

<script>
export default {
  name: "Folder",
  data() {
    return {

    }
  },
  computed: {
    folderIconLayout() {
      return this.$store.state.folderLayout === 'icon';
    },
    folderListLayout() {
      console.log(this.$store.state.folderLayout === 'list');
      return this.$store.state.folderLayout === 'list';
    },
  },
}
</script>

<style lang="less" scoped>
  .folder {
    width: 100%;
    height: 100%;
    background-color: rgb(92, 156, 172);
  }
</style>