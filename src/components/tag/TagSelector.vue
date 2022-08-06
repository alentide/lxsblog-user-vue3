<template>
  <a-select
    v-model:value="value"
    mode="multiple"
    show-search
    placeholder="请选择标签（多选）"
    style="width: 200px"
    :options="options"
    :filter-option="filterOption"
    @change="handleChange"
  ></a-select>
</template>

<script setup lang="ts">
import { adminHttp } from "@/modules/http";
import { useLoadingHoc } from "@/modules/utils/useLoadingHoc";
import type { SelectProps } from "ant-design-vue";
import { computed, onMounted, ref, toRefs, watch, type Ref } from "vue";
import type { TagDfe } from "@/modules/tag/interfaces/TagDfe";

const props = defineProps<{
    modelValue?: {
      id:number,
      name:string,
    }[]
}>()

const emit = defineEmits(['update:modelValue'])
const {modelValue} = toRefs(props)

const value:Ref<number[]> = ref([])
watch(()=>modelValue,()=>{
  if(modelValue?.value?.length ){
    value.value=modelValue?.value.map(m=>m.id)
  }
    
},{
    immediate:true,
    deep:true
})

const {loading,loadingHoc} = useLoadingHoc()
const fetch = loadingHoc<typeof adminHttp.list<TagDfe>>(()=>adminHttp.list<TagDfe>('/tags'))
const list:Ref<TagDfe[]> = ref([])
const initDataAsync = async ()=>{
    const res = await fetch()
    list.value = res.data.list
}
const options = computed(()=>list.value.map(category=>({label: category.name,value: category.id})))
const handleChange = (value: number[]) => {
  
  emit('update:modelValue',value.map(item=>({
    id:item,
    // name: options.value.find(m=>value.some(m1=>m.value))?.label
  })))
};
const filterOption = (input: string, option: any) => {
  return option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0;
  
};

onMounted(initDataAsync)
</script>

<style scoped></style>
