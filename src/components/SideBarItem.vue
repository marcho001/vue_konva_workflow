<template>
  <div class="m-2 max-w-[80px] text-center">
    <div class="relative mx-auto" :class="sizeClassName">
      <div class="shadow cursor-pointer" :class="[shapeClassName, shapeColor]"></div>
      <p
        class="text-white absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] text-3xl"
      >
        <i :class="icon"></i>
      </p>
    </div>

    <p class="my-3">{{ name }}</p>
  </div>
</template>

<script>
export default {
  props: {
    shape: String,
    category: String,
    icon: String,
    name: String
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
      switch (this.category) {
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
  }
}
</script>
