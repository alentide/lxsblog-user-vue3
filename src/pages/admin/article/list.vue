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
    <a-table :columns="columns" :data-source="list" bordered :loading="loading">
      <template #bodyCell="{ column, text, record }">
        <template
          v-if="['title', 'summary', 'address'].includes(column.dataIndex)"
        >
          <div>
          <RouterLink :to="'/admin/article/edit/'+record.id">{{ text }}</RouterLink>
          <!-- <RouterLink to="/admin/article/edit">{{ text }}</RouterLink> -->
            
          </div>
        </template>
        <template v-else-if="column.dataIndex === 'operation'">
          delete
          <!-- <div class="editable-row-operations">
            <span v-if="dataSource[record.key]">
              <a-typography-link @click="save(record.key)"
                >Save</a-typography-link
              >
              <a-popconfirm
                title="Sure to cancel?"
                @confirm="cancel(record.key)"
              >
                <a>Cancel</a>
              </a-popconfirm>
            </span>
            <span v-else>
              <a @click="edit(record.key)">Edit</a>
            </span>
          </div> -->
        </template>
      </template>
    </a-table>
  </div>
</template>

<script setup lang="ts">
import ArticleItem from "@/components/article/ArticleItem.vue";
import useAdminTabs from "@/modules/adminTabs/useAdminTabs";
import { useList } from "@/modules/http/useList";
import { onMounted } from "vue";

const { list, refresh,loading } = useList("/articles");
onMounted(() => {
  console.log(useAdminTabs().current);
  
  refresh()
});

const columns = [
  {
    title: "标题",
    dataIndex: "title",
    key: "title",
  },
  {
    title: "概述",
    dataIndex: "summary",
    key: "summary",
  },
  {
    title: "操作",
    dataIndex: "operation",
    key: "operation",
  },
];
</script>

<style scoped lang="scss"></style>
