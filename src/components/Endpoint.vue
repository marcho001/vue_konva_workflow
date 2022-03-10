<template>
  <v-group
    ref="endpointGroup"
    @mouseenter="handleMouseEnterGroup"
    @mouseleave="handleMouseLeaveGroup"
  >
    <v-circle
      v-for="(endpoint, index) of endpointLists"
      :key="`endpoint_${index}_${parentUuid}`"
      ref="endpoints"
      :config="{ radius: 10, fill: '#D1D5DB' }"
      @mouseenter="setHoverStyle"
      @mouseleave="setDefaultStyle"
      @mousedown="handleMouseDown"
    ></v-circle>
  </v-group>
</template>

<script>
import Konva from 'konva'
export default {
  props: {
    parentUuid: String,
    endpointLists: Array
  },
  data() {
    return {
      isHover: false
    }
  },
  methods: {
    handleMouseEnterGroup() {
      this.$emit('mouse-enter-endpoint')
    },
    handleMouseLeaveGroup() {
      this.$emit('mouse-leave-endpoint')
    },
    setHoverStyle(e) {
      const endpoint = e.target
      const transition = new Konva.Tween({
        node: endpoint,
        radius: 13,
        duration: 0.1,
        fill: '#6b7280'
      })
      transition.play()
    },
    setDefaultStyle(e) {
      const endpoint = e.target
      const transition = new Konva.Tween({
        node: endpoint,
        radius: 10,
        duration: 0.1,
        fill: '#D1D5DB'
      })
      transition.play()
    },
    handleMouseDown() {
      this.$emit('start-draw-connect')
    }
  },
  mounted() {
    let rotate = 0

    const evenEndpointAngleAdjust = this.endpointLists.length % 2 ? 0 : 10
    this.$refs.endpoints.forEach((item, i) => {
      item.getNode().offsetX(-100)
      let angleIncrease = i * 20
      if (i % 2) {
        angleIncrease *= -1
      }
      rotate = rotate - angleIncrease
      item.getNode().rotate(rotate - evenEndpointAngleAdjust)
    })
  }
}
</script>

<style></style>
