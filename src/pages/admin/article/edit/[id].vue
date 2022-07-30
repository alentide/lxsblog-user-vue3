<template>
  <ArticleForm />
</template>

<script setup lang="ts">
import ArticleForm from './components/ArticleForm.vue';
import {provide, watch} from 'vue'
import { useArticleEditForm } from '@/modules/article/useArticleForm';
import { useRoute } from 'vue-router';
import {onMounted,onBeforeUnmount} from 'vue'

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