<script setup lang="ts">
import { Position, Handle } from '@vue-flow/core'

defineProps(['label'])
</script>

<template>
  <div :style="{ padding: '0px 10px' }">
    {{ label }}
  </div>

  <Handle type="target" :position="Position.Left" class="tw-opacity-0" />
  <Handle type="source" :position="Position.Right" class="tw-opacity-0" />
</template>
