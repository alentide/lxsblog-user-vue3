<template>
  <div class="wh100p">
    <RemoveIcon
      type="primary"
      :disabled="removeDisabled"
      :remove="removeSelected"
    />
    <a-table
      size="small"
      :pagination="pagination"
      @change="onTableChange"
      :columns="columns"
      :data-source="currentList"
      bordered
      :loading="loading"
      class="ovflat"
      :row-selection="{
        selectedRowKeys: selectedRowKeys,
        onChange: onSelectChange,
        selections: true,
      }"
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
            inputKey: 'searchInput',
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
        </template>
      </template>
    </a-table>
  </div>
</template>

<script setup lang="ts">
import ArticleItem from "@/components/article/ArticleItem.vue";
import useAdminTabs from "@/modules/adminTabs/useAdminTabs";
import type { ArticleDfe } from "@/modules/article/article.interfaces";
import type { CategoryDfe } from "@/modules/category/interfaces/CategoryDfe";
import { http } from "@/modules/http";
import { useList, usePageList } from "@/modules/http/useList";
import type { TagDfe } from "@/modules/tag/interfaces/TagDfe";
import { useLoadingHoc } from "@/modules/utils/useLoadingHoc";
import { andThen, pipe, tap } from "ramda";
import { computed, onMounted, provide, ref, type Ref } from "vue";
import CustomFilterDropdown from "@/components/article/CustomFilterDropdown.vue";

const {
  currentList,
  refresh,
  loading,
  pagination,
  goPageNum,
  go,
  onTableChange: _onTableChange,
  remove,
} = usePageList<ArticleDfe>("/articles");

const selectedRowKeys: Ref<any[]> = ref([]);
const onSelectChange = (changedSelectedRowKeys: any[]) => {
  console.log("changedSelectedRowKeys", changedSelectedRowKeys);
  selectedRowKeys.value = changedSelectedRowKeys;
};

const onTableChange = pipe(
  _onTableChange,
  // andThen(tap(res=>console.log(res))),
  andThen(tap(() => (selectedRowKeys.value = [])))
);
onMounted(refresh);

const tagsFilterOptions: Ref<TagDfe[]> = ref([]);
const categoriesFilterOptions: Ref<CategoryDfe[]> = ref([]);

// const remove=async (id:number)=>{
//   const res = await _remove(id)
//   const i = selectedRowKeys.value.findIndex(m=>m.id===id)
//   if(i!==-1) selectedRowKeys.value.splice(i,1)
//   return res
// }

onMounted(() => {
  http
    .list<TagDfe>("/tags")
    .then((res) => (tagsFilterOptions.value = res.data.list));
  http
    .list<CategoryDfe>("/categories")
    .then((res) => (categoriesFilterOptions.value = res.data.list));
});

const removeDisabled = computed(() => !selectedRowKeys.value.length);

const removeLoading = useLoadingHoc();
const removeSelected = removeLoading.loadingHoc(async () => {
  await http.delete("/articles", selectedRowKeys.value);
  return await refresh();
});


const searchInput = ref(null)
provide('searchInput',searchInput)

const columns = computed(() => {
  return [
    {
      title: "标题",
      dataIndex: "title",
      key: "title",
      sorter: true,
      sortDirections: ["descend", "ascend"],
      width: "400px",
      customFilterDropdown: true,
      filterKey: 'name',
      // onFilter: (value, record) =>
      //   record.address.toString().toLowerCase().includes(value.toLowerCase()),
      // onFilterDropdownVisibleChange: (visible) => {
      //   if (visible) {
      //     setTimeout(() => {
      //       if(searchInput.value){
      //         searchInput.value.focus();
      //       }
            
      //     }, 100);
      //   }
      // },
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
      filters: categoriesFilterOptions.value.map((category) => ({
        value: category.id,
        text: category.name,
      })),
      filterSearch: true,
      width: "100px",
    },
    {
      title: "标签",
      dataIndex: "tags",
      key: "tags",
      width: "200px",
      filters: tagsFilterOptions.value.map((tag) => ({
        value: tag.id,
        text: tag.name,
      })),
      filterSearch: true,
      //   filteredValue: filtered.name || null,
      //   onFilter: (value: string, record: DataItem) =>
      //     record.name.includes(value),
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
});
</script>

<style scoped lang="scss"></style>
