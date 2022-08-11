<template>

  <a-anchor-link v-for="catalogue in catalogueList" :href="catalogue.href" :title="catalogue.title">
    <CatalogueList :catalogueList="catalogue.children"/>
  </a-anchor-link>
</template>

<script setup lang="ts">
import {toRefs} from 'vue'
const props = defineProps<{
  catalogueList:any
}>()
const {catalogueList} = toRefs(props)
</script>

<style scoped></style>
