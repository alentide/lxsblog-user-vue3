<template>
  <div>
    <a-checkable-tag
    v-for="category in list"
    :checked="isSelect(category)"
    @change="(e:boolean)=>select(category,e)"
    >{{ category.name }}</a-checkable-tag
  >
  </div>
</template>

<script setup lang="ts">
import { userHttp } from "@/modules/http";
import { onMounted, ref, type Ref } from "vue";
const emit = defineEmits(["change"]);

interface Category {
  id: number;
  name: string;
}

const list: Ref<Category[]> = ref([]);
const selected = ref(0);
const isSelect = (category: Category) => {
  return selected.value === category.id;
};
const select = (category: Category, selectValue: boolean) => {
  if (selectValue) {
    selected.value = category.id;
  } else {
    selected.value = 0;
  }
  emit("change", selected.value);
};

const refresh = () =>
  userHttp
    .get<Category[]>("/categories")
    .then((res) => (list.value = res.data));

onMounted(refresh);
</script>

<style scoped></style>
