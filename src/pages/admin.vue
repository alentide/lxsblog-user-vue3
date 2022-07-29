<template>
  <a-layout>
    <a-layout-sider width="200"   style="background: #fff">
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
      <a-tabs style="height: 100%" hideAdd v-model:activeKey="current" @tabClick="go" type="editable-card" @edit="remove">
        <a-tab-pane class="custom-pane" :key="tab.fullPath" :tab="tab.title" v-for="tab in tabs" style="height: 100%"  >
          <RouterView v-if="tab.fullPath===current" style="height: 100%" />
        </a-tab-pane>
      </a-tabs>

      
    </a-layout-content>
  </a-layout>
</template>

<script setup lang="ts">
import useAdminTabs from "@/modules/adminTabs/useAdminTabs";
import { ref } from "vue";
import SiderNav from "./admin/components/SiderNav.vue";
// const current = ref("1");

const {tabs,current,go,remove} = useAdminTabs()

const edit = (e)=>{
  console.log(e);
  
}

</script>

<style scoped lang="scss">
.admin-content-x {
  height: calc(100vh - 118px - 70px - 48px);
}

::v-deep(.ant-tabs-content-holder){
  overflow-y: auto;
}
</style>
