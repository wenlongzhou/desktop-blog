<template>
  <div class="item">
    <folder v-if="isFolderType"></folder>
    <file v-if="isFileType"></file>
  </div>
</template>

<script>
import Folder from "./folder";
import File from "./file";

export default {
  name: "Item",
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