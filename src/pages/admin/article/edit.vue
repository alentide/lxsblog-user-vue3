<template>
  <div style="height: 100%">
    <a-row style="height: 100%" justify="space-between">
      <a-col :span="11" style="height: 100%; width: 100%">
        <textarea placeholder="请输入内容" autofocus class="text-area" v-model="value"></textarea>
      </a-col>
      <a-col :span="11" style="height: 100%; width: 100%">
        <Markdown style="height: 100%" :source="value" />
      </a-col>
    </a-row>
  </div>
</template>

<script setup lang="ts">
import EasyMDE from "easymde";
import { onBeforeUnmount, onMounted, ref, watch } from "vue";
import Markdown from "vue3-markdown-it";

const element = ref(null);
const value = ref("");


watch(value,(newVal)=>{
    localStorage.setItem('caogao',newVal)
})
// onBeforeUnmount(() => {
//     localStorage.setItem('caogao',value.value)
// })

onMounted(() => {
    value.value = localStorage.getItem('caogao') || ''
  if (!element.value) return;

  const easyMDE = new EasyMDE({
    // toolbar: ["bold", "italic", "heading", "|", "quote"],
    element: element.value,
  });
});
</script>

<style scoped>
.text-area {
  height: 100%;
  width: 100%;
  resize: none;
  outline: none;
  border: none;

}
</style>
