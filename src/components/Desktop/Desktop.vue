<template>
  <div class="desktop">
    <h1>{{ msg }}</h1>
    <interactive-window></interactive-window>
    <interactive-window></interactive-window>
    <interactive-window></interactive-window>
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
