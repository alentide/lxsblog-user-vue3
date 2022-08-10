<template>
  <a-menu
    v-model:selectedKeys="selectedKeys"
    mode="inline"
    :style="{ height: '100%', borderRight: 0 }"
    @click="clickMenu"
  >
    <!-- <a-sub-menu :key="submenu.key" v-for="submenu in menu">
      <template #title>
        <span>
          {{ submenu.title }}
        </span>
      </template>
      
    </a-sub-menu> -->

    <a-menu-item v-for="menuItem in menu" :key="menuItem.key">{{
      menuItem.title
    }}</a-menu-item>
  </a-menu>
</template>

<script setup lang="ts">
import router from "@/router";
import { computed, onMounted, reactive, ref, type Ref,watch } from "vue";
import { useRoute } from "vue-router";
const route = useRoute()
const selectedKeys: Ref<string[]> = ref([]);
watch(
  () => route.fullPath,
  () => {
    selectedKeys.value = [route.fullPath];
  }
);


const menu = reactive([
  {
    key: "/user/setup/profile",
    title: "个人信息",
  },
  {
    key: "/user/setup/email",
    title: "修改邮箱",
  },
  {
    key: "/user/setup/password",
    title: "修改密码",
  },
]);
const clickMenu = ({ key }: { key: string }) => {
  router.push(key);
};
</script>

<style scoped></style>
