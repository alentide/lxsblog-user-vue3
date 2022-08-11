<template>
  <div style="padding: 8px" v-if="column.filterDownType === 'search'">
    <a-input
      :placeholder="`搜索${column.title}`"
      :value="selectedKeys[0]"
      style="width: 188px; margin-bottom: 8px; display: block"
      @change="(e:any) => setSelectedKeys(e.target.value ? [e.target.value] : [])"
      @pressEnter="handleSearch()"
    />
    <a-button
      type="primary"
      size="small"
      style="width: 90px; margin-right: 8px"
      @click="handleSearch()"
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
  <div v-else-if="column.filterDownType === 'date'">
    <a-range-picker :disabledDate="disabledDate" valueFormat="YYYY-MM-DD HH:mm:ss" :value="selectedKeys" @change="onDateRangeChange" />
  </div>
</template>

<script setup lang="ts">
import { SearchOutlined } from "@ant-design/icons-vue";
import { inject, reactive, ref, toRef, toRefs } from "vue";
import type { Dayjs } from "dayjs";
import dayjs from "dayjs";
// import dayjs from "ant-design-vue/es/time-picker/dayjs.js";

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
const selectedKeys:any = toRef(props, "selectedKeys");
const column = toRef(props, "column");
const { confirm, clearFilters } = props;

const state = reactive({
  searchText: "",
  searchedColumn: "",
});

const handleSearch = () => {
  confirm();
  state.searchText = selectedKeys[0];
  // state.searchedColumn = dataIndex;
};

const handleReset = (clearFilters:any) => {
  clearFilters({ confirm: true });
  state.searchText = "";
};

const transformDateRangeForAntDesign = (dateRange:[string,string])=>{
  return dateRange.map(m=>dayjs(m))
}

const disabledDate = (currentDate: ReturnType<typeof dayjs>) => {
  
  return currentDate.isAfter('2022-01-01', 'year')
}

const onDateRangeChange = (
  dates: [string, string],
  dateStrings: [string, string]
) => {
  const [start,end] =dates

  props.setSelectedKeys([start.split(' ')[0]+' 00:00:00' ,end.split(' ')[0]+' 23:59:59'])
  confirm()
};
</script>

<style scoped></style>
