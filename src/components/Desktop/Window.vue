<template>
    <vue-draggable-resizable
      class="resizable-window"
      :w="windowSettings.width"
      :h="windowSettings.height"
      :x = "windowSettings.leftIndent"
      :y = "windowSettings.topIndent"
      drag-handle=".resizable-window__header"
      :minh="100"
      :minw="200"
      :active.sync="activeWindow"
      @dragstop="onDragStop"
      @resizestop="onResizeStop"
      :parent="true">
        <div class="resizable-window__header">
          <i class="window close icon red" @click="$emit('remove-window', windowSettings.id)"></i>
          <span class="heading">{{windowSettings.title}}</span>
        </div>
        <div class="resizable-window__content" @click="activateWindow">
          <p>Window with params <b>height: </b>{{windowSettings.height}} <b>width: </b>{{windowSettings.width}}</p>
        </div>
    </vue-draggable-resizable>
</template>

<script>
import VueDraggableResizable from 'vue-draggable-resizable'

export default {
  components: {VueDraggableResizable},
  props: {
    id: {type: String}
  },
  data: function () {
    return {
      activeWindow: false,
      windowSettings: {}
    }
  },
  beforeMount () {
    this.getWindowSettings()
  },
  methods: {
    activateWindow: function () {
      this.activeWindow = true
    },
    onDragStop (left, top) {
      this.windowSettings.leftIndent = left
      this.windowSettings.topIndent = top
      this.saveWindowSettings()
    },
    onResizeStop (left, top, width, height) {
      this.windowSettings.width = width
      this.windowSettings.height = height
      this.windowSettings.leftIndent = left
      this.windowSettings.topIndent = top
      this.saveWindowSettings()
    },
    getWindowSettings () {
      const windows = JSON.parse(localStorage.getItem('windows'))
      this.windowSettings = windows.find(el => el.id === this.id)
    },
    saveWindowSettings () {
      let windows = JSON.parse(localStorage.getItem('windows'))
      let currentWindowIndex = windows.findIndex(el => el.id === this.id)
      windows[currentWindowIndex] = this.windowSettings
      localStorage.setItem('windows', JSON.stringify(windows))
    }
  }
}
</script>

<style scoped>
  .resizable-window {
    box-shadow: 0 1px 2px 0 rgba(34,36,38,.15);
    border: 1px solid rgba(34,36,38,.15);
    background: #FFF;
    border-radius: .28rem;
    text-align: center;
  }
  .resizable-window.active {
    border-color: #3db1ff;
    z-index: 1!important;
  }
  .resizable-window.active .resizable-window__header{
    border-color: rgb(61, 177, 255);
    background: rgba(61, 177, 255, 0.6);
  }
  .resizable-window__header {
    border-bottom: 1px solid rgba(34,36,38,.15);
    height: 25px;
    padding-top: 2px;
    background: rgba(34,36,38,.15);
    cursor: -webkit-grab;
  }
  .heading {
    font-weight: bold;
    cursor: -webkit-grab;
  }
  .resizable-window__content {
    padding: 20px;
    height: calc(100% - 25px);
  }
  .close {
    float: left;
    height: 100%;
    display: block;
    width: 25px;
    cursor: pointer;
  }

</style>
