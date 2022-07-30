<template>
  <ArticleForm />
</template>

<script setup lang="ts">
import ArticleForm from '@/components/article/ArticleForm.vue';
import {provide,} from 'vue'
import { useArticleEditForm } from '@/modules/article/useArticleForm';

import { watchDebounced } from '@vueuse/core'



const articleForm = useArticleEditForm()

provide('articleForm',articleForm)

const {form,save} = articleForm




watchDebounced(
  form,
  save,
  { debounce: 500, maxWait: 1000 ,deep:true},
)


</script>

<style scoped>

</style>