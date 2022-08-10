<template>
  <a-menu
    v-model:selectedKeys="selectedKeys"
    mode="inline"
    :style="{ height: '100%', borderRight: 0 }"
    @click="clickMenu"
  >
    <a-sub-menu :key="submenu.key" v-for="submenu in menu">
      <template #title>
        <span>
          <!-- <user-outlined /> -->
          {{ submenu.title }}
        </span>
      </template>
      <a-menu-item v-for="menuItem in submenu.children" :key="menuItem.key">{{
        menuItem.title
      }}</a-menu-item>
    </a-sub-menu>
  </a-menu>
</template>

<script setup lang="ts">
import useAdminMenu from "@/modules/adminMenu/useAdminMenu";
import useAdminTabs from "@/modules/adminTabs/useAdminTabs";
import router from "@/router";
import { computed, onMounted, ref, type Ref } from "vue";

const adminTabs = useAdminTabs();
const selectedKeys = computed(() => [adminTabs.current.value]);

const clickMenu = ({ key }: { key: string }) => {
  router.push(key);
};

const { fetchMenu, menu } = useAdminMenu();

onMounted(() => fetchMenu().then((data) => (menu.value = data)));
</script>

<style scoped></style>
