<template>
  <div>aa</div>
</template>

<script>
import { getDesktop } from '@/api/desktop';

export default {
  name: "Desktop",
  created() {
    getDesktop();
  },
}
</script>

<style>

</style>