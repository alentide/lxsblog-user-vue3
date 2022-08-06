<template>
  <div ref="scrollX">
    <div>
      <slot name="header" />
      <slot v-for="item in list" :item="item" />
      <ListLoading />
      <ListEmpty />
    </div>
  </div>
</template>

<script setup lang="ts">
import ListLoading from "@/components/list/ListLoading.vue";
import ListEmpty from "@/components/list/ListEmpty.vue";

import { onReachBottom, useList } from "@/modules/list";
import { inject, ref } from "vue";

const { loading, hasMore, list ,nextPage} = inject("list", () => useList(""), true);

const scrollX = ref(null);
onReachBottom(nextPage, scrollX);
</script>

<style scoped ></style>
