<template>
  <div class="content-x">
        <div class="top-action">
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
        <!-- <template v-else-if="['releaseStatus'].includes(column.dataIndex)">
          <a-switch
            checkedChildren="已发布"
            unCheckedChildren="已下架"
            :checkedValue="ArticleReleaseStatus.RELEASED"
            :unCheckedValue="ArticleReleaseStatus.OFF_SHELF"
            v-model:checked="record.releaseStatus"
            @change="(e) => onChangeArticleReleaseStatus(record.id, e)"
          />
        </template> -->
        <template v-else-if="['article'].includes(column.dataIndex)">
          <a-tag v-if="text?.title" @click="go(record)" color="green">{{
            text?.title
          }}</a-tag>
        </template>
        <template v-else-if="['user'].includes(column.dataIndex)">
          <!-- <a-avatar :src="text.avatar" /> -->
          <div class="mx10" v-if="text.nickname" color="blue">{{ text.nickname }}</div>
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
import type { CommentDto } from "@/modules/comment";

const adminTabs = useAdminTabs();
const go = (record: CommentDto) => {
  adminTabs.go("/admin/article/edit/" + record.article.id, record.article.title);
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
} = useTableList<CommentDto>("/comments", {
  //   filter: {
  //     releaseStatus: {
  //       value: [ArticleReleaseStatus.OFF_SHELF, ArticleReleaseStatus.RELEASED],
  //       type: FilterType.IN_ARRAY,
  //     },
  //   },
  columns: [
    {
      title: "内容",
      dataIndex: "content",
      key: "content",
      sorter: true,
      sortDirections: ["descend", "ascend"],
      width: 200,
      resizable: true,
      customFilterDropdown: true,
      filterDownType: "search",
      ellipsis: true,
      fixed: "left",
      filter: {
        value: "content",
        type: FilterType.SINGLE_LIKE,
      },
    },
    {
      title: "文章",
      dataIndex: "article",
      key: "article",
      width: 200,
      sorter: true,
      sortKey: "title",
      sortDirections: ["ascend", "descend"],

      resizable: true,
      ellipsis: true,
      customFilterDropdown: true,
      filterDownType: "search",
      filter: {
        resource: "articles",
        value: "title",
        type: FilterType.SINGLE_LIKE,
        options: [],
      },
    },
    {
      title: "用户",
      dataIndex: "user",
      key: "user",
      width: 100,
      sorter: true,
      sortKey: "nickname",
      sortDirections: ["ascend", "descend"],
      resizable: true,
      ellipsis: true,
      customFilterDropdown: true,
      filterDownType: "search",
      filter: {
        resource: "user",
        value: "nickname",
        type: FilterType.SINGLE_LIKE,
        options: [],
      },
    },
    // {
    //   title: "状态",
    //   dataIndex: "releaseStatus",
    //   key: "releaseStatus",
    //   width: 100,
    //   filter: {
    //     value: "releaseStatus",
    //     type: FilterType.IN_ARRAY,
    //     options: [
    //       {
    //         value: ArticleReleaseStatus.RELEASED,
    //         text: "已发布",
    //       },
    //       {
    //         value: ArticleReleaseStatus.OFF_SHELF,
    //         text: "已下架",
    //       },
    //     ],
    //   },
    // },

    // {
    //   title: "分类",
    //   dataIndex: "category",
    //   key: "category",
    //   sorter: true,
    //   sortKey: "name",
    //   sortDirections: ["ascend", "descend"],
    //   ellipsis: true,
    //   filter: {
    //     resource: "categories",
    //     value: "id",
    //     text: "name",
    //   },
    //   filterSearch: true,
    //   width: 100,
    // },
    // {
    //   title: "标签",
    //   dataIndex: "tags",
    //   key: "tags",
    //   width: 200,
    //   resizable: true,
    //   filter: {
    //     resource: "tags",
    //     value: "id",
    //     text: "name",
    //   },
    //   ellipsis: true,
    //   filterSearch: true,
    // },

    {
      title: "创建的时间",
      dataIndex: "createTime",
      key: "createTime",
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
      title: "操作",
      dataIndex: "operation",
      key: "operation",
      width: 100,
      fixed: "right",
    },
  ],
});

onMounted(refresh);
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
