<template>
  <ArticleForm />
</template>

<script setup lang="ts">
import { useArticleNewForm } from "@/modules/article/useArticleForm";
import ArticleForm from "./components/ArticleForm.vue";
import {provide} from 'vue'

// const articleForm = useArticleNewForm()
provide('useArticleForm',useArticleNewForm)
</script>

<style scoped></style>
