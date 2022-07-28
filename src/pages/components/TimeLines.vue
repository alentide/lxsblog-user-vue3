<template>
  <a-timeline mode="alternate">
    <a-timeline-item
      v-for="item in timeLines.list.value"
      :color="item.iconColor"
    >
      <a-popover>
        <template #content>
          <a-card :title="item.title" style="width: 300px">
            <template #extra>
              <a-button-group>
                <a-popconfirm
                  title="确定要删除这个时间线节点吗？"
                  ok-text="是"
                  cancel-text="否"
                  @confirm="timeLines.remove(item.id)"
                >
                  <a-button class="mr10" danger>
                    <template #icon><DeleteOutlined /></template>
                  </a-button>
                </a-popconfirm>
                <a-button type="primary" @click="timeLineForm.openEdit(item)">
                  <template #icon><EditOutlined /></template>
                </a-button>
              </a-button-group>
            </template>
            {{ item.content }}
          </a-card>
        </template>
        <p>{{ item.title }}</p>
        <p style="color: #999">{{ item.createTimeDisplayed }}</p>
      </a-popover>
    </a-timeline-item>
  </a-timeline>
</template>

<script setup lang="ts">
import useTimeLineForm from '@/modules/timeLine/useTimeLineForm';
import useTimeLines from '@/modules/timeLine/useTimeLines';
import { EditOutlined, DeleteOutlined } from "@ant-design/icons-vue";
import { inject,onMounted} from "vue";

const timeLines =  inject('timeLines',()=>useTimeLines(),true)
const timeLineForm = inject('timeLineForm',()=>useTimeLineForm(),true)
onMounted(timeLines.refresh);

</script>

<style scoped></style>
