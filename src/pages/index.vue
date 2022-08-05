<template>
  <div class="user-page-content-x">
    <div class="xyc my20">
      <a-button type="primary" size="small" @click="openCreate"
        >添加时间线节点</a-button
      >
    </div>
    <TimeLines />
    <TimeLineForm />
  </div>
</template>

<script setup lang="ts">
import { onReachBottom } from "@/modules/list";
import useTimeLineForm from "@/modules/timeLine/useTimeLineForm";
import useTimeLines from "@/modules/timeLine/useTimeLines";
import { onMounted, provide, reactive, ref, onBeforeUnmount } from "vue";

import TimeLineForm from "./components/TimeLineForm.vue";
import TimeLines from "./components/TimeLines.vue";

const timeLineForm = useTimeLineForm();
const save = timeLineForm.save;
timeLineForm.save = async () => {
  const res = await save();
  timeLines.add(res);
  return res;
};
provide("timeLineForm", timeLineForm);
const { openCreate, openEdit } = timeLineForm;

const timeLines = useTimeLines();
provide("timeLines", timeLines);

onReachBottom(timeLines.nextPage);


</script>

<style scoped lang="scss">
.page-x {
  width: 100%;
  min-height: calc(100vh - 64px - 70px);
}
</style>
