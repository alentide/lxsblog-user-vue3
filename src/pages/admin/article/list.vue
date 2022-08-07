<template>
  <div class="content-x">
    <div class="top-action">
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
      @resizeColumn="handleResizeColumn"
      :scroll="{ x: 0 }"
      size="small"
      :pagination="pagination"
      @change="onTableChange"
      :columns="columns"
      :data-source="currentList"
      bordered
      :loading="loading"
      class="table-x"
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
import { adminHttp } from "@/modules/http";
import { onMounted } from "vue";
import CustomFilterDropdown from "@/components/article/CustomFilterDropdown.vue";
import { useTableList } from "@/modules/list/useTableList.js";
import { FilterType } from "@/modules/list/useBaseTableList.js";
import { ArticleReleaseStatus } from "@/modules/article/ArticleReleaseStatus.js";

const adminTabs = useAdminTabs();
const go = (record: ArticleDfe) => {
  adminTabs.go("/admin/article/edit/" + record.id, record.title);
};

const handleResizeColumn = (w, col) => {
  col.width = w;
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
      width: 200,
      resizable: true,
      customFilterDropdown: true,
      filterDownType: "search",
      ellipsis: true,
      fixed: "left",
      filter: {
        value: "title",
        type: FilterType.SINGLE_LIKE,
      },
    },
    {
      title: "概述",
      dataIndex: "summary",
      key: "summary",
      width: 200,
      resizable: true,
      ellipsis: true,
    },
    {
      title: "状态",
      dataIndex: "releaseStatus",
      key: "releaseStatus",
      width: 100,
      filter: {
        value: "releaseStatus",
        type: FilterType.IN_ARRAY,
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
      ellipsis: true,
      filter: {
        resource: "categories",
        value: "id",
        text: "name",
      },
      filterSearch: true,
      width: 100,
    },
    {
      title: "标签",
      dataIndex: "tags",
      key: "tags",
      width: 200,
      resizable: true,
      filter: {
        resource: "tags",
        value: "id",
        text: "name",
      },
      ellipsis: true,
      filterSearch: true,
    },

    {
      title: "创建的时间",
      dataIndex: "createTimeDisplayed",
      key: "createTimeDisplayed",
      sorter: true,
      sortDirections: ["ascend", "descend"],
      width: 150,
      ellipsis: true,
      customFilterDropdown: true,
      filterDownType: "date",
      filter: {
        value: "createTime",
        type: FilterType.BETWEEN,
      },
    },
    {
      title: "更新的时间",
      dataIndex: "updateTime",
      key: "updateTime",
      sorter: true,
      sortDirections: ["ascend", "descend"],
      width: 150,
      ellipsis: true,
      customFilterDropdown: true,
      filterDownType: "date",
      filter: {
        value: "updateTime",
        type: FilterType.BETWEEN,
      },
    },
    {
      title: "首次发布时间",
      dataIndex: "firstReleaseTime",
      key: "firstReleaseTime",
      sorter: true,
      sortDirections: ["ascend", "descend"],
      width: 150,
      ellipsis: true,
      customFilterDropdown: true,
      filterDownType: "date",
      filter: {
        value: "firstReleaseTime",
        type: FilterType.BETWEEN,
      },
    },
    {
      title: "最近一次发布时间",
      dataIndex: "lastReleaseTime",
      key: "lastReleaseTime",
      sorter: true,
      sortDirections: ["ascend", "descend"],
      width: 150,
      ellipsis: true,
      customFilterDropdown: true,
      filterDownType: "date",
      filter: {
        value: "lastReleaseTime",
        type: FilterType.BETWEEN,
      },
    },
    {
      title: "首次下架时间",
      dataIndex: "firstOffTime",
      key: "firstOffTime",
      sorter: true,
      sortDirections: ["ascend", "descend"],
      width: 150,
      ellipsis: true,
      customFilterDropdown: true,
      filterDownType: "date",
      filter: {
        value: "firstOffTime",
        type: FilterType.BETWEEN,
      },
    },
    {
      title: "最近一次下架时间",
      dataIndex: "lastOffTime",
      key: "lastOffTime",
      sorter: true,
      sortDirections: ["ascend", "descend"],
      width: 150,
      ellipsis: true,
      customFilterDropdown: true,
      filterDownType: "date",
      filter: {
        value: "lastOffTime",
        type: FilterType.BETWEEN,
      },
    },
    {
      title: "操作",
      dataIndex: "operation",
      key: "operation",
      width: 100,
      fixed: "right",
    },
  ],
});

onMounted(refresh);

/**
 * 发布
 */
const release = (id: number) => {
  return adminHttp.patch("/articles/release/" + id).then(refresh);
};

const releaseMany = async () => {
  await adminHttp.patch("/articles/release", {
    ids: rowSelection.selectedRowKeys,
  });
  return await refresh();
};

/**
 * 下架
 */
const off = (id: number) => {
  return adminHttp.patch("/articles/off/" + id);
};

const offMany = async () => {
  await adminHttp.patch("/articles/off", {
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

<style scoped lang="scss">
.content-x {
  display: flex;
  flex-direction: column;
}
.top-action {
  margin: 10px 0;
}

.table-x {
  flex: 1;
  overflow: auto;
}
</style>
