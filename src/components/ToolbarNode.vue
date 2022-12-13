<script setup lang="ts">
import { Position, useVueFlow } from '@vue-flow/core'
import { NodeToolbar } from '@vue-flow/node-toolbar'
import {
  Plus,
  Link,
  Minus
} from '@element-plus/icons-vue'
import { getNewEdge, getNewNode, getNewCondition } from './inital-elements';

interface Props {
  id: string
  data: any
  position: any
  label?: any
}

const props = defineProps<Props>()

const { nodes, addNodes, addEdges } = useVueFlow()

const addNode = () => {
  const id = nodes.value.length + 1
  const parentId = +props.id

  const newNode = getNewNode(id, props.position)
  const newEdge = getNewEdge(id, parentId)

  addNodes([newNode])
  addEdges([newEdge])
}

const addCondition = () => {
  const id = nodes.value.length + 1
  const parentId = +props.id

  const newNode = getNewCondition(id, props.position)
  const newEdge = getNewEdge(id, parentId)

  addNodes([newNode])
  addEdges([newEdge])

  addNodesWhenAddCondition()
}

const addNodesWhenAddCondition = () => {
  const id = nodes.value.length

  for (let index = 1; index <= 2; index++) {
    const tempNode = {
      id: `${id + index}`,
      type: 'toolbar',
      label: `Node ${id + index}`,
      position: { 
        x: index === 1 ? props.position.x + 50 : -(props.position.x + 50),
        y: props.position.y + 150 * 2
      },
      data: { toolbarPosition: Position.Bottom },
      style: {
        border: '1px solid #10b981',
        background: '#ef467e',
        color: 'white',
        borderRadius: '99px',
      },
    }

    const tempEdge = {
      id: `e${id}-${id + index}`,
      source: `${id}`,
      target: `${id + index}`,
      type: 'smoothstep',
      label: index === 1 ? 'true' : 'false',
      labelShowBg: false
    }

    addNodes([tempNode])
    addEdges([tempEdge])
  }
}
</script>

<template>
  <NodeToolbar
    style="display: flex; gap: 0.5rem; align-items: center"
    :is-visible="data.toolbarVisible"
    :position="data.toolbarPosition"
  >
    <el-button type="primary" :icon="Plus" circle @click="addNode" />
    <el-button type="primary" :icon="Link" circle @click="addCondition" />
    <el-button type="danger" :icon="Minus" circle />
  </NodeToolbar>

  <div :style="{ padding: '10px 20px' }">
    {{ label }}
  </div>
</template>
