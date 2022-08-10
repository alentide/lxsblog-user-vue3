<template>
  <a-layout class="admin-page-x" style="background: #fff">
    <a-layout-sider width="200" style="background: #fff">
      <UserSiderNav />
    </a-layout-sider>
    <a-layout-content
      class="admin-content-x"
      :style="{
        background: '#fff',
        padding: '0 10px 24px',
        margin: 0,
      }"
    >
      <RouterView
        class="view-x"
        v-slot="{ Component, route }"
      >
        <component :is="Component" :key="route.fullPath" />
      </RouterView>
    </a-layout-content>
  </a-layout>
</template>

<script setup lang="ts">
import useAdminTabs from "@/modules/adminTabs/useAdminTabs";
import UserSiderNav from "@/components/user/UserSiderNav.vue";
// const current = ref("1");

const { tabs, current, go, remove, currentIndex } = useAdminTabs();

</script>

<style scoped lang="scss">
.admin-content-x {
  height: calc(100vh - 64px - 20px - 56px);
}

::v-deep(.ant-tabs-content-holder) {
  overflow-y: auto;
}

.admin-page-x {
  position: fixed;
  left: 0;
  right: 0;
  top: 64px;
  bottom: 0;
}

.view-x {
  height: 100%;
  overflow-y: auto;
}
</style>
