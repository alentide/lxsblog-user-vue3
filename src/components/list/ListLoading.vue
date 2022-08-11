<template>
  <div class="list-loading-x">
    <a-spin :spinning="injectList.loading" />
    <span v-if="!injectList.hasMore && injectList.list.length > 8"
      >没有更多了</span
    >
  </div>
</template>

<script setup lang="ts">
import { useList } from "@/modules/list";
import { inject, isReactive, reactive, type UnwrapRef } from "vue";
let injectList = inject("list", () => reactive(useList("")), true);
if (!isReactive(injectList)) {
  injectList = reactive(injectList);
}
</script>

<style scoped lang="scss">
.list-loading-x {
  display: flex;
  align-items: center;
  justify-content: center;
  color: #999;
  font-size: 12px;
  // padding: 20px 0;
  // background-color: #fff;
}
</style>
