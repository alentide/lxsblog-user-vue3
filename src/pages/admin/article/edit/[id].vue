<template>
  <ArticleForm />
</template>

<script setup lang="ts">
import ArticleForm from './components/ArticleForm.vue';
import {provide} from 'vue'
import { useArticleEditForm } from '@/modules/article/useArticleForm';
import { useRoute } from 'vue-router';
import {onMounted} from 'vue'


// const articleForm = useArticleEditForm()

provide('useArticleForm',useArticleEditForm)
</script>

<style scoped>

</style>