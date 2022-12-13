<script setup lang="ts">
defineProps(['label'])
</script>

<template>
  <div :style="{ padding: '0px 10px' }">
    {{ label }}
  </div>
</template>
