<template>
  <div class="wh100p xx">
    <a-table
      class="wh100p xxxx"
      :columns="columns"
      :data-source="currentList"
      :pagination="pagination"
      :loading="loading"
      @change="onTableChange"
    >
      <template #bodyCell="{ column, text, record }">
        <template v-if="['name'].includes(column.dataIndex)">
          <div @click="$router.push('/admin/tag/edit/' + record.id)">
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
import type { TagDfe } from "@/modules/tag/interfaces/TagDfe";
import RemoveIcon from "@/components/RemoveIcon.vue";

const columns = [
  {
    title: "名字",
    dataIndex: "name",
  },
  {
    title: "创建的时间",
    dataIndex: "createTimeDisplayed",
    sorter: true,
    sortDirections: ["descend", "ascend"],
    width: "180px",
  },
  {
    title: "操作",
    dataIndex: "operation",
    width: "100px",
  },
];
const { currentList, onTableChange, remove, pagination, loading } =
  usePageList<TagDfe>("/tags");
</script>

<style scoped></style>
