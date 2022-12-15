<script setup lang="ts">
import { ref } from 'vue'
import { useVueFlow, VueFlow } from '@vue-flow/core'
import { initialElements } from '@/components/inital-elements';
import ToolbarNode from '@/components/ToolbarNode.vue'
import ConditionNode from '@/components/ConditionNode.vue'
import PropertiesNode from '@/components/PropertiesNode.vue'

const elements: any = ref(initialElements)
const isDrawer = ref(false)
const properties = ref()

const { onNodeDoubleClick } = useVueFlow()

onNodeDoubleClick((event: any) => {
  isDrawer.value = true
  properties.value = event.node
})

const updateLabel = (value: string) => {
  properties.value.label = value
}
</script>

<template>
  <vue-flow v-model="elements" fit-view-on-init>
    <template #node-toolbar="nodeProps">
      <toolbar-node v-bind="nodeProps" />
    </template>

    <template #node-condition="nodeProps">
      <condition-node v-bind="nodeProps" />
    </template>
  </vue-flow>

  <properties-node v-model="isDrawer" :label="properties?.label" @update-label="updateLabel" />
</template>

<style lang="scss" scoped>
@import '@/assets/styles/app.scss';
</style>
