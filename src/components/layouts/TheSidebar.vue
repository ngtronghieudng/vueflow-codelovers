<script setup lang="ts">
import { ref } from 'vue'
import { Document, Menu as IconMenu, Location, Setting } from '@element-plus/icons-vue'
import { useRouter } from 'vue-router'

const isCollapse = ref(false)

const navItems = [
  {
    label: 'Workflow',
    to: '/workflow',
  },
  {
    label: 'Form Builder',
    to: '/form-builder',
  },
]

const router = useRouter()

const handleOpen = () => {}
const handleClose = () => {}

const nav = (path: string) => {
  router.push(path)
}
</script>

<template>
  <el-menu
    default-active="2"
    class="el-menu-vertical-demo sidebar-custom"
    :collapse="isCollapse"
    @open="handleOpen"
    @close="handleClose"
  >
    <el-menu-item index="2">
      <el-icon><icon-menu /></el-icon>
      <template #title><router-link to="/">Home</router-link></template>
    </el-menu-item>

    <el-sub-menu index="1">
      <template #title>
        <el-icon><location /></el-icon>
        <span>GEX</span>
      </template>

      <el-menu-item-group>
        <template v-for="item in navItems" :key="item.label">
          <el-menu-item @click="nav(item.to)">{{ item.label }}</el-menu-item>
        </template>
      </el-menu-item-group>
    </el-sub-menu>

    <el-menu-item index="3" disabled>
      <el-icon><document /></el-icon>
      <template #title>Navigator Three</template>
    </el-menu-item>
    <el-menu-item index="4">
      <el-icon><setting /></el-icon>
      <template #title>Navigator Four</template>
    </el-menu-item>
  </el-menu>
</template>

<style lang="scss">
.el-menu-item-group > .el-menu-item-group__title {
  padding: 0;
}

.el-menu-vertical-demo {
  min-height: calc(100vh - 60px);
}
</style>
