<script setup lang="ts">
import { ref } from 'vue'
import { useVueFlow, VueFlow } from '@vue-flow/core'
import { Controls } from '@vue-flow/additional-components'
import { initialElements } from '@/components/inital-elements'

const elements: any = ref(initialElements)

const { nodesDraggable } = useVueFlow()
</script>

<template>
  <div>
    <label class="label" for="draggable">
      nodesDraggable
      <input id="draggable" v-model="nodesDraggable" type="checkbox" class="vue-flow__draggable" />
    </label>
  </div>
  <VueFlow v-model="elements">
    <Controls />
  </VueFlow>
</template>

<style scoped>
.vue-flow {
  min-height: 100vh;
}
</style>
