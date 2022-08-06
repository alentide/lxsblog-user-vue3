<template>
  <div>
    <button @click="count--">-</button>
    {{ count }}
    <button @click="count++">+</button>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref,inject, getCurrentInstance,onBeforeUnmount, cloneVNode } from "vue";
const count = ref(0);

const cacheViews = inject('cacheViews')
const fullPath = inject('fullPath')


const instance = getCurrentInstance()
onBeforeUnmount(() => {
  cacheViews.set(fullPath.value,cloneVNode(instance?.vnode))
})
</script>

<style lang="scss" scoped></style>
