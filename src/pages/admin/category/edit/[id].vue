<template>
    <CategoryEdit />
</template>

<script setup lang="ts">
import useAdminTabs from '@/modules/adminTabs/useAdminTabs';
import { useCategoryEditForm } from '@/modules/category/useCategoryEditForm';
import { provide, watch } from 'vue';
import CategoryEdit from './components/CategoryEdit.vue'

const categoryForm = useCategoryEditForm()
provide('categoryForm',categoryForm)


const adminTabs = useAdminTabs()
watch(
  () => categoryForm.form.value.name,
  (newVal: string) => {
    adminTabs.currentTab.value.title=(newVal||'无标题')+'-编辑分类';
  },
);

</script>

<style scoped>

</style>