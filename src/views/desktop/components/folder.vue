<template>
  <div class="folder">
    <div class="folder-default" v-if="folderIconLayout" v-on:dblclick="openFolder">
      <img src="" alt="">
      <span></span>
    </div>

    <div class="folder-list" v-if="folderListLayout" v-on:dblclick="openFolder">
      <img src="" alt="">
      <span></span>
    </div>

    <insideFolder v-if="isOpen"/>  
  </div>
</template>

<script>
import InsideFolder from "@/components/InsideFolder";

export default {
  components: { InsideFolder },
  name: "Folder",
  data() {
    return {
      isOpen: false,
    }
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
    openFolder() {
      this.isOpen = true;
    }
  }
}
</script>

<style lang="less" scoped>
  .folder-default {
    width: 100px;
    height: 120px;
    background-color: rgb(92, 156, 172);
  }
</style>