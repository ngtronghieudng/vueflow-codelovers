<script setup lang="ts">
import { MarkerType, Position, useVueFlow, Handle } from '@vue-flow/core'
import { NodeToolbar } from '@vue-flow/node-toolbar'
import {
  Plus,
  Link,
  Minus
} from '@element-plus/icons-vue'
import { getNewEdge, getNewNode, getNewCondition } from '@/components/inital-elements';

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

  addNodesWhenAddCondition(newNode)
}

const addNodesWhenAddCondition = (newNode: any) => {
  const id = nodes.value.length

  for (let index = 1; index <= 2; index++) {
    const tempNode = {
      id: `${id + index}`,
      type: 'toolbar',
      label: `Node ${id + index}`,
      position: { 
        x: index === 1 ? newNode.position.x + 10 : newNode.position.x + 200,
        y: index === 1 ? newNode.position.y + 200 : newNode.position.y + 38.2
      },
      data: { toolbarPosition: Position.Bottom },
      style: {
        border: '1px solid #fff',
        background: '#740fad',
        color: 'white',
        borderRadius: '99px',
      },
    }

    const tempEdge = {
      id: `e${id}-${id + index}`,
      source: `${id}`,
      target: `${id + index}`,
      type: 'smoothstep',
      label: index === 1 ? 'false' : 'true',
      labelShowBg: true,
      labelBgStyle: { fill: '#fcf6ff' },
      markerEnd: MarkerType.Arrow,
      style: { stroke: '#10b981' },
    }

    addNodes([tempNode])
    addEdges([tempEdge])
  }
}
</script>

<template>
  <node-toolbar
    style="display: flex; gap: 0.5rem; align-items: center"
    :is-visible="data.toolbarVisible"
    :position="data.toolbarPosition"
  >
    <el-button type="primary" :icon="Plus" circle @click="addNode" />
    <el-button type="primary" :icon="Link" circle @click="addCondition" />
    <el-button type="danger" :icon="Minus" circle />
  </node-toolbar>

  <div :style="{ padding: '10px 20px' }">
    {{ label }}
  </div>

  <Handle type="target" :position="Position.Left" class="tw-opacity-0" />
  <Handle type="source" :position="Position.Right" class="tw-opacity-0" />
</template>
