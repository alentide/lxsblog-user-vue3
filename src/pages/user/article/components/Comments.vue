<template>
    <div>
        <a-comment>
        <template #avatar>
          <a-avatar src="https://joeschmoe.io/api/v1/random" alt="Han Solo" />
        </template>
        <template #content>
          <a-form-item>
            <a-textarea v-model:value="value" :rows="4" />
          </a-form-item>
          <a-form-item>
            <a-button
              html-type="submit"
              :loading="submitting"
              type="primary"
              @click="handleSubmit"
            >
              Add Comment
            </a-button>
          </a-form-item>
        </template>
      </a-comment>
      <a-comment>
        <template #actions>
          <span key="comment-nested-reply-to">Reply to</span>
        </template>
        <template #author>
          <a>Han Solo</a>
        </template>
        <template #avatar>
          <a-avatar src="https://joeschmoe.io/api/v1/random" alt="Han Solo" />
        </template>
        <template #content>
          <p>
            We supply a series of design principles, practical patterns and high
            quality design resources (Sketch and Axure).
          </p>
        </template>
        <a-comment>
          <template #actions>
            <span>Reply to</span>
          </template>
          <template #author>
            <a>Han Solo</a>
          </template>
          <template #avatar>
            <a-avatar src="https://joeschmoe.io/api/v1/random" alt="Han Solo" />
          </template>
          <template #content>
            <p>
              We supply a series of design principles, practical patterns and
              high quality design resources (Sketch and Axure).
            </p>
          </template>

          <a-comment>
            <template #actions>
              <span>Reply to</span>
            </template>
            <template #author>
              <a>Han Solo</a>
            </template>
            <template #avatar>
              <a-avatar
                src="https://joeschmoe.io/api/v1/random"
                alt="Han Solo"
              />
            </template>
            <template #content>
              <p>
                We supply a series of design principles, practical patterns and
                high quality design resources (Sketch and Axure).
              </p>
            </template>
          </a-comment>
          <a-comment>
            <template #actions>
              <span>Reply to</span>
            </template>
            <template #author>
              <a>Han Solo</a>
            </template>
            <template #avatar>
              <a-avatar
                src="https://joeschmoe.io/api/v1/random"
                alt="Han Solo"
              />
            </template>
            <template #content>
              <p>
                We supply a series of design principles, practical patterns and
                high quality design resources (Sketch and Axure).
              </p>
            </template>
          </a-comment>
        </a-comment>
      </a-comment>
    </div>
</template>

<script setup lang="ts">import { ref } from 'vue';
import dayjs from "dayjs";

const comments = ref<Comment[]>([]);
const submitting = ref<boolean>(false);
const value = ref<string>("");
const handleSubmit = () => {
  if (!value.value) {
    return;
  }

  submitting.value = true;

  setTimeout(() => {
    submitting.value = false;
    comments.value = [
      {
        author: "Han Solo",
        avatar: "https://joeschmoe.io/api/v1/random",
        content: value.value,
        datetime: dayjs().fromNow(),
      },
      ...comments.value,
    ];
    value.value = "";
  }, 1000);
};
</script>

<style scoped>

</style>