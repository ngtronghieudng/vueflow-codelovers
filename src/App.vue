<script setup lang="ts">
import { ref, watch } from 'vue'
import { useVueFlow, VueFlow } from '@vue-flow/core'
import type { Connection, GraphNode, NodeMouseEvent } from '@vue-flow/core/dist/types'
import { Controls } from '@vue-flow/additional-components'
import { initialElements, conditionNodes, approverNodes } from '@/components/inital-elements'
import { ElMessage } from 'element-plus'

const elements: any = ref(initialElements)
const value: any = ref('')
const options = ref([])

const { onNodeClick, nodesDraggable, addNodes, nodes, onPaneReady, onConnect, addEdges } =
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
  console.log(NodeMouseEvent.node.data)

  options.value = NodeMouseEvent.node.data
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
    data: [
      {
        label: 'TEAM LEAD',
        value: 1,
      },
      {
        label: 'PM',
        value: 2,
      },
      {
        label: 'BUL',
        value: 3,
      },
    ],
  }

  addNodes([newNode])
  approverNodes.push('' + id)
}

const addCondition = () => {
  const id = nodes.value.length + 1

  const newNode = {
    id: `${id}`,
    label: `Condition ${id}`,
    type: 'default',
    position: {
      x: 0,
      y: 0,
    },
    class: 'custom-border-node',
    style: (element: GraphNode) => {
      if (element.selected) return { boxShadow: 'none' }
    },
  }

  addNodes([newNode])
  conditionNodes.push('' + id)
}

watch(value, (newX) => {
  console.log(newX)
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
      <el-select v-model="value" placeholder="Select" size="large" class="selectBox">
        <el-option
          v-for="item in options"
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
