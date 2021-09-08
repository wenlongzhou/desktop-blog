<template>
  <div class="file-item" @dblclick="openFile(item)" @mousedown.stop="">
    <folder v-if="type == 'folder'" :item="item"></folder>
    <file v-if="type == 'file'" :item="item"></file>
  </div>
</template>

<script>
import Folder from "./Folder";
import File from "./File";

export default {
  name: "FileItem",
  components: { Folder, File },
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
      console.log('a');
      this.$store.commit('openWindows', item);
    },
  },
  computed: {
  }
}
</script>

<style>
</style>