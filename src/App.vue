<template>
  <a-config-provider :locale="zhCN">
    <a-layout class="page-x">
      <Nav />
      <a-layout-content :style="{ marginTop: '64px' }">
        <a-row>
          <a-col
            class="view-x"
            :xs="{
              span: 22,
              pull: 1,
              push: 1,
            }"
            :sm="{
              span: 22,
              pull: 1,
              push: 1,
            }"
            :md="{
              span: 20,
              pull: 2,
              push: 2,
            }"
            :lg="{
              span: 20,
              pull: 2,
              push: 2,
            }"
            :xl="{
              span: 18,
              pull: 3,
              push: 3,
            }"
          >
            <div :style="{ paddingTop: '24px' }">
              <!-- <RouterView
                class="view"
                v-slot="{ Component }"
                v-if="$route.meta.keepAlive"
              >
                <KeepAlive >
                  <component :is="Component" />
                </KeepAlive>
              </RouterView>
              <RouterView class="view" v-else v-slot="{ Component }">
                  <component :is="Component" />
              </RouterView> -->

              <RouterView class="view" v-slot="{ Component }">
                <KeepAlive>
                  <component :is="Component" />
                </KeepAlive>
              </RouterView>
            </div>
          </a-col>
        </a-row>
      </a-layout-content>
      <a-layout-footer :style="{ textAlign: 'center' }" v-if="footerVisible">
        <Footer />
      </a-layout-footer>
    </a-layout>
  </a-config-provider>
</template>

<script setup lang="ts">
import Nav from "./components/Nav.vue";
import BreadCrumb from "./components/BreadCrumb.vue";
import Footer from "@/components/Footer.vue";
import { useRoute } from "vue-router";
import { onMounted, ref, watch } from "vue";

import zhCN from "ant-design-vue/es/locale/zh_CN";
import { auth } from "./modules/auth";

const footerVisible = ref(true);
const route = useRoute();


watch(
  () => route.fullPath,
  () => {
    if (route.fullPath.startsWith("/admin")) {
      footerVisible.value = false;
    } else {
      footerVisible.value = true;
    }
  },
  {
    immediate: true,
  }
);

onMounted(() => {
  if (!auth.isLogin) {
    auth.prepareTouristAccount();
  } else {
    if (auth.isTourist) {
      auth.notifyUsingTouristAccount();
    }
  }
});
</script>

<style>
/* .content-x {
  background-color: #f5f5f5;
} */

/* .user-page-content-x {
  padding: 20px 50px;
  width: 1200px;
  background-color: #fff;
}

@media screen and (max-width: 1200px) {
  .user-page-content-x {
    width: 1200px;
  }
}

@media screen and (max-width: 992px) {
  .user-page-content-x {
    width: 1200px;
  }
  .content-x {
    padding: 20px 40px;
  }
}

@media screen and (max-width: 576px) {
  .content-x {
    padding: 20px 10px;
  }
} */

html {
  overflow-x: hidden;
}

/*定义滚动条高宽及背景
 高宽分别对应横竖滚动条的尺寸*/
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
  background-color: #f5f5f5;
}
/*定义滚动条轨道
 内阴影+圆角*/
::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 0px rgba(255, 255, 255, 1);
  /* -webkit-box-shadow: inset 0 0 6px rgba(255,255,255,1); */
  border-radius: 10px;
  background-color: #fff;
}
/*定义滑块
 内阴影+圆角*/
::-webkit-scrollbar-thumb {
  border-radius: 10px;
  /* -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3); */
  background-color: rgba(0, 0, 0, 0.1);
}
</style>
<style scoped lang="scss">
.view-x {
  // margin: 0 auto;
  min-height: calc(100vh - 64px - 40px - 48px);
}

.view {
  padding: 20px;
  background-color: #fff;
}
</style>
