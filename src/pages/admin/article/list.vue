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
      <a-popconfirm
        title="确定下架吗？"
        ok-text="是"
        cancel-text="否"
        @confirm="offMany"
      >
        <a-button
          :disabled="matchOperationDisabled"
          type="primary"
          class="ml10"
        >
          下架
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
        <template v-else-if="['releaseStatus'].includes(column.dataIndex)">
          <a-switch
            checkedChildren="已发布"
            unCheckedChildren="已下架"
            :checkedValue="ArticleReleaseStatus.RELEASED"
            :unCheckedValue="ArticleReleaseStatus.OFF_SHELF"
            v-model:checked="record.releaseStatus"
            @change="(e) => onChangeArticleReleaseStatus(record.id, e)"
          />
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
      value: [ArticleReleaseStatus.OFF_SHELF, ArticleReleaseStatus.RELEASED],
      type: FilterType.IN_ARRAY,
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
      title: "状态",
      dataIndex: "releaseStatus",
      key: "releaseStatus",
      width: "100px",
      filter: {
        value: "releaseStatus",
        type: FilterType.SINGLE_EQUAL,
        options: [
          {
            value: ArticleReleaseStatus.RELEASED,
            text: "已发布",
          },
          {
            value: ArticleReleaseStatus.OFF_SHELF,
            text: "已下架",
          },
        ],
      },
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
  return http.patch("/articles/release/" + id);
};

const releaseMany = async () => {
  await http.patch("/articles/release", {
    ids: rowSelection.selectedRowKeys,
  });
  return await refresh();
};

/**
 * 下架
 */
const off = (id: number) => {
  return http.patch("/articles/off/" + id);
};

const offMany = async () => {
  await http.patch("/articles/off", {
    ids: rowSelection.selectedRowKeys,
  });
  return await refresh();
};

const onChangeArticleReleaseStatus = (
  id: number,
  value: ArticleReleaseStatus
) => {
  if (value === ArticleReleaseStatus.OFF_SHELF) {
    return off(id);
  } else if (value === ArticleReleaseStatus.RELEASED) {
    return release(id);
  }
};
</script>

<style scoped lang="scss"></style>
