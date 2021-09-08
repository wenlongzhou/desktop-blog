<template>
  <div class="windows" :style="windowStyle" @mousedown="mousedown">
    <InsideFolder v-if="item.type == 'folder'" :content="item" :index="index" @toolbarMousedown="toolbarMousedown($event)" @close="closeWindow(item.uuid)" @shrink="shrinkWindow(item.uuid, item.type)"/> 
    <Markdown v-if="item.type == 'file'" :content="item" :index="index" @toolbarMousedown="toolbarMousedown($event)" @close="closeWindow(item.uuid)" @shrink="shrinkWindow(item.uuid, item.type)"/> 
  </div>
</template>

<script>
import InsideFolder from './InsideFolder.vue';
import Markdown from './Markdown.vue';

export default {
  name: "Windows",
  props: {
    type: String,
    item: Object,
    index: Number,
  },
  components: { InsideFolder, Markdown },
  methods: {
    mousedown() {
      this.$emit('windowMousedown')
    },
    closeWindow(uuid) {
      this.$store.commit('closeWindows', uuid);
    },
    shrinkWindow(uuid, type) {
      this.$store.commit('shrinkWindow', {
        uuid: uuid,
        type: type
      });
    },
    toolbarMousedown(e) {
      this.$emit('toolbarMousedown', e)
    }
  },
  computed: {
    windowStyle() {
      return this.$store.state.windows[this.index].windowStyle;
    }
  }
}
</script>

<style lang="less" scoped>
  @radius: 10px;
  .windows {
    border-radius: @radius;
    position: fixed;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
    transition-property: 'transform,top,left,width,height';
    transition-duration: .4s;
    transition-timing-function: ease-in-out;
  }
</style>