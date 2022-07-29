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
    <a-table :columns="columns" :data-source="dataSource" bordered>
      <template #bodyCell="{ column, text, record }">
        <template v-if="['name', 'age', 'address'].includes(column.dataIndex)">
          <div>
            <!-- <a-input
              v-if="editableData[record.key]"
              v-model:value="editableData[record.key][column.dataIndex]"
              style="margin: -5px 0"
            /> -->
            <template>
              {{ text }}
            </template>
          </div>
        </template>
        <template v-else-if="column.dataIndex === 'operation'">
          <div class="editable-row-operations">
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
          </div>
        </template>
      </template>
    </a-table>
  </div>
</template>


<script setup lang="ts">


import ArticleItem from "@/components/article/ArticleItem.vue";
import { reactive, ref } from "vue";

const plainOptions = ["Apple", "Pear", "Orange"];

const value1 = ref([""]);

const formItemLayout = {
  labelCol: { span: 1 },
  wrapperCol: { span: 14 },
};

const formState = reactive<Record<string, any>>({
  "input-number": 3,
  "checkbox-group": ["A", "B"],
  rate: 3.5,
});
const onFinish = (values: any) => {
  console.log("Success:", values);
};

const onFinishFailed = (errorInfo: any) => {
  console.log("Failed:", errorInfo);
};

const pagination = {
  onChange: (page: number) => {
    console.log(page);
  },
  pageSize: 10,
};


const selectorVisible = ref(true);
const change = (affixed: boolean) => {
  selectorVisible.value = !affixed;
  console.log(affixed);
};

const dataSource = [
  {
    key: "1",
    name: "胡彦斌",
    age: 32,
    address: "西湖区湖底公园1号",
  },
  {
    key: "2",
    name: "胡彦祖",
    age: 42,
    address: "西湖区湖底公园1号",
  },
];

const columns = [
  {
    title: "姓名",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "年龄",
    dataIndex: "age",
    key: "age",
  },
  {
    title: "住址",
    dataIndex: "address",
    key: "address",
  },
  {
    title: "操作",
    dataIndex: "operation",
    key: "operation",
  },
];
</script>

<style scoped lang="scss"></style>
