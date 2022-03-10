<template>
  <v-group ref="nodeGroup" :config="nodeGroupConfig">
    <v-group ref="shapeGroup">
      <v-rect ref="shape" :config="{ ...shapeConfig }"></v-rect>
      <v-text ref="icon" :config="iconConfig"></v-text>
    </v-group>
    <v-text ref="nameText" :config="nameTextConfig"></v-text>
  </v-group>
</template>

<script>
export default {
  props: {
    nodeConfig: { type: Object, require: true },
    icon: String,
    name: String,
    shape: String,
    type: String,
    iconUnicode: String,
    uuid: String
  },
  computed: {
    nodeGroupConfig() {
      const { x, y } = this.nodeConfig
      return { x, y, draggable: this.nodeDraggable }
    },
    shapeGroupConfig() {
      return ''
    },
    shapeConfig() {
      const { fill } = this.nodeConfig
      return {
        width: 140,
        height: 140,
        cornerRadius: [10, 10, 10, 10],
        offsetX: 70,
        offsetY: 70,
        fill
      }
    },
    nameTextConfig() {
      return {
        text: this.name
      }
    },
    iconConfig() {
      return {
        text: this.iconUnicode,
        fontFamily: 'Font Awesome 6 Pro',
        fontStyle: '900',
        fontSize: 60,
        fill: 'white'
      }
    }
  },
  data() {
    return {
      nodeDraggable: true
    }
  },
  methods: {
    setNameTextPosition() {
      const nameTextEl = this.$refs.nameText.getNode()
      const shape = this.$refs.shape.getNode()
      const { x: shapeX, y: shapeY } = shape.getAbsolutePosition()
      nameTextEl.absolutePosition({
        x: shapeX - nameTextEl.width() / 2,
        y: shapeY + shape.height() / 2 + 20
      })
    },
    setIconPosition() {
      const { x: shapeX, y: shapeY } = this.$refs.shape.getNode().getAbsolutePosition()
      const icon = this.$refs.icon.getNode()
      icon.absolutePosition({
        x: shapeX - icon.width() / 2,
        y: shapeY - icon.height() / 2
      })
    }
  },
  mounted() {
    this.setNameTextPosition()
    this.setIconPosition()
  }
}
</script>

<style></style>
