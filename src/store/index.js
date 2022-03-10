import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const getConnectPositionOnShapeEdge = (fromX, fromY, toX, toY, radius) => {
  const dx = toX - fromX
  const dy = toY - fromY

  const angle = Math.atan2(-dy, dx)
  const x1 = fromX + -radius * Math.cos(angle + Math.PI)
  const y1 = fromY + radius * Math.sin(angle + Math.PI)
  const x2 = toX + -radius * Math.cos(angle)
  const y2 = toY + radius * Math.sin(angle)

  if (Math.pow(dx, 2) + Math.pow(dy, 2) - Math.pow(radius + radius, 2) < 4) {
    return [fromX, fromY, toX, toY]
  }
  return [x1, y1, x2, y2]
}
const store = new Vuex.Store({
  modules: {},
  state: {
    canvasLists: [],
    connectionLists: [],
    connector: {
      isConnecting: false,
      fromNodeType: '',
      fromUuid: '',
      fromPosition: { x: 0, y: 0 },
      toNodeType: '',
      toUuid: '',
      toPosition: { x: 0, y: 0 }
    }
  },
  getters: {
    computeAllConnection(state) {
      return state.canvasLists
        .map(node => {
          const { x: fromX, y: fromY } = node.nodeConfig
          return node.to.map((toNode, toNodeIndex) => {
            const { x: toX, y: toY } = toNode.position
            return {
              uuid: `${node.uuid}_CONNECT-${toNodeIndex}-${toNode.nodeUuid}`,
              points: getConnectPositionOnShapeEdge(fromX, fromY, toX, toY, 80)
            }
          })
        })
        .flat()
    }
  },
  mutations: {
    setCanvasLists(state, lists) {
      state.canvasLists = lists
    },
    toggleConnectorMode(state, status) {
      state.connector.isConnecting = status
    },
    setConnectorStartXY(state, { nodeUuid = '', position = { x: 0, y: 0 }, nodeType = '' }) {
      state.connector = {
        ...state.connector,
        fromUuid: nodeUuid,
        fromPosition: { ...position },
        fromNodeType: nodeType
      }
    },
    setConnectorEndXY(state, { nodeUuid = '', position = { x: 0, y: 0 }, nodeType = '' }) {
      state.connector = {
        ...state.connector,
        toUuid: nodeUuid,
        toPosition: { ...position },
        toNodeType: nodeType
      }
    },
    addConnection(state, connectionDetail) {
      state.connectionLists.push(connectionDetail)
    }
  },
  strict: process.env.NODE_ENV !== 'production'
})
export default store
