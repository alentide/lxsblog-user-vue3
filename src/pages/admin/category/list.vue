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
      :scroll="{ x: 0 }"
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
      <template
        #customFilterDropdown="{
          setSelectedKeys,
          selectedKeys,
          confirm,
          clearFilters,
          column,
        }"
      >
        <CustomFilterDropdown
          v-bind="{
            setSelectedKeys,
            selectedKeys,
            confirm,
            clearFilters,
            column,
          }"
        />
      </template>
      <template #bodyCell="{ column, text, record }">
        <template v-if="['name'].includes(column.dataIndex)">
          <div @click="$router.push('/admin/category/edit/' + record.id)">
            <span>{{ text }}</span>
          </div>
        </template>

        <template v-else-if="column.dataIndex === 'sort'">
          <EditColumn
            :value="text"
            @confirm="(e:number) => updateTagOrder(record.id, e)"
          />
        </template>

        <template v-else-if="column.dataIndex === 'operation'">
          <RemoveIcon :remove="() => remove(record.id)" />
        </template>
      </template>
    </a-table>
  </div>
</template>

<script setup lang="ts">
import { usePageList } from "@/modules/list";
import type { CategoryDfe } from "@/modules/category/interfaces/CategoryDfe";
import RemoveIcon from "@/components/RemoveIcon.vue";
import { useTableList } from "@/modules/list/useTableList.js";
import { onMounted } from "vue";
import { FilterType } from "@/modules/list/useBaseTableList.js";
import CustomFilterDropdown from "@/components/article/CustomFilterDropdown.vue";
import { loadingHoc } from "@/modules/loading/loadingHoc";
import { userHttp } from "@/modules/http";
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
      width: 200,
      ellipsis: true,
      customFilterDropdown: true,
      filterDownType: "search",
      fixed: "left",
      filter: {
        value: "name",
        type: FilterType.SINGLE_LIKE,
      },
    },
    {
      title: "排序",
      dataIndex: "sort",
      sorter: true,
      sortDirections: ["descend", "ascend"],
      width: "180px",
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

const updateTagOrder = loadingHoc(loading, async (id: number, sort: number) => {
  await userHttp.patch("categories/update-sort", {
    id,
    sort,
  });
  return refresh();
});
</script>

<style scoped></style>
