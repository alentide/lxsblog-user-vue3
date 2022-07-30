<template>
  <a-layout class="page-x">
    <Nav />
    <a-layout-content class="content-x " :style="{marginTop: '64px' }">
      <!-- <BreadCrumb /> -->
      <div class="view-x" :style="{ background: '#fff', padding: '24px' }">
        <RouterView class="view-x"  />
      </div>
    </a-layout-content>
    <a-layout-footer :style="{ textAlign: 'center' }" v-if="footerVisible">
      <Footer />
    </a-layout-footer>
  </a-layout>
</template>

<script setup lang="ts">
import Nav from "./components/Nav.vue";
import BreadCrumb from "./components/BreadCrumb.vue";
import Footer from "@/components/Footer.vue";
import { useRoute } from "vue-router";
import { ref, watch } from "vue";

const footerVisible = ref(true)
const route = useRoute()

watch(() => route.fullPath,()=>{
  if(route.fullPath.startsWith('/admin')){
    footerVisible.value=false
  }else {
    footerVisible.value=true
  }
},{
  immediate: true
})
</script>

<style>
.content-x {
  padding: 20px 50px;
  background-color: #f5f5f5;
}

@media screen and (max-width:992px) {
  .content-x {
    padding: 20px 40px;
  }
}

@media screen and (max-width:576px) {
  .content-x {
    padding: 20px 10px;
  }
}


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
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  border-radius: 10px;
  background-color: #f5f5f5;
}
/*定义滑块
 内阴影+圆角*/
::-webkit-scrollbar-thumb {
  border-radius: 10px;
  /* -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3); */
  background-color: rgba(0,0,0,.1)
}
</style>
<style scoped lang="scss">
.view-x {
  min-height: calc(100vh - 64px  - 40px - 48px);
}
.page-x {
  // width: 100vw;

  // height: 100vh;
}
// #components-layout-demo-fixed .logo {
//   width: 120px;
//   height: 31px;
//   background: rgba(255, 255, 255, 0.2);
//   margin: 16px 24px 16px 0;
//   float: left;
// }
// .site-layout .site-layout-background {
//   background: #fff;
// }

// [data-theme='dark'] .site-layout .site-layout-background {
//   background: #141414;
// }
</style>
