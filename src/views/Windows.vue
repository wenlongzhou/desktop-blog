<template>
  <InsideFolder v-if="item.type == 'folder'" :content="item" :index="index" @close="closeWindow(item.uuid)" @shrink="shrinkWindow(item.uuid, item.type)"/> 
</template>

<script>
import InsideFolder from './InsideFolder.vue'

export default {
  name: "Windows",
  props: {
    type: String,
    item: Object,
    index: Number,
  },
  components: { InsideFolder },
  methods: {
    closeWindow(uuid) {
      this.$store.commit('closeWindows', uuid);
    },
    shrinkWindow(uuid, type) {
      this.$store.commit('shrinkWindow', {
        uuid: uuid,
        type: type
      });
    },
  }
}
</script>

<style>

</style>