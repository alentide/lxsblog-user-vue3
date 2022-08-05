<template>
  <a-tooltip>
    <template #title>

      <div v-if="article.scoreUserNum">
        平均分为：{{ article.averageScore }}({{ article.scoreUserNum }}人打分)
      </div>
      <div v-else>尚未有人打分</div>
      <div v-if="article.currentUserScore">
        你的打分是：{{ article.currentUserScore.score }}
      </div>
    </template>
    <div>
      <a-spin :spinning="article.giveScoreLoading" :delay="300">
        <a-rate
          :value="article.averageScore"
          :disabled="!!article.currentUserScore"
          @change="article.giveScore"
        />
      </a-spin>
    </div>
  </a-tooltip>
</template>

<script setup lang="ts">
import {toRefs, reactive} from 'vue'
const props = defineProps({
  article: {},
});

const { article:_article } = props;
const article = reactive(_article)

</script>

<style scoped></style>
