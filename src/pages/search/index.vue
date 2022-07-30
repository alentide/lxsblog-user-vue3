<template>
  <div>
    <ArticleSearch />
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
    </a-form>

    <!-- <a-affix  :offset-top="64" @change="change">
      <a-collapse v-model:activeKey="activeKey">
        <a-collapse-panel key="1" header="This is panel header 1">
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
          </a-form>
        </a-collapse-panel>
      </a-collapse>
    </a-affix> -->

    <a-divider />
    <a-list
      class="articles-x"
      item-layout="vertical"
      size="default"
      :pagination="pagination"
      :data-source="listData"
    >
      <template #renderItem="{ item }">
        <ArticleItem :item="item" />
      </template>
    </a-list>
  </div>
</template>
<script lang="ts" setup>
import ArticleItem from "@/components/article/ArticleItem.vue";
import { provide, reactive, ref } from "vue";
import ArticleSearch from "../../components/article/ArticleSearch.vue";


import { useArticleSearch } from '@/pages/article/hooks/useArticleSearch';
provide('articleSearch',useArticleSearch())


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

const listData: Record<string, string>[] = [];

for (let i = 0; i < 23; i++) {
  listData.push({
    href: "/article/1",
    title: `ant design vue part ${i}`,
    avatar: "https://joeschmoe.io/api/v1/random",
    description:
      "Ant Design, a design language for background applications, is refined by Ant UED Team.",
    content:
      "We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.",
  });
}

const selectorVisible = ref(true);
const change = (affixed: boolean) => {
  selectorVisible.value = !affixed;
  console.log(affixed);
};

const activeKey = ref(["1"]);
</script>
