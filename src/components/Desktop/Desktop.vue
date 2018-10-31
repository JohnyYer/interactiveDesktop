<template>
  <div>
    <h1>{{ msg }}</h1>
    <div class="ui segment desktop">
    <interactive-window v-for="window in windows" :key="window.id" :id="window.id"
                        v-on:remove-window="onWindowRemove">
    </interactive-window>
  </div>
  </div>
</template>

<script>
import InteractiveWindow from '@/components/Desktop/Window'
const WINDOWS_SETTINGS = [
  {
    'id': 'uID1',
    'width': 300,
    'height': 100,
    'topIndent': 0,
    'leftIndent': 0,
    'title': 'Title 1'
  },
  {
    'id': 'uID2',
    'width': 300,
    'height': 100,
    'topIndent': 75,
    'leftIndent': 250,
    'title': 'Title 2'
  },
  {
    'id': 'uID3',
    'width': 300,
    'height': 100,
    'topIndent': 150,
    'leftIndent': 500,
    'title': 'Title 3'
  },
  {
    'id': 'uID4',
    'width': 300,
    'height': 100,
    'topIndent': 225,
    'leftIndent': 750,
    'title': 'Title 4'
  }
]

export default {
  name: 'Desktop',
  components: {
    InteractiveWindow
  },
  data () {
    return {
      msg: 'Dynamic desktop',
      windows: localStorage.getItem('windows') ? JSON.parse(localStorage.getItem('windows')) : WINDOWS_SETTINGS
    }
  },
  beforeMount () {
    this.updateLocalStorage()
  },
  methods: {
    updateLocalStorage () {
      // Updating existing windows
      localStorage.setItem('windows', JSON.stringify(this.windows))
    },
    onWindowRemove (id) {
      let removedWindowIndex = this.windows.findIndex(el => el.id === id)
      this.windows.splice(removedWindowIndex, 1)
      this.updateLocalStorage()
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
