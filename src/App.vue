<template>
  <a-config-provider :locale="zhCN">
    <a-layout class="page-x">
      <Nav />
      <a-layout-content class="page-content-x">
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
              <RouterView class="view" v-slot="{ Component }">
                <KeepAlive
                  exclude="ArticleDetail"
                  v-if="!$route.path.startsWith('/admin')"
                >
                  <component :is="Component" />
                </KeepAlive>
                <component v-else :is="Component" />
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
import { onErrorCaptured, onMounted, ref, watch } from "vue";

import zhCN from "ant-design-vue/es/locale/zh_CN";
import { auth } from "./modules/auth";

import useToast from "@/modules/toast/useToast";

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

const toast = useToast();
onErrorCaptured((err: any) => {
  if (err.needTip) {
    toast.error(err.msg);
  }
});
</script>

<style>
html {
  overflow-x: hidden;
  background-color: #f0f2f5;
}

/*??????????????????????????????
 ??????????????????????????????????????????*/
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
  background-color: #f5f5f5;
}
/*?????????????????????
 ?????????+??????*/
::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 0px rgba(255, 255, 255, 1);
  /* -webkit-box-shadow: inset 0 0 6px rgba(255,255,255,1); */
  border-radius: 10px;
  background-color: #fff;
}
/*????????????
 ?????????+??????*/
::-webkit-scrollbar-thumb {
  border-radius: 10px;
  /* -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3); */
  background-color: rgba(0, 0, 0, 0.1);
}

html {
  --navHeight: 50px;
}
</style>
<style scoped lang="scss">
.page-x {
  min-height: 100vh;
  padding-top: var(--navHeight);
}

.page-content-x {
  min-height: calc(100vh - var(--navHeight));
}
.view-x {
  // margin: 0 auto;
  min-height: calc(100vh - var(--navHeight) - 40px - 48px);
}

.view {
  padding: 20px;
  background-color: #fff;
}
</style>
