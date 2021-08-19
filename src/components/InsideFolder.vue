<template>
  <div class="insideFolder" v-if="desktopFiles">
    <file-item v-for="item, k in desktopFiles" :key="k" :type="item.type"></file-item>
  </div>
</template>

<script>
const fileItem = () => import("@/views/desktop/components/FileItem");

export default {
  name: "InsideFolder",
  components: { fileItem },
  data() {
    return {
      desktopFiles: [
      ],
    };
  },
};
</script>

<style lang="less" scoped>
.insideFolder {
  width: 500px;
  height: 400px;
  background-color: rgb(182, 176, 146);
  position: fixed;
  top: calc(50% - 200px);
  left: calc(50% - 250px);
}
</style>