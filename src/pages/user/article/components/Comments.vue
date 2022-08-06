<template>
  <List class="list-x">
    <template v-slot:header>
      <a-comment>
        <template #avatar>
          <Avatar :avatar="user.avatar"/>
        </template>
        <template #content>
          <a-form-item>
            <a-textarea v-model:value="commentForm.content" :rows="4" />
          </a-form-item>
          <a-form-item>
            <a-button
              html-type="submit"
              :loading="commentForm.submitLoading"
              type="primary"
              @click="commentForm.submit"
            >
              评价
            </a-button>
          </a-form-item>
        </template>
      </a-comment>
    </template>
    <template v-slot="{ item: comment }">
      <a-comment>
        <template #author>
          <a>{{ comment.user.nickname }}</a>
        </template>
        <template #avatar>
          <Avatar :avatar="comment.user.avatar"/>
        </template>

        <template #content>
          <p>{{ comment.content }}</p>
        </template>
        <template #actions>
          <span key="comment-nested-reply-to">{{ comment.id }}楼</span>
          <span key="ml10">{{ comment.createTime }}</span>
        </template>
      </a-comment>
    </template>
  </List>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useUser } from "@/modules/user/index.js";
import { useArticleCommentList, useUserCommentForm } from "@/modules/comment";
import { useRoute } from "vue-router";
import Avatar from '@/components/user/Avatar.vue'

const route = useRoute();
const { id } = route.params as {
  id: string;
};

const user = useUser();
const commentList = useArticleCommentList(+id);
onMounted(commentList.refresh);

const commentForm = useUserCommentForm(+id, (res) =>
  commentList.list.value.unshift(res.data)
);
</script>

<style scoped lang="scss">
.list-x {
  height: 100%;
  width: 100%;
  padding: 24px;
  overflow-y: auto;
}
</style>
