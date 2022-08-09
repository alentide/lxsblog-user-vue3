<template>
  <div>
    <a-checkable-tag
    v-for="sort in list"
    :checked="isSelect(sort)"
    @change="(e:boolean) => select(sort, e)"
    >{{ sort.name }}</a-checkable-tag
  >
  </div>
</template>

<script setup lang="ts">
import { ref, type Ref } from "vue";
const emit = defineEmits(["change"]);

interface Sort {
  name: string;
  value: {
    [key: string]: "DESC" | "ASC";
  };
}

const Sorts: Sort[] = [
  {
    name: "最新",
    value: {
      firstReleaseTime: "DESC",
    },
  },
  {
    name: "评分最高",
    value: {
      averageScore: "DESC",
    },
  },
  {
    name: "阅读量最多",
    value: {
      viewNum: "DESC",
    },
  },
  {
    name: "评论最多",
    value: {
      commentNum: "DESC",
    },
  },
];

const emptySort = {
  name: "",
  value: {},
} as const;

const list: Ref<Sort[]> = ref(Sorts);
const selected: Ref<Sort> = ref(emptySort);
const isSelect = (sort: Sort) => {
  return selected.value === sort;
};
const select = (sort: Sort, selectValue: boolean) => {
  if (selectValue) {
    selected.value = sort;
  } else {
    selected.value = emptySort;
  }
  emit("change", selected.value.value);
};
</script>

<style scoped></style>
