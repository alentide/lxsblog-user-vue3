<template>
  <ArticleForm />
</template>

<script setup lang="ts">
import { useAutoCreateArticleForm,useArticleNewForm } from "@/modules/article/useArticleForm";
import ArticleForm from "@/components/article/ArticleForm.vue";
import {provide,watch} from 'vue'
import router from "@/router";
import { watchDebounced } from '@vueuse/core'
const articleForm = useAutoCreateArticleForm()
provide('articleForm',articleForm)


const {form,save} = articleForm
watchDebounced(
  form,
  save,
  { debounce: 500, maxWait: 1000 ,deep:true},
)

</script>

<style scoped></style>
