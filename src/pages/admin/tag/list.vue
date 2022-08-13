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

            <!-- <a-input
              v-if="editableData[record.key]"
              v-model:value="editableData[record.key][column.dataIndex]"
              style="margin: -5px 0"
            />
            <template v-else>
              {{ text }}
            </template> -->
          </div>
        </template>

        <template v-else-if="column.dataIndex === 'order'">
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
import type { TagDfe } from "@/modules/tag/interfaces/TagDfe";
import RemoveIcon from "@/components/RemoveIcon.vue";
import { useTableList } from "@/modules/list/useTableList.js";
import { onMounted, reactive, type UnwrapRef } from "vue";
import EditColumn from "@/components/form/EditColumn.vue";

import "@surely-vue/table/dist/index.less";
import { clone } from "ramda";
import { userHttp } from "@/modules/http";
import { loadingHoc } from "@/modules/loading/loadingHoc";

const editableData: UnwrapRef<Record<number, any>> = reactive({});
const edit = (id: number) => {
  editableData[id] = clone(
    currentList.value.filter((item) => id === item.id)[0]
  );
};
const save = (id: number) => {
  Object.assign(
    currentList.value.filter((item) => id === item.id)[0],
    editableData[id]
  );
  delete editableData[id];
};
const cancel = (id: number) => {
  delete editableData[id];
};

const {
  currentList,
  onTableChange,
  remove,
  pagination,
  loading,
  refresh,
  columns,
} = useTableList<TagDfe>("/tags", {
  columns: [
    {
      title: "名字",
      dataIndex: "name",
    },
    {
      title: "排序",
      dataIndex: "order",
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
      title: "操作",
      dataIndex: "operation",
      width: "100px",
    },
  ],
});

const updateTagOrder = loadingHoc(loading, async (id: number, order: number) => {
  console.log('id,order',id,order);
  await userHttp.patch("tags/update-sort", {
    id,
    order,
  });
  return refresh()
});

onMounted(refresh);
</script>

<style scoped></style>
