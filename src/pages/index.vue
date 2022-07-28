<template>
  <div>
    <div class="xyc my20">
      <a-button type="primary" size="small" @click="visible = true"
        >添加时间线节点</a-button
      >
    </div>
    <a-timeline mode="alternate">
      <a-timeline-item v-for="item in timeLineItems" :color="item.iconColor">
        <a-popover>
          <template #content>
            <a-card :title="item.title" style="width: 300px">
              <template #extra>
                <a-popconfirm
                  title="确定要删除这个时间线节点吗？"
                  ok-text="是"
                  cancel-text="否"
                  @confirm="remove(item.id)"
                >
                {{item.id}}
                  <a-button class="mr20" danger type="text" size="small">
                    <template #icon><DeleteOutlined /></template>
                  </a-button>
                </a-popconfirm>

                <a-button type="primary" shape="circle">
                  <template #icon><EditOutlined /></template>
                </a-button>
              </template>
              {{ item.content }}
            </a-card>
          </template>
          <p>{{ item.title }}</p>
          <p style="color: #999">{{ item.createTimeDisplayed }}</p>
        </a-popover>
      </a-timeline-item>
    </a-timeline>

    <TimeLineForm />
  </div>
</template>

<script setup lang="ts">
import useTimeLine from "@/modules/timeLine/useTimeLine";
import { onMounted, provide, reactive, ref } from "vue";
import { pipe, andThen, reduce } from "ramda";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons-vue";
import useToast from "@/modules/toast/useToast";
import TimeLineForm from "./components/TimeLineForm.vue";
const visible = ref(false);
/**
 * 隐藏表单
 */
const hide = () => (visible.value = false);

const { refresh, timeLineItems, add: _add, addLoading,remove:_remove } = useTimeLine();


const {success} = useToast();
const successRes = (res)=>success(res.msg)
const remove = pipe(
  _remove,
  andThen(successRes)
)


provide('timeLineForm',useTimeLineForm())




onMounted(() => {
  refresh();
});
</script>

<style scoped lang="scss">
.page-x {
  width: 100%;
  min-height: calc(100vh - 64px - 70px);
}
</style>
