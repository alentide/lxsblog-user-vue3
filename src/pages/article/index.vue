<template>
  <div>
    <a-carousel :after-change="onChange">
      <div><h3>1</h3></div>
      <div><h3>2</h3></div>
      <div><h3>3</h3></div>
      <div><h3>4</h3></div>
    </a-carousel>
    <a-list
      class="articles-x"
      item-layout="vertical"
      size="default"
      :pagination="pagination"
      :data-source="listData"
    >
      <!-- <template #footer>
      <div>
        <b>ant design vue</b>
        footer part
      </div>
    </template> -->
      <template #renderItem="{ item }">
        <a-list-item key="item.title">
          <template #actions>
            <span><StarOutlined />1</span>
            <span><LikeOutlined />1</span>
            <span><MessageOutlined />1</span>
          </template>
          <template #extra>
            <img
              width="272"
              alt="logo"
              src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
            />
          </template>
          <a-list-item-meta :description="item.description">
            <template #title>
              <RouterLink :to="item.href">{{ item.title }}</RouterLink>
            </template>
          </a-list-item-meta>

          <div class="ellipsis_2" style="width: 100%">
            {{ item.content }}
          </div>
        </a-list-item>
      </template>
    </a-list>
  </div>
</template>

<script setup lang="ts">
import {
  StarOutlined,
  LikeOutlined,
  MessageOutlined,
} from "@ant-design/icons-vue";

const listData: Record<string, string>[] = [];

for (let i = 0; i < 23; i++) {
  listData.push({
    href: "/article/1",
    title: `ant design vue part ${i}`,
    avatar: "https://joeschmoe.io/api/v1/random",
    description:
      "Ant Design, a design language for background applications, is refined by Ant UED Team.",
    content:
      "We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.",
  });
}

const onChange = (current: number) => {
  console.log(current);
};

const pagination = {
  onChange: (page: number) => {
    console.log(page);
  },
  pageSize: 10,
};
</script>

<style scoped lang="scss">
.ellipsis_2 {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.articles-x {
  width: 100%;
  height: 100%;
}

.ant-carousel :deep(.slick-slide) {
  text-align: center;
  height: 160px;
  line-height: 160px;
  background: #364d79;
  overflow: hidden;
}

.ant-carousel :deep(.slick-slide h3) {
  color: #fff;
}
</style>
