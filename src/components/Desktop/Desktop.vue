<template>
  <div class="desktop">
    <h1>{{ msg }}</h1>
    <interactive-window :width="300" :height="100" :top="100" title="Title 1"></interactive-window>
    <interactive-window :width="300" :height="100" :left="300" :top="100" title="Title 2"></interactive-window>
    <interactive-window :width="300" :height="100" :left="300" :top="100" title="Title 3"></interactive-window>
    <interactive-window :width="300" :height="100" :left="300" :top="100" title="Title 4"></interactive-window>
  </div>
</template>

<script>
import InteractiveWindow from '@/components/Desktop/Window'

export default {
  name: 'Desktop',
  components: {
    InteractiveWindow
  },
  data () {
    return {
      msg: 'Dynamic desktop!'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.desktop {
  height: 500px;
  width: 100%;
  position: relative;
}
</style>
