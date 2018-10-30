<template>
    <vue-draggable-resizable
      class="resizable-window"
      :w="windowSettings.width"
      :h="windowSettings.height"
      :x = "windowSettings.leftIndent"
      :y = "windowSettings.topIndent"
      drag-handle=".resizable-window__header"
      @dragstop="onDragStop"
      @resizestop="onResizeStop"
      :parent="true">
        <div class="resizable-window__header">
          <i class="window close icon red" @click="$emit('remove-window', windowSettings.id)"></i>
          <span class="heading">{{windowSettings.title}}</span>
        </div>
        <div class="resizable-window__content">
          <p>Window with params <b>height: </b>{{windowSettings.height}} <b>width: </b>{{windowSettings.width}}</p>
        </div>
    </vue-draggable-resizable>
</template>

<script>
import VueDraggableResizable from 'vue-draggable-resizable'

export default {
  components: {VueDraggableResizable},
  props: {
    width: {type: Number, default: 300},
    height: {type: Number, default: 100},
    left: {type: Number, default: 0},
    top: {type: Number, default: 0},
    title: {type: String, default: 'Default title'},
    id: {type: String}
  },
  data: function () {
    return {
      windowSettings: {
        id: this.id,
        width: this.width,
        height: this.height,
        leftIndent: this.left,
        topIndent: this.top,
        title: this.title
      }
    }
  },
  beforeMount () {
    if (localStorage.getItem('windows')) {
      const windows = JSON.parse(localStorage.getItem('windows'))
      this.windowSettings = windows.find(el => el.id === this.windowSettings.id)
    }
  },
  methods: {
    onDragStop (left, top) {
      this.windowSettings.leftIndent = left
      this.windowSettings.topIndent = top
      this.saveWindowSettings()
    },
    onResizeStop (left, top, width, height) {
      this.windowSettings.width = width
      this.windowSettings.height = height
      this.saveWindowSettings()
    },
    saveWindowSettings () {
      let storedWindows = JSON.parse(localStorage.getItem('windows'))
      let currentWindowIndex = storedWindows.findIndex(el => el.id === this.windowSettings.id)
      storedWindows[currentWindowIndex] = this.windowSettings
      localStorage.setItem('windows', JSON.stringify(storedWindows))
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
  }
  .heading {
    font-weight: bold;
  }
  .resizable-window__content {
    padding: 20px;
  }
  .close {
    float: left;
    height: 100%;
    display: block;
    width: 25px;
    cursor: pointer;
  }

</style>
