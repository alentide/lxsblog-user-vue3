<template>
  <div>
    <div class="xyc my20">
      <a-button type="primary" size="small" @click="visible = true"
        >添加时间线节点</a-button
      >
    </div>
    <TimeLines />
    <!-- <TimeLineForm /> -->
  </div>
</template>

<script setup lang="ts">
import useTimeLine from "@/modules/timeLine/useTimeLine";
import { onMounted, provide, reactive, ref } from "vue";
import { pipe, andThen, reduce } from "ramda";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons-vue";
import useToast from "@/modules/toast/useToast";
import TimeLineForm from "./components/TimeLineForm.vue";

import TimeLines from './components/TimeLines.vue'


const visible = ref(false);
/**
 * 隐藏表单
 */
const hide = () => (visible.value = false);

// const { refresh, timeLineItems, add: _add, addLoading,remove:_remove } = useTimeLine();


// const {success} = useToast();
// const successRes = (res)=>success(res.msg)
// const remove = pipe(
//   _remove,
//   andThen(successRes)
// )


// provide('timeLineForm',useTimeLineForm())




// onMounted(() => {
//   refresh();
// });
</script>

<style scoped lang="scss">
.page-x {
  width: 100%;
  min-height: calc(100vh - 64px - 70px);
}
</style>
