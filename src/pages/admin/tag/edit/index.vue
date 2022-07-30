<template>
    <TagEdit />
</template>

<script setup lang="ts">
import { provide } from 'vue';
import TagEdit from '@/components/tag/TagEdit.vue'
import { useTagNewForm } from '@/modules/tag/useTagNewForm';

const tagForm = useTagNewForm()
provide('tagForm',tagForm)
</script>

<style scoped>

</style>