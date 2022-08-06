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

onMounted(() => {
    console.log('childrenMounted',instance);
    
})
const instance = getCurrentInstance()
onBeforeUnmount(() => {
  console.log('instance?.refs',instance);
  cacheViews.set(fullPath.value,cloneVNode(instance?.vnode))
})
</script>

<style lang="scss" scoped></style>
