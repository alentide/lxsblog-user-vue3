<template>
  <div>
    <!-- 文章列表
    <a-form
      :model="formState"
      name="validate_other"
      v-bind="formItemLayout"
      @finishFailed="onFinishFailed"
      @finish="onFinish"
    >
      <a-form-item name="radio-group" label="分类">
        <a-radio-group v-model:value="formState['radio-group']">
          <a-radio value="a">item 1</a-radio>
          <a-radio value="b">item 2</a-radio>
          <a-radio value="c">item 3</a-radio>
        </a-radio-group>
      </a-form-item>

      <a-form-item name="radio-button" label="标签">
        <a-checkbox-group
          v-model:value="value1"
          name="checkboxgroup"
          :options="plainOptions"
        />
      </a-form-item>
      <a-form-item name="radio-group" label="排序">
        <a-radio-group v-model:value="formState['radio-group']">
          <a-radio value="a">综合</a-radio>
          <a-radio value="b">最新</a-radio>
          <a-radio value="c">点赞最多</a-radio>
          <a-radio value="c">收藏最多</a-radio>
          <a-radio value="c">评论最多</a-radio>
        </a-radio-group>
      </a-form-item>
    </a-form> -->

    <a-table
      size="small"
      :pagination="pagination"
      @change="onTableChange"
      :columns="columns"
      :data-source="currentList"
      bordered
      :loading="loading"
    >

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
        </template>
      </template>
    </a-table>
  </div>
</template>

<script setup lang="ts">
import ArticleItem from "@/components/article/ArticleItem.vue";
import useAdminTabs from "@/modules/adminTabs/useAdminTabs";

import type { ArticleDfe } from "@/modules/article/article.interfaces";
import { useList, usePageList } from "@/modules/http/useList";
import { onMounted, ref } from "vue";

const {
  currentList,
  refresh,
  loading,
  pagination,
  goPageNum,
  go,
  onTableChange,
  remove,
} = usePageList<ArticleDfe>("/articles");
onMounted(refresh);

const columns = [
  {
    title: "标题",
    dataIndex: "title",
    key: "title",
    sorter: true,
    sortDirections: ["descend", "ascend"],
    width: "400px",
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
    sortDirections: ["descend", "ascend"],
    width: "100px",
  },
  {
    title: "标签",
    dataIndex: "tags",
    key: "tags",
    width: "200px",
  },
  {
    title: "创建的时间",
    dataIndex: "createTimeDisplayed",
    key: "createTimeDisplayed",
    sorter: true,
    sortDirections: ["descend", "ascend"],
    width: "150px",
  },
  {
    title: "操作",
    dataIndex: "operation",
    key: "operation",
    width: "100px",
  },
];
</script>

<style scoped lang="scss"></style>
