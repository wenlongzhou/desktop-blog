<template>
  <div class="deskIcon" @dblclick="openFile(item)" @mousedown.stop="">
    <folder v-if="type == 'folder'" :item="item"></folder>
    <file v-if="type == 'file'" :item="item"></file>
    <web v-if="type == 'web'" :item="item"></web>
  </div>
</template>

<script>
import Folder from "./Folder";
import File from "./File";
import Web from "./Web";

export default {
  name: "DeskIcon",
  components: { Folder, File, Web },
  props: {
    type: String,
    item: Object,
  },
  data() {
    return {

    }
  },
  methods: {
    openFile(item) {
      console.log('aa');
      this.$store.commit('openWindows', item);
    },
  },
  computed: {
  }
}
</script>

<style lang="less" scoped>
  
</style>