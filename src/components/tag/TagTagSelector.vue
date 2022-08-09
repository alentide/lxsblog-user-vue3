<template>
  <div>
    <a-checkable-tag
    v-for="tag in list"
    :checked="isSelect(tag)"
    @change="(e:boolean) =>select(tag, e)"
    >{{ tag.name }}</a-checkable-tag
  >
  </div>
</template>

<script setup lang="ts">
import { userHttp } from "@/modules/http";
import { onMounted, reactive, ref, type Ref } from "vue";

const emit = defineEmits(["change"]);
interface Tag {
  id: number;
  name: string;
}

const list: Ref<Tag[]> = ref([]);
const selectedList: Ref<Tag[]> = ref([]);
const isSelect = (tag: Tag) => {
  return !!selectedList.value.find((m) => m.id === tag.id);
};
const select = (tag: Tag, selectValue: boolean) => {
  const index = selectedList.value.findIndex((m) => m.id === tag.id);

  if (selectValue) {
    if (index === -1) {
      selectedList.value.push(tag);
    }
  } else {
    if (index !== -1) {
      selectedList.value.splice(index, 1);
    }
  }
  emit(
    "change",
    selectedList.value.map((m) => m.id)
  );
};
const refresh = () =>
  userHttp.get<Tag[]>("/tags").then((res) => (list.value = res.data));

onMounted(refresh);
</script>

<style scoped></style>
