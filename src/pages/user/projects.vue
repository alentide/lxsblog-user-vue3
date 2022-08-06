<template>
    <div>
        <button @click="tabId===1?tabId = 2: tabId = 1">切换</button>
        {{tabId}}
        <NavigationView :fullPath="tabId+''">
            <component :is="Component" />
        </NavigationView>
    </div>
</template>

<script setup lang="ts">
import { Hello,H1 ,NavigationView} from '@/components/nav/NavigationView';
import { NavigationView2} from '@/components/nav/NavigationView2';
import TestNav from '@/components/nav/TestNav.vue';
import TestNav1 from '@/components/nav/TestNav1.vue';
import { ref,computed } from 'vue';
const H1Hello = H1(Hello)

const tabId = ref(1)
const Component = computed(()=>tabId.value===1?TestNav:TestNav1)
</script>

<style scoped>

</style>