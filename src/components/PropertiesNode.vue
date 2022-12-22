<script setup lang="ts">
import { computed } from 'vue'
import JsonEditor from '@/components/pages/json-editor/JsonEditor.vue'

interface Props {
  label: string
}

interface Emits {
  (event: 'update-label', value: string): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const label = computed({
  get() {
    return props.label
  },
  set(value) {
    console.log(value, '=============value')
    emit('update-label', value)
  },
})
</script>

<template>
  <el-drawer v-model="$attrs.modelValue" title="Properties" direction="rtl" size="100%">
    <json-editor />
  </el-drawer>
</template>
