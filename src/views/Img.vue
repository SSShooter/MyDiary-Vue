<template>
  <div>
    <img :src="currentImg">
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  computed: mapGetters({
    currentImg: 'getCurrentImg'
  })
}
</script>

<style lang="less" scoped>

</style>