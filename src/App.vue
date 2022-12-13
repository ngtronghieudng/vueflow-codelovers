<script setup lang="ts">
import { ref } from 'vue'
import { useVueFlow, VueFlow } from '@vue-flow/core'
import { Controls } from '@vue-flow/additional-components'
import { initialElements } from './components/inital-elements';
import ToolbarNode from '@/components/ToolbarNode.vue'
import ConditionNode from '@/components/ConditionNode.vue'

const elements: any = ref(initialElements)

const { nodesDraggable, onPaneReady } = useVueFlow()

onPaneReady(({ fitView }) => {
  fitView()
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
  </el-row>

  <VueFlow v-model="elements">
    <template #node-toolbar="nodeProps">
      <ToolbarNode v-bind="nodeProps" />
    </template>

    <template #node-condition="nodeProps">
      <ConditionNode v-bind="nodeProps" />
    </template>

    <Controls />
  </VueFlow>
</template>

<style lang="scss" scoped>
@import '@/assets/styles/app.scss';
</style>
