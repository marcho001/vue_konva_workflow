<template>
  <div class="m-2 max-w-[80px] text-center">
    <div
      class="relative mx-auto cursor-pointer"
      :class="sizeClassName"
      draggable="true"
      @dragstart="handleDragStart"
    >
      <div class="shadow" :class="[shapeClassName, shapeColor]"></div>
      <p
        class="text-white absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] text-3xl"
      >
        <i :class="childDetail.icon"></i>
      </p>
    </div>

    <p class="my-3">{{ childDetail.name }}</p>
  </div>
</template>

<script>
export default {
  props: {
    shape: String,
    type: String,
    childDetail: { type: Object, required: true }
  },
  computed: {
    sizeClassName() {
      if (this.shape === 'square') {
        return 'w-[70px] h-[70px]'
      }
      if (this.shape === 'diamond') {
        return 'w-[60px] h-[60px]'
      }
      return 'w-[70px] h-[70px]'
    },
    shapeClassName() {
      if (this.shape === 'square') {
        return 'rounded-lg w-full h-full'
      }
      if (this.shape === 'diamond') {
        return 'rounded-lg w-full h-full rotate-45'
      }
      return 'rounded-full w-full h-full'
    },
    shapeColor() {
      switch (this.type) {
        case 'event':
          return 'bg-blue-300'
        case 'history':
          return 'bg-violet-300'

        case 'export':
          return 'bg-red-300'

        case 'filter':
          return 'bg-orange-300'

        case 'control':
          return 'bg-amber-300'

        default:
          return 'bg-green-300'
      }
    }
  },
  methods: {
    handleDragStart(e) {
      e.dataTransfer.setData(
        'nodeData',
        JSON.stringify({
          shape: this.shape,
          type: this.type,
          ...this.childDetail
        })
      )
      e.dataTransfer.effectAllowed = 'move'
      e.dataTransfer.dropEffect = 'move'
    }
  }
}
</script>
