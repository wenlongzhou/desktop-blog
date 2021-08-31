<template>
  <div class="folder">
    <div class="folder-default" v-if="folderIconLayout" @dblclick="$emit('dblclick')">
      <div>{{ item.name }}</div>
    </div>

    <div class="folder-list" v-if="folderListLayout" @dblclick="$emit('dblclick')">
      <div>{{ item.name }}</div>
    </div>

    <!-- <insideFolder v-if="isOpen" @closeFolder="closeFolder" :content="item.child"/>   -->
  </div>
</template>

<script>
// import InsideFolder from "./InsideFolder";

export default {
  // components: { InsideFolder },
  props: {
    item: Object,
  },
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
    },
    closeFolder() {
      this.isOpen = false;
    }
  },
  created() {
  }
}
</script>

<style lang="less" scoped>
  .folder-default {
    width: 60px;
    height: 80px;
    background-image: url('../assets/img/folder1.png');
    background-size: 100%;
    background-repeat: no-repeat;
    margin: 10px;
    position: relative;

    div {
      width: 100%;
      font-size: 12px;
      text-align: center;
      position: absolute;
      bottom: 10px;
      overflow:hidden;
      text-overflow:ellipsis;
      white-space:nowrap;
    }
  }
</style>