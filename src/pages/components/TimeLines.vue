<template>
  <a-timeline mode="alternate">
    <a-timeline-item v-for="item in list" :color="item.iconColor">
      <a-popover>
        <template #content>
          <a-button-group>
            <a-popconfirm
              title="确定要删除这个时间线节点吗？"
              ok-text="是"
              cancel-text="否"
              @confirm="remove(item.id)"
            >
              <a-button class="mr10" danger>
                <template #icon><DeleteOutlined /></template>
              </a-button>
            </a-popconfirm>
            <a-button type="primary" @click="openEdit(item)">
              <template #icon><EditOutlined /></template>
            </a-button>
          </a-button-group>
          
        </template>
        <p>{{ item.content }}</p>
        <p style="color: #999">{{ item.createTimeDisplayed }}</p>
      </a-popover>
    </a-timeline-item>
  </a-timeline>
  <ListEmpty />
  <ListLoading />
</template>

<script setup lang="ts">
import { EditOutlined, DeleteOutlined } from "@ant-design/icons-vue";
import { onMounted, inject } from "vue";

import ListLoading from "@/components/list/ListLoading.vue";
import ListEmpty from "@/components/list/ListEmpty.vue";

import useTimeLines from "@/modules/timeLine/useTimeLines";
import timeLineRepo from "@/modules/timeLine/timeLineRepo";
import useTimeLineForm from "@/modules/timeLine/useTimeLineForm";

const { list, refresh, remove } = inject(
  "timeLines",
  () => useTimeLines(),
  true
);
onMounted(refresh);

const { openEdit } = inject("timeLineForm", useTimeLineForm(), true);
</script>

<style scoped></style>
