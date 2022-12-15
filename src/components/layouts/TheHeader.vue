<template>
  <el-menu
    class="tw-h-[60px]"
    mode="horizontal"
    :ellipsis="false"
  >
    <el-menu-item index="0" class="tw-ml-[40px]">
      <img src="logo.png" class="tw-w-[60px] tw-h-[60px]" />
    </el-menu-item>
    <div class="tw-grow"></div>
    <el-menu-item index="1">Docs</el-menu-item>

    <el-sub-menu index="2">
      <template #title>Components</template>
      <el-menu-item index="2-1">item one</el-menu-item>
      <el-menu-item index="2-2">item two</el-menu-item>
      <el-menu-item index="2-3">item three</el-menu-item>
      <el-sub-menu index="2-4">
        <template #title>item four</template>
        <el-menu-item index="2-4-1">item one</el-menu-item>
        <el-menu-item index="2-4-2">item two</el-menu-item>
        <el-menu-item index="2-4-3">item three</el-menu-item>
      </el-sub-menu>
    </el-sub-menu>
  </el-menu>
</template>
