<template>
            <a-popconfirm
              :title="title"
              ok-text="是"
              cancel-text="否"
              @confirm="remove"
            >
              <a-button danger v-if="type==='icon'">
                <template #icon><DeleteOutlined /></template>
              </a-button>
              <a-button danger type="link" v-else-if="type==='text'">
                删除
              </a-button>
            </a-popconfirm>
</template>

<script setup lang="ts">
import { DeleteOutlined } from "@ant-design/icons-vue";
import { toRefs } from "vue";
import { string } from "vue-types";
const props =defineProps({
    remove: {
        default: async ()=>{}
    },
    /**
     * icon,text
     */
    type: {
        type: String,
        default: 'text'
    },
    title: {
        type: String,
        default: '确定删除吗？'
    }
})
const {remove,type} = toRefs(props)

</script>

<style scoped>

</style>