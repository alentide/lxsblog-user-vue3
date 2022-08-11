<template>
  <div>
    <a-tooltip>
      <template #title>
        <div v-if="article.scoreUserNum">
          平均分为：{{ article.averageScore }}({{ article.scoreUserNum }}人打分)
        </div>
        <div v-else>尚未有人打分</div>
        <div v-if="userScore.score">你的打分是：{{ userScore.score }}</div>
      </template>
      <div>
        <a-spin :spinning="userScore.loading" :delay="300">
          <a-rate
            allow-half
            :value="article.averageScore"
            :disabled="!!userScore.score"
            @change="userScore.giveScore"
          />
        </a-spin>
      </div>
    </a-tooltip>
  </div>
</template>

<script setup lang="ts">
import type { UserListItemArticleDto } from "@/modules/article/dto/ArticleDto";
import { userHttp } from "@/modules/http";
import { loadingMethod } from "@/modules/loading";
import { toRef, reactive, ref, onMounted, computed } from "vue";
const props = defineProps<{
  article: UserListItemArticleDto;
}>();

const article = toRef(props, "article");

interface GiveScoreRes {
  averageScore: number;
  scoreUserNum: number;
  currentUserScore: number;
}

function useUserScore() {
  const score = ref(props.article.currentUserScore);

  const [loading, giveScore] = loadingMethod((value: number) => {
    return userHttp
      .post<GiveScoreRes>("article-scores/score", {
        articleId: props.article.id,
        score: value,
      })
      .then((res) => {
        score.value = value;
        article.value.averageScore = res.data.averageScore;
        article.value.scoreUserNum = res.data.scoreUserNum;
        score.value = res.data.currentUserScore;
      });
  });

  // const refresh = ()=>{
  //   loading.value = true;

  //   return userHttp.get("article-scores/article/"+article.id).then(res=>{
  //     score.value = res.data?.score || 0
  //   }).finally(() => {
  //     loading.value = false;
  //   });

  // }

  return reactive({
    loading,
    score,
    giveScore,
    // refresh,
  });
}
const userScore = useUserScore();
// onMounted(currentUserScore.refresh)
</script>

<style scoped></style>
