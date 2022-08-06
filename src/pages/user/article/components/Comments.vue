<template>
  <div>
    <a-comment>
      <template #avatar>
        <a-avatar :src="user.avatar" />
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
    <a-comment v-for="comment in commentList.list.value">
      <template #author>
        <a>{{comment.user.nickname}}</a>
      </template>
      <template #avatar>
        <a-avatar :src="comment.user.avatar" />
      </template>
      <template #content>
        <p>{{comment.content}}</p>
      </template>
      <template #actions>
        <span key="comment-nested-reply-to">{{comment.id}}楼</span>
      </template>
    </a-comment>
    <ListLoading />
    <ListEmpty />
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { onReachBottom } from "@/modules/list/index.js";
import { useUser } from "@/modules/user/index.js";
import { useArticleCommentList, useUserCommentForm } from "@/modules/comment";
import ListLoading from '@/components/list/ListLoading.vue'
import ListEmpty from '@/components/list/ListEmpty.vue'
import { useRoute } from "vue-router";
const route = useRoute()
const {id} = route.params as {
  id: string
}

const user = useUser()
const commentList = useArticleCommentList(+id)
onMounted(commentList.refresh)
onReachBottom(commentList.nextPage)


const commentForm = useUserCommentForm(+id,res=>commentList.list.value.unshift(res.data))


</script>

<style scoped></style>
