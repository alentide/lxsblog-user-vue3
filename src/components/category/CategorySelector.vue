<template>
  <a-select
    v-model:value="value"
    show-search
    placeholder="请选择一个分类"
    style="width: 200px"
    :options="options"
    :filter-option="filterOption"
    @change="handleChange"
  ></a-select>
</template>

<script setup lang="ts">
import { adminHttp } from "@/modules/http";
import { useLoadingHoc } from "@/modules/utils/useLoadingHoc";
import { computed, onMounted, ref, toRefs, watch, type Ref } from "vue";
import type { CategoryDfe } from "@/modules/category/interfaces/CategoryDfe";

const props = defineProps<{
    modelValue?: {
      id:number,
      name:string,
    }
}>()

const emit = defineEmits(['update:modelValue'])
const {modelValue} = toRefs(props)

const value = ref()
watch(()=>modelValue,()=>{
  if(modelValue?.value?.id ){
    value.value=modelValue?.value.id
  }
    
},{
    immediate:true,
    deep:true
})

const {loading,loadingHoc} = useLoadingHoc()
const fetch = loadingHoc<typeof adminHttp.list<CategoryDfe>>(()=>adminHttp.list<CategoryDfe>('/categories'))
const list:Ref<CategoryDfe[]> = ref([])
const initDataAsync = async ()=>{
    const res = await fetch()
    list.value = res.data.list
}
const options = computed(()=>list.value.map(category=>({label: category.name,value: category.id})))
const handleChange = (value: number) => {
  emit('update:modelValue',{
    id: value,
    name: options.value.find(m=>m.value===value)?.label
  })
};
const filterOption = (input: string, option: any) => {
  return option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0;
  
};

onMounted(initDataAsync)
</script>

<style scoped></style>
