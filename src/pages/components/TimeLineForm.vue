<template>
  <!-- <a-modal
    v-model:visible="visible"
    title="添加新的时间线节点"
    wrap-class-name="full-modal"
    :footer="null"
  >
    <a-form :model="form" name="basic" autocomplete="on">
      <a-form-item
        label="标题"
        name="title"
        :rules="[{ required: true, message: '请输入标题！' }]"
      >
        <a-input v-model:value="form.title" />
      </a-form-item>

      <a-form-item
        label="内容"
        name="content"
        :rules="[{ required: true, message: '请输入内容！' }]"
      >
        <a-input v-model:value="form.content" />
      </a-form-item>

      <a-form-item>
        <a-button
          type="primary"
          html-type="submit"
          :loading="loading"
          @click="save(form)"
          >保存</a-button
        >
      </a-form-item>
    </a-form>
  </a-modal> -->
</template>

<script setup lang="ts">
import { inject} from "vue";



// const props = defineProps<{
//   form: TimeLineItems;
// }>();

// const emit = defineEmits(["after-save"]);

// const {form,save,loading,visible,hide,show,clear,} = inject('timeLineForm',()=>useTimeLineForm())
</script>

<style scoped></style>
