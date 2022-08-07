<template>
    <div class="list-loading-x">
         <a-spin :spinning="loading"/>
    </div>
    <slot v-if="!loading" />
</template>

<script setup lang="ts">
import { useList } from '@/modules/list';
import { inject,reactive,ref,toRefs } from 'vue';

const {loading} = toRefs(inject('loading',()=>reactive({loading:ref(false)}),true))
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