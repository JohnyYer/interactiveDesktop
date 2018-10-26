<template>
  <div class="desktop">
    <h1>{{ msg }}</h1>
    <interactive-window v-for="window in windows" :key="window.id"
                        :width="window.width"
                        :height="window.height"
                        :top="window.topIndent"
                        :left="window.leftIndent"
                        :title="window.title"
                        :id="window.id">
    </interactive-window>
  </div>
</template>

<script>
import InteractiveWindow from '@/components/Desktop/Window'
const WINDOWS_SETTINGS = [
  {
    'id': 1,
    'width': 300,
    'height': 100,
    'topIndent': 100,
    'leftIndent': 0,
    'title': 'Title 1'
  },
  {
    'id': 2,
    'width': 300,
    'height': 100,
    'topIndent': 300,
    'leftIndent': 300,
    'title': 'Title 1'
  },
  {
    'id': 3,
    'width': 300,
    'height': 100,
    'topIndent': 100,
    'leftIndent': 300,
    'title': 'Title 1'
  },
  {
    'id': 4,
    'width': 300,
    'height': 100,
    'topIndent': 100,
    'leftIndent': 300,
    'title': 'Title 1'
  }
]

export default {
  name: 'Desktop',
  components: {
    InteractiveWindow
  },
  data () {
    return {
      msg: 'Dynamic desktop!',
      windows: WINDOWS_SETTINGS
    }
  },
  mounted () {
    if (localStorage.windowsSettings) {

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
