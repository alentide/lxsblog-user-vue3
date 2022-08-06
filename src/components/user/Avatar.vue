<template>
  <a-avatar v-if="avatar" :src="avatar" />
  <a-avatar v-else :size="40">
    <template #icon>
      <UserOutlined />
    </template>
  </a-avatar>
</template>

<script setup lang="ts">
import { UserOutlined } from '@ant-design/icons-vue';
import {toRefs} from 'vue'

const props = defineProps({
    avatar: {
        default: '',
        type: String
    }
})
const {avatar} = toRefs(props)
</script>

<style scoped></style>
