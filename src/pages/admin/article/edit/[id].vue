<template>
  <ArticleForm />
</template>

<script setup lang="ts">
import ArticleForm from './components/ArticleForm.vue';
import {provide, watch} from 'vue'
import { useArticleEditForm } from '@/modules/article/useArticleForm';
import { useRoute } from 'vue-router';
import {onMounted,onBeforeUnmount} from 'vue'
import useAdminTabs from "@/modules/adminTabs/useAdminTabs";
import { watchDebounced } from '@vueuse/core'


const { currentTab } = useAdminTabs();

const articleForm = useArticleEditForm()

provide('articleForm',articleForm)

const {form,save} = articleForm


watch(
  () => form.value.title,
  (newVal: string) => {
    currentTab().title = newVal||'无标题';
  },
);

// watchDebounced(
//   form,
//   save,
//   { debounce: 500, maxWait: 1000 },
// )


</script>

<style scoped>

</style>