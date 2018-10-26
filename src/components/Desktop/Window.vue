<template>
    <vue-draggable-resizable
      class="resizable-window"
      :w="width"
      :h="height"
      :x = "left"
      :y = "top"
      drag-handle=".resizable-window__header"
      v-on:dragging="onDrag"
      v-on:resizing="onResize"
      :parent="true">
        <div class="resizable-window__header">
          <i class="window close icon red"></i>
          <span class="heading">{{title}}</span>
        </div>
        <div class="resizable-window__content">
          <p>Window with params <b>height: </b>{{computed.height}} <b>width: </b>{{computed.width}}</p>
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
    title: {type: String, default: 'Default title'}
  },
  data: function () {
    return {
      computed: {
        width: this.width,
        height: this.height,
        left: this.left,
        top: this.top,
        title: this.title
      }
    }
  },
  methods: {
    onDrag: function (left, top) {
      this.computed.left = left
      this.computed.top = top
    },
    onResize: function (x, y, w, h) {
      this.computed.height = h
      this.computed.width = w
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
