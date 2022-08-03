<template>
    <div class="list-loading-x">
         <a-spin :spinning="loading"/>
         <span v-if="!hasMore && list.length > 8">没有更多了</span>
    </div>
</template>

<script setup lang="ts">
import { useList } from '@/modules/list';
import { inject } from 'vue';

const {loading,hasMore,list} = inject('list',()=>useList(''),true)
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