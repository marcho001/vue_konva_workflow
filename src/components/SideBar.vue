<template>
  <aside class="relative bg-white shadow h-full">
    <div ref="toggleBtn" class="absolute right-full top-1">
      <button
        class="rounded-l-lg p-2 border border-gray-300 border-r-0 bg-white"
        @click="isOpen = !isOpen"
      >
        <i
          class="fa-solid fa-angles-left ease-in-out duration-200"
          :class="{ 'rotate-180': isOpen }"
        ></i>
      </button>
    </div>
    <el-scrollbar class="h-full" tag="div">
      <div v-show="isOpen" class="w-[320px] p-3 select-none">
        <template v-for="(item, i) of sideBarLists">
          <div class="" :key="`category_${i}`">
            <h3 class="mb-3">{{ item.title }}</h3>
            <div class="grid grid-flow-row grid-cols-3">
              <SideBarItem
                v-for="(child, j) of item.children"
                :key="`sidebarItem_${i}_${j}`"
                :shape="item.shape"
                :category="item.category"
                v-bind="child"
              />
            </div>
          </div>
          <el-divider :key="`divider_${i}`"></el-divider>
        </template>
      </div>
    </el-scrollbar>
  </aside>
</template>

<script>
import SideBarItem from './SideBarItem.vue'
export default {
  components: { SideBarItem },
  data() {
    return {
      isOpen: false,
      sideBarLists: [
        {
          title: '未來事件',
          category: 'event',
          shape: 'square',
          children: [{ icon: 'fa-solid fa-computer-mouse', name: '未來事件' }]
        },
        {
          title: '歷史資料',
          category: 'history',
          shape: 'square',
          children: [
            { icon: 'fa-solid fa-computer-mouse', name: '受眾包條件匯入' },
            { icon: 'fa-solid fa-computer-mouse', name: '會員基本資料' },
            { icon: 'fa-solid fa-computer-mouse', name: '會員貢獻度' },
            { icon: 'fa-solid fa-computer-mouse', name: '歷史事件' },
            { icon: 'fa-solid fa-computer-mouse', name: '歷史標籤' }
          ]
        },
        {
          title: '出口',
          category: 'export',
          shape: 'square',
          children: [
            { icon: 'fa-solid fa-computer-mouse', name: 'EDM' },
            { icon: 'fa-solid fa-computer-mouse', name: 'SMS' },
            { icon: 'fa-solid fa-computer-mouse', name: 'Web Notify' },
            { icon: 'fa-solid fa-computer-mouse', name: 'Line Flex' }
          ]
        },
        {
          title: '篩選',
          category: 'filter',
          shape: 'diamond',
          children: [
            { icon: 'fa-solid fa-stopwatch', name: '資料篩選' },
            { icon: 'fa-solid fa-stopwatch', name: 'EDM 開封' },
            { icon: 'fa-solid fa-stopwatch', name: '事件觸發' }
          ]
        },
        {
          title: '控制',
          category: 'control',
          shape: 'diamond',
          children: [
            { icon: 'fa-solid fa-stopwatch', name: 'A/B Test' },
            { icon: 'fa-solid fa-stopwatch', name: '時間' },
            { icon: 'fa-solid fa-stopwatch', name: '智能推薦' },
            { icon: 'fa-solid fa-stopwatch', name: '一對多' },
            { icon: 'fa-solid fa-stopwatch', name: '多對一' }
          ]
        },
        {
          title: '特殊',
          category: 'special',
          shape: 'circle',
          children: [{ icon: 'fa-solid fa-microphone', name: '上標籤' }]
        }
      ]
    }
  }
}
</script>

<style></style>
