<template>
  <a-layout style="background: #fff">
    <a-layout-sider width="200" style="background: #fff">
      <SiderNav />
    </a-layout-sider>
    <a-layout-content
      class="admin-content-x"
      :style="{
        background: '#fff',
        padding: '0 10px 24px',
        margin: 0,
      }"
    >
      <a-tabs
        hideAdd
        v-model:activeKey="current"
        @tabClick="go"
        type="editable-card"
        @edit="remove"
      >
        <a-tab-pane
          class="custom-pane"
          :key="tab.fullPath"
          :tab="tab.title"
          v-for="(tab, i) in tabs"
          style="display: none"
          :closable="tab.closable"
        >
        </a-tab-pane>
      </a-tabs>
      <RouterView
        style="height: 100%; background: #fff"
        v-slot="{ Component, route }"
      >
        <!-- <keep-alive>
          <component :is="Component" :key="route.fullPath" />
        </keep-alive> -->

        <component :is="Component" :key="route.fullPath" />

        <!-- <CacheComponent :component="Component" :fullPath="route.fullPath"/> -->
      </RouterView>
    </a-layout-content>
  </a-layout>
</template>

<script setup lang="ts">
import useAdminTabs from "@/modules/adminTabs/useAdminTabs";
import { ref } from "vue";
import SiderNav from "./admin/components/SiderNav.vue";
import CacheComponent from "@/components/base/CacheComponent.vue";
// const current = ref("1");

const { tabs, current, go, remove, currentIndex } = useAdminTabs();

</script>

<style scoped lang="scss">
.admin-content-x {
  height: calc(100vh - 118px - 70px - 48px);
}

::v-deep(.ant-tabs-content-holder) {
  overflow-y: auto;
}
</style>
