<template>
  <!--<div class="calendar">
  
  </div>
  <div class="write">
  
  </div>-->
  <div id="editor">
    <mavon-editor style="height: 100%"></mavon-editor>
  </div>
</template>

<script>
import { mavonEditor } from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
export default {
  data() {
    return {
    }
  },
  components: {
    mavonEditor
    // or 'mavon-editor': mavonEditor
  }
}
</script>

<style scoped>
#editor {
  margin: auto;
  width: 80%;
  height: 580px;
}
</style>