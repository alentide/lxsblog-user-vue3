<template>
  <div class="user-page-content-x" style="background: #fff">
    <div>
      <h2 class="txtc py20">这里是时间线，记录我的最新想法~</h2>
      <div class="xyc my20" v-if="auth.isAdmin">
        <a-button type="primary" @click="openCreate">添加时间线节点</a-button>
      </div>
      <TimeLines />
      <TimeLineForm />
    </div>
  </div>
</template>

<script setup lang="ts">
import { auth } from "@/modules/auth";
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
  min-height: calc(100vh - var(--navHeight) - 70px);
}
</style>
