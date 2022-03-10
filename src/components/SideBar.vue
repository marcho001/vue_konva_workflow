<template>
  <aside class="relative bg-white shadow h-full">
    <div ref="toggleBtn" class="absolute right-full top-1">
      <button
        class="rounded-l-lg p-2 border border-gray-300 border-r-0 bg-white"
        @click="toggleSidebar"
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
          <div class="" :key="`type_${i}`">
            <h3 class="mb-3">{{ item.title }}</h3>
            <div class="grid grid-flow-row grid-cols-3">
              <SideBarItem
                v-for="(child, j) of item.children"
                :key="`sidebarItem_${i}_${j}`"
                :shape="item.shape"
                :type="item.type"
                :child-detail="child"
              />
            </div>
          </div>
          <el-divider v-if="i !== sideBarLists.length - 1" :key="`divider_${i}`"></el-divider>
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
      isOpen: true,
      sideBarLists: [
        {
          title: '未來事件',
          type: 'event',
          shape: 'square',
          children: [
            {
              icon: 'fa-solid fa-computer-mouse',
              iconUnicode: '\uf8cc',
              name: '未來事件',
              connectType: 'normal',
              endpoints: [{}]
            }
          ]
        },
        {
          title: '歷史資料',
          type: 'history',
          shape: 'square',
          children: [
            {
              icon: 'fa-solid fa-computer-mouse',
              iconUnicode: '\uf8cc',
              name: '受眾包條件匯入',
              connectType: 'normal',
              endpoints: [{}]
            },
            {
              icon: 'fa-solid fa-computer-mouse',
              iconUnicode: '\uf8cc',
              name: '會員基本資料',
              connectType: 'normal',
              endpoints: [{}]
            },
            {
              icon: 'fa-solid fa-computer-mouse',
              iconUnicode: '\uf8cc',
              name: '會員貢獻度',
              connectType: 'normal',
              endpoints: [{}]
            },
            {
              icon: 'fa-solid fa-computer-mouse',
              iconUnicode: '\uf8cc',
              name: '歷史事件',
              connectType: 'normal',
              endpoints: [{}]
            },
            {
              icon: 'fa-solid fa-computer-mouse',
              iconUnicode: '\uf8cc',
              name: '歷史標籤',
              connectType: 'normal',
              endpoints: [{}]
            }
          ]
        },
        {
          title: '出口',
          type: 'export',
          shape: 'square',
          children: [
            {
              icon: 'fa-solid fa-computer-mouse',
              iconUnicode: '\uf8cc',
              name: 'EDM',
              connectType: 'normal',
              endpoints: [{}]
            },
            {
              icon: 'fa-solid fa-computer-mouse',
              iconUnicode: '\uf8cc',
              name: 'SMS',
              connectType: 'normal',
              endpoints: [{}]
            },
            {
              icon: 'fa-solid fa-computer-mouse',
              iconUnicode: '\uf8cc',
              name: 'Web Notify',
              connectType: 'normal',
              endpoints: [{}]
            },
            {
              icon: 'fa-solid fa-computer-mouse',
              iconUnicode: '\uf8cc',
              name: 'Line Flex',
              connectType: 'normal',
              endpoints: [{}]
            }
          ]
        },
        {
          title: '篩選',
          type: 'filter',
          shape: 'diamond',
          children: [
            {
              icon: 'fa-solid fa-stopwatch',
              iconUnicode: '\uf2f2',
              name: '資料篩選',
              connectType: 'condition',
              endpoints: [{ type: 'yes' }, { type: 'no' }]
            },
            {
              icon: 'fa-solid fa-stopwatch',
              iconUnicode: '\uf2f2',
              name: 'EDM 開封',
              connectType: 'condition',
              endpoints: [{ type: 'yes' }, { type: 'no' }]
            },
            {
              icon: 'fa-solid fa-stopwatch',
              iconUnicode: '\uf2f2',
              name: '事件觸發',
              connectType: 'condition',
              endpoints: [{ type: 'yes' }, { type: 'no' }]
            }
          ]
        },
        {
          title: '控制',
          type: 'control',
          shape: 'diamond',
          children: [
            {
              icon: 'fa-solid fa-stopwatch',
              iconUnicode: '\uf2f2',
              name: 'A/B Test',
              connectType: 'abTest',
              endpoints: [{ type: 'a' }, { type: 'b' }]
            },
            {
              icon: 'fa-solid fa-stopwatch',
              iconUnicode: '\uf2f2',
              name: '時間',
              connectType: 'normal',
              endpoints: [{ type: 'normal' }]
            },
            {
              icon: 'fa-solid fa-stopwatch',
              iconUnicode: '\uf2f2',
              name: '智能推薦',
              connectType: 'normal',
              endpoints: [{ type: 'normal' }]
            },
            {
              icon: 'fa-solid fa-stopwatch',
              iconUnicode: '\uf2f2',
              name: '一對多',
              connectType: 'oneToMulti',
              endpoints: [{}, {}, {}, {}, {}]
            },
            {
              icon: 'fa-solid fa-stopwatch',
              iconUnicode: '\uf2f2',
              name: '多對一',
              connectType: 'multiToOne',
              endpoints: [{}, {}, {}, {}, {}]
            }
          ]
        },
        {
          title: '特殊',
          type: 'special',
          shape: 'circle',
          children: [
            {
              icon: 'fa-solid fa-microphone',
              iconUnicode: '\uf130',
              name: '上標籤',
              nodeType: 'addTag',
              connectType: 'normal',
              connectExcludeType: ['addTag'],
              endpoints: [{}]
            }
          ]
        }
      ]
    }
  },
  methods: {
    toggleSidebar() {
      this.isOpen = !this.isOpen
      this.$emit('sidebar-toggle', this.isOpen)
    }
  }
}
</script>

<style></style>
