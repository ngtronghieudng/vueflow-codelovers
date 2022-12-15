<script setup lang="ts">
import TheHeader from '@/components/layouts/TheHeader.vue'
import TheSidebar from '@/components/layouts/TheSidebar.vue'
</script>

<template>
  <el-container>
    <el-header class="tw-text-center tw-p-0 tw-shadow-2xl tw-shadow-black">
      <the-header />
    </el-header>

    <el-container>
      <el-aside width="200px">
        <the-sidebar class="tw-bg-[#740fad] tw-rounded-tr-[50px]" />
      </el-aside>
      
      <el-main class="tw-bg-[#fcf6ff]">
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>