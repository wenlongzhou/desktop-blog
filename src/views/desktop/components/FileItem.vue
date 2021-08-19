<template>
  <div class="file-item">
    <folder v-if="isFolderType"></folder>
    <file v-if="isFileType"></file>
  </div>
</template>

<script>
import Folder from "./Folder";
import File from "./File";

export default {
  name: "fileItem",
  components: { Folder, File },
  props: {
    type: String,
  },
  data() {
    return {

    }
  },
  computed: {
    isFolderType() {
      return this.type == 'folder';
    },
    isFileType() {
      return this.type == 'file';
    }
  }
}
</script>

<style>
</style>