<template>
  <div>
    <a-checkable-tag
    v-for="tag in list"
    :checked="radio.isSelect(tag)"
    @change="(e:boolean) =>radio.select(tag, e)"
    >{{ tag.name }}</a-checkable-tag
  >
  </div>
</template>

<script setup lang="ts">
import { useRadio } from "@/modules/form";
import { userHttp } from "@/modules/http";
import { onMounted, reactive, ref, type Ref } from "vue";

const emit = defineEmits(["change"]);
interface Tag {
  id: number;
  name: string;
}



const radio = useRadio(emit)

const list: Ref<Tag[]> = ref([]);
const refresh = () =>
  userHttp.get<Tag[]>("/tags").then((res) => (list.value = res.data));

onMounted(refresh);


</script>

<style scoped></style>
