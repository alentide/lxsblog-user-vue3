<template>
    <TagEdit />
</template>

<script setup lang="ts">
import useAdminTabs from '@/modules/adminTabs/useAdminTabs';
import { provide, watch } from 'vue';
import TagEdit from '@/components/tag/TagEdit.vue'
import { useTagEditForm } from '@/modules/tag/useTagEditForm';

const tagForm = useTagEditForm()
provide('tagForm',tagForm)


const adminTabs = useAdminTabs()
watch(
  () => tagForm.form.value.name,
  (newVal: string) => {
    adminTabs.currentTab.value.title=(newVal||'无标题')+'-编辑分类';
  },
);

</script>

<style scoped>

</style>