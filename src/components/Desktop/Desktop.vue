<template>
  <div>
    <h1>{{ msg }}</h1>
    <button class="positive ui button" v-if="deletedWindows.length > 0" @click="windowRestore">Restore deleted window</button>
    <div class="ui segment desktop">
      <interactive-window
        v-for="window in windows" :key="window.id"
        :id="window.id"
        v-on:remove-window="onWindowRemove">
      </interactive-window>
  </div>
  </div>
</template>

<script>
import InteractiveWindow from '@/components/Desktop/Window'
import WINDOWS_SETTINGS from '@/components/Desktop/config'

export default {
  name: 'Desktop',
  components: {
    InteractiveWindow
  },
  data () {
    return {
      msg: 'Dynamic desktop',
      windows: localStorage.getItem('windows') ? JSON.parse(localStorage.getItem('windows')) : WINDOWS_SETTINGS,
      deletedWindows: localStorage.getItem('deletedWindows') ? JSON.parse(localStorage.getItem('deletedWindows')) : []
    }
  },
  watch: {
    windows (val) {
      localStorage.setItem('windows', JSON.stringify(val))
    },
    deletedWindows (val) {
      localStorage.setItem('deletedWindows', JSON.stringify(val))
    }
  },
  beforeMount () {
    localStorage.setItem('windows', JSON.stringify(this.windows))
    localStorage.setItem('deletedWindows', JSON.stringify(this.deletedWindows))
  },
  methods: {
    onWindowRemove (id) {
      let removedWindowIndex = this.windows.findIndex(el => el.id === id)
      this.windows.splice(removedWindowIndex, 1)
      this.deletedWindows.push(id)
    },
    windowRestore () {
      // detecting last deleted window
      let restoredWindowId = this.deletedWindows[this.deletedWindows.length - 1]
      // get default settings for restored window
      let restoredWindow = WINDOWS_SETTINGS.find(el => el.id === restoredWindowId)
      this.windows.push(restoredWindow)
      this.deletedWindows.splice(this.deletedWindows.length - 1, 1)
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
