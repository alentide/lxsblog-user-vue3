<template>
  <div class="wh100p">
    <div class="my10">
      批量操作：
      <RemoveIcon
        type="primary"
        :disabled="matchOperationDisabled"
        :remove="removeSelected"
      />
    </div>
    <a-table
      size="small"
      :pagination="pagination"
      @change="onTableChange"
      :columns="columns"
      :data-source="currentList"
      bordered
      :loading="loading"
      class="ovflat"
      :row-selection="rowSelection"
    >
      <template #bodyCell="{ column, text, record }">
        <template v-if="['name'].includes(column.dataIndex)">
          <div @click="$router.push('/admin/category/edit/' + record.id)">
            <span>{{ text }}</span>
          </div>
        </template>

        <template v-else-if="column.dataIndex === 'operation'">
          <RemoveIcon :remove="() => remove(record.id)" />
        </template>
      </template>
    </a-table>
  </div>
</template>

<script setup lang="ts">
import { usePageList } from "@/modules/http/useList";
import type { CategoryDfe } from "@/modules/category/interfaces/CategoryDfe";
import RemoveIcon from "@/components/RemoveIcon.vue";
import { useTableList } from "@/modules/list/useTableList.js";
import { onMounted } from "vue";
import { FilterType } from "@/modules/list/useBaseTableList.js";

const {
  currentList,
  rowSelection,
  columns,
  matchOperationDisabled,
  removeSelected,
  onTableChange,
  remove,
  refresh,
  pagination,
  loading,
} = useTableList<CategoryDfe>("/categories", {
  columns: [
    {
      title: "名字",
      dataIndex: "name",
      customFilterDropdown: true,
      filterDownType: "search",
      ellipsis: true,
      fixed: "left",
      filter: {
        value: "name",
        type: FilterType.SINGLE_LIKE,
      },
    },
    {
      title: "创建的时间",
      dataIndex: "createTimeDisplayed",
      sorter: true,
      sortDirections: ["descend", "ascend"],
      width: "180px",
    },
    {
      title: "更新的时间",
      dataIndex: "updateTime",
      sorter: true,
      sortDirections: ["descend", "ascend"],
      width: "180px",
    },
    {
      title: "操作",
      dataIndex: "operation",
      width: "100px",
    },
  ],
});

onMounted(refresh);
</script>

<style scoped></style>
