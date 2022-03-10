<template>
  <v-group
    ref="nodeGroup"
    :config="nodeGroupConfig"
    @dragmove="handleDragNode"
    @mouseup="handleGroupMouseUp"
  >
    <!-- <v-group ref="controlGroup"> -->
    <BtnGroup btn-fill="#FEE2E2" :btn-rotate="-20" :btn-icon="'\uf2ed'" />
    <BtnGroup btn-fill="#DBEAFE" :btn-rotate="20" :btn-icon="'\uf013'" />
    <!-- </v-group> -->
    <v-group ref="shapeGroup">
      <v-circle ref="shape" :config="shapeConfig"></v-circle>
      <v-text ref="icon" :config="iconConfig"></v-text>
    </v-group>

    <Endpoint
      :parent-uuid="uuid"
      :endpoint-lists="endpoints"
      @mouse-enter-endpoint="handleStartConnecting"
      @mouse-leave-endpoint="handleEndConnecting"
      @start-draw-connect="handleStartDrawConnect"
    />
    <v-text ref="nameText" :config="nameTextConfig"></v-text>
  </v-group>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
import Endpoint from '../Endpoint.vue'
import BtnGroup from '../group/BtnGroup.vue'
export default {
  components: { Endpoint, BtnGroup },
  props: {
    nodeConfig: { type: Object, require: true },
    icon: String,
    iconUnicode: String,
    name: String,
    shape: String,
    type: String,
    uuid: String,
    endpoints: Array,
    nodeType: String
  },
  computed: {
    ...mapState({ StoreCanvasLists: 'canvasLists', StoreConnector: 'connector' }),
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
        radius: 70,
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
      nodeDraggable: true,
      timer: null
    }
  },
  methods: {
    ...mapMutations({
      StoreSetCanvasLists: 'setCanvasLists',
      StoreToggleConnectorMode: 'toggleConnectorMode',
      StoreSetConnectorStartXY: 'setConnectorStartXY',
      StoreSetConnectorEndXY: 'setConnectorEndXY'
    }),
    // 初始化節點名稱位置
    setNameTextPosition() {
      const nameTextEl = this.$refs.nameText.getNode()
      const shape = this.$refs.shape.getNode()
      const { x: shapeX, y: shapeY } = shape.getAbsolutePosition()

      nameTextEl.absolutePosition({
        x: shapeX - nameTextEl.width() / 2,
        y: shapeY + shape.height() / 2 + 20
      })
    },
    // 初始化 icon 位置至節點中央
    setIconPosition() {
      const { x: shapeX, y: shapeY } = this.$refs.shape.getNode().getAbsolutePosition()
      const icon = this.$refs.icon.getNode()
      icon.absolutePosition({
        x: shapeX - icon.width() / 2,
        y: shapeY - icon.height() / 2
      })
    },
    // 點擊 endpoint 開始連線時，切換節點的 draggable，避免節點移動
    handleStartConnecting() {
      this.$refs.nodeGroup.getNode().draggable(false)
    },
    handleEndConnecting() {
      this.$refs.nodeGroup.getNode().draggable(true)
    },
    // 將 xy 位置更新到節點資料中，並回傳新的 array
    updateNodePositionToLists() {
      const groupEl = this.$refs.nodeGroup.getNode()
      const deepCloneArr = JSON.parse(JSON.stringify(this.StoreCanvasLists))
      return deepCloneArr.map(node => {
        if (node.uuid === this.uuid) {
          node.nodeConfig = { ...node.nodeConfig, x: groupEl.x(), y: groupEl.y() }
        }

        node.to = node.to.map(toNode => {
          if (toNode.nodeUuid === this.uuid) {
            return { ...toNode, position: { x: groupEl.x(), y: groupEl.y() } }
          }
          return toNode
        })

        return node
      })
    },
    // 拖曳節點時，更新新的 xy 位置到 store資料中
    handleDragNode() {
      if (this.timer !== null) return
      this.timer = setTimeout(() => {
        clearTimeout(this.timer)
        this.timer = null
        this.StoreSetCanvasLists(this.updateNodePositionToLists())
      }, 40)
    },
    // 點擊 endpoint 開始拉連線，將 isConnecting 改 true 並儲存起點位置和 uuid
    handleStartDrawConnect() {
      const nodeGroupEl = this.$refs.nodeGroup.getNode()
      this.StoreToggleConnectorMode(true)
      this.StoreSetConnectorStartXY({
        nodeUuid: this.uuid,
        position: {
          x: nodeGroupEl.x(),
          y: nodeGroupEl.y()
        },
        nodeType: this.nodeType
      })
      this.StoreSetConnectorEndXY({
        nodeUuid: '',
        position: {
          x: nodeGroupEl.x(),
          y: nodeGroupEl.y()
        }
      })
    },
    handleGroupMouseUp() {
      const { isConnecting, fromUuid } = this.StoreConnector
      const nodeGroupEl = this.$refs.nodeGroup.getNode()
      if (!isConnecting) return
      if (fromUuid === this.uuid) return
      this.StoreSetConnectorEndXY({
        nodeUuid: this.uuid,
        position: {
          x: nodeGroupEl.x(),
          y: nodeGroupEl.y()
        }
      })
      this.connectToNode()
    },
    connectToNode() {
      const { fromUuid, fromPosition, toUuid, toPosition } = this.StoreConnector

      const deepClone = JSON.parse(JSON.stringify(this.StoreCanvasLists))
      const lists = deepClone.map(node => {
        // 找到連線起點的 node，將連線終點的 node uuid 加入 to array
        if (node.uuid === fromUuid) {
          node.to.push({ nodeUuid: toUuid, position: { ...toPosition } })
        }
        // 找到連線終點的 node，將連線起點的 node uuid 加入 to array
        if (node.uuid === toUuid) {
          node.from.push({ nodeUuid: fromUuid, position: { ...fromPosition } })
        }
        return node
      })

      this.StoreSetCanvasLists(lists)
    }
  },
  mounted() {
    this.setNameTextPosition()
    this.setIconPosition()

    // this.$refs.controlGroup.getNode().offsetY(100)
  }
}
</script>

<style></style>
