<template>
  <div>
    <a-input-search
      v-model:value="antPageList.keywords"
      placeholder="请输入要搜索的内容"
      @search="antPageList.refresh"
    />
    <div class="tag-selector">
      <div class="tag-selector-label">分类：</div>
      <CategoryTagSelector @change="onChangeCategory" class="tag-selector-x" />
    </div>
    <div class="tag-selector">
      <div class="tag-selector-label">标签：</div>
      <TagTagSelector @change="onChangeTags" class="tag-selector-x" />
    </div>
    <div class="tag-selector">
      <div class="tag-selector-label">排序：</div>
      <SortTagSelector @change="antPageList.sort" class="tag-selector-x" />
    </div>

    <a-divider />

    <a-list
      class="articles-x"
      item-layout="vertical"
      size="default"
      :loading="antPageList.loading"
      :pagination="antPageList.pagination"
      :data-source="antPageList.currentList"
    >
      <template #renderItem="{ item }">
        <ArticleItem :article="item" />
      </template>
    </a-list>
  </div>
</template>
<script lang="ts" setup>
import ArticleItem from "@/components/article/ArticleItem.vue";
import { computed, onMounted, reactive, ref, type Ref } from "vue";
import { userHttp } from "@/modules/http";
import TagTagSelector from "@/components/tag/TagTagSelector.vue";
import CategoryTagSelector from "@/components/category/CategoryTagSelector.vue";
import SortTagSelector from "@/components/sort/sortTagSelector.vue";
import { assocPath, dissocPath } from "ramda";
import { FilterType } from "@/modules/list/useBaseTableList";

function useAntPageList<T>(url: string) {
  const keywords = ref("");
  const filter: Ref<any> = ref({});
  const order: Ref<any> = ref({});

  const pageNum = ref(1);
  const pageSize = ref(10);
  const total = ref(0);

  const list: Ref<T[][]> = ref([]);
  const currentList = computed(() => list.value[pageNum.value] || []);

const scrollToTop = ()=>{
  
  window.scrollTo({
    top:0,
    behavior: 'smooth'
  })
}
  const request = () => {
    loading.value = true;
    return userHttp
      .list<T>(url, {
        pageNum: pageNum.value,
        pageLimit: pageSize.value,
        filter: filter.value,
        sort: order.value,
        keywords: keywords.value,
      })
      .then((res) => {
        list.value[pageNum.value] = res.data.list;
        total.value = res.data.total;

        scrollToTop()
      })
      .finally(() => (loading.value = false));
  };
  const loading = ref(false);
  const refresh = () => {
    pageNum.value = 1;
    return request();
  };

  const genFilter = (type: FilterType) => {
    return (keys: string[]) => {
      return (value: any) => {
        if (!value || (Array.isArray(value) && !value?.length)) {
          filter.value = dissocPath([keys[0]])(filter.value);
        } else {
          filter.value = assocPath(keys, {
            value,
            type,
          })(filter.value);
        }

        return refresh();
      };
    };
  };

  const equal = genFilter(FilterType.SINGLE_EQUAL);
  const inArray = genFilter(FilterType.IN_ARRAY);

  const sort = (value: any) => {
    order.value = value;
    return refresh();
  };

  const onChange = (page: number) => {
    pageNum.value = page;
    return request();
  };

  const pagination = reactive({
    total,
    pageSize,
    onChange,
  });

  return reactive({
    loading,
    keywords,
    equal,
    inArray,
    sort,
    pagination,
    currentList,
    refresh,
  });
}

const antPageList = useAntPageList("articles/search");

const onChangeCategory = antPageList.equal(["category", "id"]);
const onChangeTags = antPageList.inArray(["tags", "id"]);

onMounted(antPageList.refresh);
</script>

<style lang="scss" scoped>
.tag-selector {
  display: flex;
  align-items: center;
  margin: 10px 0;
}
.tag-selector-label {
  font-size: 12px;
  color: #999;
}

.tag-selector-x {
  flex: 1;
  display: flex;
  overflow-x: auto;
}

/*定义滚动条高宽及背景
 高宽分别对应横竖滚动条的尺寸*/
::-webkit-scrollbar {
  width: 2px;
  height: 2px;
}
/*定义滚动条轨道
 内阴影+圆角*/
::-webkit-scrollbar-track {
  border-radius: 2px;
}
/*定义滑块
 内阴影+圆角*/
::-webkit-scrollbar-thumb {
  border-radius: 2px;
}
</style>
