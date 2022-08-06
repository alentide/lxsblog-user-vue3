<template>
  <div>
    <button @click="count--">-</button>
    {{ count }}
    <button @click="count++">+</button>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
const count = ref(0);

onMounted(() => {
    console.log('childrenMounted',count);
    
})
</script>

<style lang="scss" scoped></style>
