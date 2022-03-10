<template>
  <v-group ref="btnGroup">
    <v-circle ref="btn" :config="btnConfig"></v-circle>
    <v-text ref="icon" :config="iconConfig"></v-text>
  </v-group>
</template>

<script>
export default {
  props: {
    btnFill: String,
    btnRotate: Number,
    btnIcon: String
  },
  data() {
    return {
      btnConfig: {
        radius: 18,
        fill: this.btnFill
      },
      iconConfig: {
        text: this.btnIcon,
        fontFamily: 'Font Awesome 6 Pro',
        fontStyle: '900',
        fontSize: 16,
        fill: '#4B5563'
      }
    }
  },
  mounted() {
    const btn = this.$refs.btn.getNode()
    const icon = this.$refs.icon.getNode()
    const btnGroup = this.$refs.btnGroup.getNode()
    btnGroup.offsetY(100)
    btnGroup.rotate(this.btnRotate)
    const { x, y } = btn.getAbsolutePosition()
    icon.absolutePosition({ x: x - icon.width() / 2, y: y - icon.height() / 2 })
    icon.rotate(-this.btnRotate)
  }
}
</script>
