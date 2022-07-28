<template>
    <div class="list-loading-x">
         <a-spin :spinning="loading"/>
         <span v-if="!hasMore">没有更多了</span>
    </div>
</template>

<script setup lang="ts">
import { useList } from '@/modules/http/useList';
import { inject } from 'vue';

const {loading,hasMore} = inject('list',()=>useList(''),true)
</script>

<style scoped lang="scss">
.list-loading-x {
    display: flex;
    align-items: center;
    justify-content: center;
    color: #999;
    font-size: 12px;
}
</style>