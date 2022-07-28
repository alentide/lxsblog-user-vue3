<template>
  <a-empty v-if="!hasMore && !loading && !list.length" description="暂无数据~~"/>
</template>

<script setup lang="ts">
import { useList } from "@/modules/http/useList";
import { inject } from "vue";

const { loading, hasMore ,list} = inject("list", () => useList(""), true);
</script>

<style scoped></style>
