<template>
    <CategoryEdit />
</template>

<script setup lang="ts">
import { useCategoryNewForm } from '@/modules/category/useCategoryNewForm';
import { provide } from 'vue';
import CategoryEdit from './components/CategoryEdit.vue'

const categoryForm = useCategoryNewForm()
provide('categoryForm',categoryForm)
</script>

<style scoped>

</style>