<template>
  <a-tooltip>
    <template #title>
      <div v-if="article.scoreUserNum">
        平均分为：{{ article.averageScore }}({{ article.scoreUserNum }}人打分)
      </div>
      <div v-else>尚未有人打分</div>
      <div v-if="currentUserScore.score">
        你的打分是：{{ currentUserScore.score }}
      </div>
    </template>
    <div>
      <a-spin :spinning="currentUserScore.loading" :delay="300">
        <a-rate
          :value="article.averageScore"
          :disabled="!!currentUserScore.score"
          @change="currentUserScore.giveScore"
        />
      </a-spin>
    </div>
  </a-tooltip>
</template>

<script setup lang="ts">
import { userHttp } from "@/modules/http";
import { toRefs, reactive, ref, onMounted } from "vue";
const props = defineProps({
  article: {},
});

const { article: _article } = toRefs(props);
const article = reactive({
  ..._article?.value
});


function useCurrentUserScore() {
  const loading = ref(false);
  const score = ref(0);
  const giveScore = (value) => {
    score.value = value
    loading.value = true;
    return userHttp.post("article-scores/score",{
      articleId: article.id,
      score: score.value
    }).then(res=>{
      article.averageScore = res.data.averageScore
      article.scoreUserNum = res.data.scoreUserNum
      score.value = res.data.currentUserScore.score
    }).finally(() => {
      loading.value = false;
    });
  };
  const refresh = ()=>{
    loading.value = true;

    return userHttp.get("article-scores/article/"+article.id).then(res=>{
      score.value = res.data?.score || 0
    }).finally(() => {
      loading.value = false;
    });
  }
  return reactive({
    loading,
    score,
    giveScore,
    refresh,
  });
}
const currentUserScore = useCurrentUserScore();
onMounted(currentUserScore.refresh)
</script>

<style scoped></style>
