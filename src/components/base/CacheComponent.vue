<template>
  <!-- <keep-alive>
    <component :is="cacheComponent" :key="fullPath" />
  </keep-alive> -->
  <!-- {{cacheComponent}} -->
</template>

<script setup lang="ts">
import useAdminTabs from "@/modules/adminTabs/useAdminTabs";
import type { RendererElement, RendererNode, VNode } from "vue";

const { fullPath, component } = defineProps<{
  component: VNode<
    RendererNode,
    RendererElement,
    {
      [key: string]: any;
    }
  >;
  fullPath: string;
}>();

const adminTabs = useAdminTabs();

const cacheComponent = adminTabs.addComponent(fullPath, component);
</script>

<style scoped></style>
