<template>
  <a-layout>
    <a-layout-sider width="200" style="background: #fff">
      <SiderNav />
    </a-layout-sider>
    <a-layout-content
      class="admin-content-x"
      :style="{
        background: '#fff',
        padding: '24px',
        margin: 0,
      }"
    >
      <RouterView style="height:100%;"/>
    </a-layout-content>
  </a-layout>
</template>

<script setup lang="ts">
import SiderNav from "./admin/components/SiderNav.vue";
</script>

<style scoped lang="scss">
.admin-content-x {
  height: calc(100vh - 118px - 70px - 48px);
}
</style>
