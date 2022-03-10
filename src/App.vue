<template>
  <div id="app">
    <section class="flex h-screen bg-gray-50" @mouseup="handleStageMouseUp">
      <div ref="wrapper" class="flex-grow" @dragover.stop.prevent @drop="handleDropNode">
        <v-stage ref="stage" @mousemove="handleDrawMove">
          <v-layer>
            <v-group>
              <v-arrow
                v-for="connection of StoreComputeAllConnection"
                :key="connection.uuid"
                ref="connection"
                :config="{ ...connectorConfig, points: connection.points }"
              ></v-arrow>
            </v-group>
          </v-layer>
          <v-layer>
            <v-arrow ref="connector" :config="connectorConfig"></v-arrow>
          </v-layer>
          <v-layer>
            <component
              v-for="node of StoreCanvasLists"
              :key="node.uuid"
              :is="componentsOfShape[node.shape]"
              v-bind="node"
            ></component>
          </v-layer>
        </v-stage>
      </div>
      <SideBar @sidebar-toggle="adjustCanvas" />
    </section>
  </div>
</template>

<script>
import SideBar from './components/SideBar.vue'
import CircleNode from './components/shape/CircleNode.vue'
import SquareNode from './components/shape/SquareNode.vue'
import DiamondNode from './components/shape/DiamondNode.vue'
import { v4 as uuidv4 } from 'uuid'
import { mapGetters, mapMutations, mapState } from 'vuex'
export default {
  components: { SideBar, CircleNode, SquareNode, DiamondNode },
  computed: {
    ...mapState({
      StoreCanvasLists: 'canvasLists',
      StoreConnector: 'connector'
    }),
    ...mapGetters({ StoreComputeAllConnection: 'computeAllConnection' }),
    connectorConfig() {
      const { fromPosition, toPosition } = this.StoreConnector
      return {
        points: [fromPosition.x, fromPosition.y, toPosition.x, toPosition.y],
        stroke: '#9CA3AF',
        strokeWidth: 3,
        lineCap: 'round',
        fill: '#9CA3AF'
      }
    },
    isDrawingConnection() {
      return this.StoreConnector.isConnecting
    }
  },
  data() {
    return {
      componentsOfShape: {
        square: 'SquareNode',
        diamond: 'DiamondNode',
        circle: 'CircleNode'
      },
      configOfType: {
        event: {
          fill: '#93C5FD'
        },
        history: {
          fill: '#C4B5FD'
        },
        export: {
          fill: '#FDA4AF'
        },
        filter: {
          fill: '#FDBA74'
        },
        control: {
          fill: '#FCD34D'
        },
        special: {
          fill: '#86EFAC'
        }
      },
      drawingTimer: null
    }
  },
  methods: {
    ...mapMutations({
      StoreSetCanvasLists: 'setCanvasLists',
      StoreSetConnectorEndXY: 'setConnectorEndXY',
      StoreToggleConnectorMode: 'toggleConnectorMode'
    }),
    // 設定畫布寬高
    adjustCanvas(isSidebarOpen) {
      this.$nextTick(() => {
        const sidebarWidth = isSidebarOpen ? 320 : 0
        const stage = this.$refs.stage.getNode()
        stage.height(this.$refs.wrapper.scrollHeight)
        stage.width(this.$refs.wrapper.scrollWidth - sidebarWidth)
      })
    },
    // 處理從 sidebar 拖曳節點進來的事件，將目標資料 push 入 canvasLists
    handleDropNode(e) {
      const data = JSON.parse(e.dataTransfer.getData('nodeData'))
      this.StoreSetCanvasLists([
        ...this.StoreCanvasLists,
        {
          ...data,
          uuid: uuidv4(),
          nodeConfig: { x: e.offsetX, y: e.offsetY, ...this.configOfType[data.type] },
          from: [],
          to: []
        }
      ])
    },
    // 處理畫線連結節點時，依照游標位置更新 ｘｙ
    handleDrawMove(e) {
      if (!this.isDrawingConnection) return
      if (this.drawingTimer !== null) return
      this.drawingTimer = setTimeout(() => {
        this.StoreSetConnectorEndXY({
          nodeUuid: '',
          position: { x: e.evt.offsetX, y: e.evt.offsetY }
        })
        clearTimeout(this.drawingTimer)
        this.drawingTimer = null
      }, 30)
    },
    handleStageMouseUp() {
      this.StoreToggleConnectorMode(false)
    }
  },
  watch: {
    connectorConfig: {
      handler() {
        this.$refs.connector.getNode().draw()
      },
      deep: true
    },
    isDrawingConnection(newVal) {
      this.$refs.connector.getNode().visible(newVal)
    }
  },
  mounted() {
    this.adjustCanvas(false)
  }
}
</script>
