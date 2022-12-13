<script setup lang="ts">
import { ref } from 'vue'
import { useVueFlow, VueFlow } from '@vue-flow/core'
import { Controls } from '@vue-flow/additional-components'
import { initialElements } from './components/inital-elements';
import ToolbarNode from '@/components/ToolbarNode.vue'
import ConditionNode from '@/components/ConditionNode.vue'
import PropertiesNode from '@/components/PropertiesNode.vue'

const elements: any = ref(initialElements)
const isDrawer = ref(false)
const properties = ref()

const { nodesDraggable, onNodeDoubleClick } = useVueFlow()

onNodeDoubleClick((event: any) => {
  isDrawer.value = true
  properties.value = event.node
})

const updateLabel = (value: string) => {
  properties.value.label = value
}
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

  <vue-flow v-model="elements" fit-view-on-init>
    <template #node-toolbar="nodeProps">
      <toolbar-node v-bind="nodeProps" />
    </template>

    <template #node-condition="nodeProps">
      <condition-node v-bind="nodeProps" />
    </template>

    <controls />
  </vue-flow>

  <properties-node v-model="isDrawer" :label="properties?.label" @update-label="updateLabel" />

</template>

<style lang="scss" scoped>
@import '@/assets/styles/app.scss';
</style>
