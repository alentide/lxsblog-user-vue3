<template>
  <div>
    <div v-if="isEdit">
        <a-input  v-model:value.number="value" />
        <a-button @click="confirm">确认</a-button>
        <a-button @click="cancel">取消</a-button>
    </div>
    <div v-else>
        {{ value }}
        <a-button type="link" @click="isEdit=true">编辑</a-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
const emit = defineEmits(['confirm'])
const props = defineProps<{
  value: any;
}>();


const isEdit = ref(false);
const value = ref(props.value);

watch(()=>props.value,()=>{
    value.value = props.value
})

const confirm = ()=>{
    emit('confirm',value.value)
    isEdit.value=false
}
const cancel = ()=>{
    isEdit.value = false
}
</script>

<style scoped></style>
