<script setup lang="ts">
import { ref, watch } from 'vue'
import { useVueFlow, VueFlow } from '@vue-flow/core'
import type { Connection, GraphNode, NodeMouseEvent } from '@vue-flow/core/dist/types'
import { Controls } from '@vue-flow/additional-components'
import { initialElements, conditionNodes, approverNodes, approver, condition } from '@/components/inital-elements'
import { ElMessage } from 'element-plus'

const elements: any = ref(initialElements)
const vm: any = ref('')
const approverSelect = ref([])
const nodeIdClicked: any = ref({})

const { onNodeClick, nodesDraggable, addNodes, nodes, onPaneReady, onConnect, addEdges, getNode } =
  useVueFlow()

onPaneReady(({ fitView }) => {
  fitView()
})
onConnect((connection: Connection) => {
  const { source, target } = connection || {}

  if (conditionNodes.includes(source) && conditionNodes.includes(target)) {
    ElMessage.error({
      message: `Can't connect 2 condition nodes`,
    })
    return
  }

  console.log('connect node =====', connection)
  addEdges([connection])
})
onNodeClick((NodeMouseEvent: NodeMouseEvent) => {
  console.log(NodeMouseEvent, '==== clicked')

  approverSelect.value = NodeMouseEvent.node.data
  nodeIdClicked.value = {
    id: NodeMouseEvent.node.id,
    type: NodeMouseEvent.node.type
  }
})

const addNode = () => {
  const id = nodes.value.length + 1

  const newNode = {
    id: `${id}`,
    label: `Node ${id}`,
    type: 'default',
    position: {
      x: 0,
      y: 0,
    },
    data: approver
  }

  addNodes([newNode])
  approverNodes.push('' + id)
}

const addCondition = () => {
  const id = nodes.value.length + 1

  const newNode = {
    id: `${id}`,
    label: `Condition ${id}`,
    type: 'condition',
    position: {
      x: 1000,
      y: 100,
    },
    class: 'custom-border-node',
    style: (element: GraphNode) => {
      if (element.selected) return { boxShadow: 'none' }
    },
    data: condition
  }

  addNodes([newNode])
  conditionNodes.push('' + id)
}

const updateNode = (newLabel: string) => {
  const node = getNode.value(nodeIdClicked.value.id)
  node.label = newLabel
}

watch(vm, (newValue: number) => {
  const arr = nodeIdClicked.value.type === 'condition' ? condition : approver

  const result = arr.find((element) => {
    return element.value === newValue
  })

  updateNode(result?.label)
})
</script>

<template>
  <el-row>
    <el-col :span="12">
      <div>
        <label class="label" for="draggable">
          Drag n Drop
          <input
            id="draggable"
            v-model="nodesDraggable"
            type="checkbox"
            class="vue-flow__draggable"
          />
        </label>
      </div>
    </el-col>

    <el-col :span="12" class="flex-right">
      <el-button type="primary" @click="addNode">Add node</el-button>
      <el-button type="warning" @click="addCondition">Add condition</el-button>
      <el-select v-model="vm" placeholder="Approver" size="large" class="selectBox">
        <el-option
          v-for="item in approverSelect"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </el-col>
  </el-row>

  <VueFlow v-model="elements">
    <Controls />
  </VueFlow>
</template>

<style lang="scss" scoped>
@import '@/assets/styles/app.scss';
</style>
