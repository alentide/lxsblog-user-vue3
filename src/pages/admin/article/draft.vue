<template>
  <div class="wh100p">
    <div class="my10">
      批量操作：
      <RemoveIcon
        type="primary"
        :disabled="matchOperationDisabled"
        :remove="removeSelected"
      />
      <a-popconfirm
        title="确定发布吗？"
        ok-text="是"
        cancel-text="否"
        @confirm="releaseMany"
      >
        <a-button
          :disabled="matchOperationDisabled"
          type="primary"
          class="ml10"
        >
          发布
        </a-button>
      </a-popconfirm>
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
        <template v-if="['title'].includes(column.dataIndex)">
          <div @click="go(record)">
            <span>{{ text || "无标题" }}</span>
          </div>
        </template>
        <template v-else-if="['category'].includes(column.dataIndex)">
          <a-tag v-if="text?.name" @click="go(record)" color="green">{{
            text?.name
          }}</a-tag>
        </template>
        <template v-else-if="['tags'].includes(column.dataIndex)">
          <a-tag
            class="my6"
            @click="go(record)"
            color="orange"
            v-for="tag in record.tags"
            >{{ tag.name }}</a-tag
          >
        </template>
        <template v-else-if="column.dataIndex === 'operation'">
          <RemoveIcon :remove="() => remove(record.id)" />
          <a-popconfirm
            title="确定发布吗？"
            ok-text="是"
            cancel-text="否"
            @confirm="() => release(record.id)"
          >
            <a-button type="link"> 发布 </a-button>
          </a-popconfirm>
        </template>
      </template>
    </a-table>
  </div>
</template>

<script setup lang="ts">
import useAdminTabs from "@/modules/adminTabs/useAdminTabs";
import type { ArticleDfe } from "@/modules/article/article.interfaces";
import { http } from "@/modules/http";
import { onMounted } from "vue";
import CustomFilterDropdown from "@/components/article/CustomFilterDropdown.vue";
import { useTableList } from "@/modules/list/useTableList.js";
import { FilterType } from "@/modules/list/useBaseTableList.js";
import { ArticleReleaseStatus } from "@/modules/article/ArticleReleaseStatus.js";

const adminTabs = useAdminTabs();
const go = (record: ArticleDfe) => {
  adminTabs.go("/admin/article/edit/" + record.id, record.title);
};

const {
  currentList,
  loading,
  refresh,
  pagination,
  onTableChange,
  matchOperationDisabled,
  remove,
  columns,
  rowSelection,
  removeSelected,
} = useTableList<ArticleDfe>("/articles", {
  filter: {
    releaseStatus: {
      value: [ArticleReleaseStatus.DRAFT],
      type: FilterType.SINGLE_EQUAL,
    },
  },
  columns: [
    {
      title: "标题",
      dataIndex: "title",
      key: "title",
      sorter: true,
      sortDirections: ["descend", "ascend"],
      width: "400px",
      customFilterDropdown: true,
      filterDownType: "search",
      filter: {
        value: "title",
        type: FilterType.SINGLE_LIKE,
      },
    },

    {
      title: "概述",
      dataIndex: "summary",
      key: "summary",
      width: "400px",
    },

    {
      title: "分类",
      dataIndex: "category",
      key: "category",
      sorter: true,
      sortKey: "name",
      sortDirections: ["ascend", "descend"],
      filter: {
        resource: "categories",
        value: "id",
        text: "name",
      },
      filterSearch: true,
      width: "100px",
    },
    {
      title: "标签",
      dataIndex: "tags",
      key: "tags",
      width: "200px",
      filter: {
        resource: "tags",
        value: "id",
        text: "name",
      },
      filterSearch: true,
    },

    {
      title: "创建的时间",
      dataIndex: "createTimeDisplayed",
      key: "createTimeDisplayed",
      sorter: true,
      sortDirections: ["ascend", "descend"],
      width: "150px",
    },
    {
      title: "更新的时间",
      dataIndex: "updateTime",
      key: "updateTime",
      sorter: true,
      sortDirections: ["ascend", "descend"],
      width: "150px",
    },
    {
      title: "操作",
      dataIndex: "operation",
      key: "operation",
      width: "100px",
    },
  ],
});

onMounted(refresh);

/**
 * 发布
 */
const release = (id: number) => {
  return http.patch("/articles/release/" + id).then(refresh);
};

const releaseMany = () => {
  return http.patch("/articles/release", {
    ids: rowSelection.selectedRowKeys,
  }).then(refresh);
};
</script>

<style scoped lang="scss"></style>
