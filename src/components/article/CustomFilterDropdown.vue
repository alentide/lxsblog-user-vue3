<template>
  <div style="padding: 8px">
    <a-input
      :placeholder="`搜索${column.title}`"
      :value="selectedKeys[0]"
      style="width: 188px; margin-bottom: 8px; display: block"
      @change="(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])"
      @pressEnter="handleSearch(selectedKeys, confirm, column.dataIndex)"
    />
    <a-button
      type="primary"
      size="small"
      style="width: 90px; margin-right: 8px"
      @click="handleSearch(selectedKeys, confirm, column.dataIndex)"
    >
      <template #icon><SearchOutlined /></template>
      搜索
    </a-button>
    <a-button
      size="small"
      style="width: 90px"
      @click="handleReset(clearFilters)"
    >
      重置
    </a-button>
  </div>
</template>

<script setup lang="ts">
import { inject, reactive, toRef, toRefs } from "vue";

const props = defineProps({
  setSelectedKeys: {
    type: Function,
    default: () => {},
  },
  selectedKeys: {
    type: Array,
    default: [],
  },
  confirm: {
    type: Function,
    default: () => {},
  },
  clearFilters: {
    type: Function,
    default: () => {},
  },
  column: {
    type: Object,
    default: {},
  },
});
const selectedKeys = toRef(props, "selectedKeys");
const column = toRef(props, "column");
const { confirm, clearFilters } = props;


const state = reactive({
    searchText: '',
    searchedColumn:'',
    
})

const handleSearch = (selectedKeys, confirm, dataIndex) => {

    console.log('selectedKeys, confirm, dataIndex',selectedKeys, confirm, dataIndex);
  confirm();
  state.searchText = selectedKeys[0];
  state.searchedColumn = dataIndex;
};

const handleReset = (clearFilters) => {
  clearFilters({ confirm: true });
  state.searchText = "";
};
</script>

<style scoped></style>
