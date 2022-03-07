<template>
  <div id="app">
    <section class="flex h-screen bg-gray-200">
      <div class="flex-grow"></div>
      <SideBar />
    </section>
  </div>
</template>

<script>
import SideBar from './components/SideBar.vue'
export default {
  components: { SideBar },
  data() {
    return {}
  }
}
</script>
