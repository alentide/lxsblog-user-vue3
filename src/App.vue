<template>
  <a-layout class="page-x">
    <Nav />
    <a-layout-content :style="{ padding: '20px 50px', marginTop: '64px' }">
      <!-- <BreadCrumb /> -->
      <div :style="{ background: '#fff', padding: '24px', minHeight: '380px' }">
        <RouterView class="view-x" />
      </div>
    </a-layout-content>
    <a-layout-footer :style="{ textAlign: 'center' }">
      <Footer />
    </a-layout-footer>
  </a-layout>
</template>

<script setup lang="ts">
import Nav from "./components/Nav.vue";
import BreadCrumb from "./components/BreadCrumb.vue";
import Footer from "@/components/Footer.vue";
</script>

<style>
html {
  overflow-x: hidden;
}
</style>
<style scoped lang="scss">
.view-x {
  min-height: calc(100vh - 64px - 70px - 40px - 48px);
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
