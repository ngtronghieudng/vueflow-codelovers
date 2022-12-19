<script setup lang="ts">
import Home from '@/components/pages/form-builder/Home.vue';
// import Preview from '@/views/Preview';
</script>

<template>
  <el-tabs v-model="activeName">
    <el-tab-pane label="Design" name="Design"><home/></el-tab-pane>
    <el-tab-pane label="Preview" name="Preview">preview</el-tab-pane>
  </el-tabs>
</template>