<template>
  <a-layout-header :style="{ position: 'fixed', zIndex: 1, width: '100%' }">
    <a-row type="flex" justify="space-between" align="middle">
      <a-col>
        <a-menu
          v-model:selectedKeys="selectedKeys"
          theme="dark"
          mode="horizontal"
          :style="{ lineHeight: '64px' }"
          @click="clickMenu"
        >
          <a-menu-item key="/"
            ><img :src="Logo" alt="" style="width: 30px; height: 30px"
          /></a-menu-item>
          <!-- <a-menu-item key="1">首页</a-menu-item> -->
          <a-menu-item key="/article">文章</a-menu-item>
          <a-menu-item key="/projects">项目</a-menu-item>
        </a-menu></a-col
      >
      <a-col>
        <div style="align-items: center; display: flex">
          <a-input-search
            v-model:value="value"
            placeholder="input search loading with enterButton"
            @search="$router.push('/search')"
          />

          <a-dropdown placement="bottomRight">
            <a-avatar style="flex-shrink: 0; margin-left: 20px" :size="40">
              <template #icon>
                <UserOutlined />
              </template>
            </a-avatar>
            <template #overlay>
              <a-menu>
                <a-menu-item key="login">
                  <a href="javascript:;" @click="openLoginForm">登录</a>
                </a-menu-item>
                <a-menu-item>
                  <a href="javascript:;">退出</a>
                </a-menu-item>
                <a-menu-item>
                  <RouterLink to="/admin">管理</RouterLink>
                </a-menu-item>
              </a-menu>
            </template>
          </a-dropdown>
        </div>
      </a-col>
    </a-row>

    <a-modal
      wrapClassName="login-form-x"
      v-model:visible="visible"
      centered
      title="登录"
      :footer="null"
    >
      <a-form
        :model="formState"
        name="basic"
        autocomplete="off"
        @finish="onFinish"
        @finishFailed="onFinishFailed"
      >
        <a-form-item
          label="邮箱"
          name="username"
          :rules="[{ required: true, message: 'Please input your username!' }]"
        >
          <a-input v-model:value="formState.username" />
        </a-form-item>

        <a-form-item
          label="密码"
          name="password"
          :rules="[{ required: true, message: 'Please input your password!' }]"
        >
          <a-input-password v-model:value="formState.password" />
        </a-form-item>

        <a-form-item name="remember">
          <a-checkbox v-model:checked="formState.remember"
            >Remember me</a-checkbox
          >
        </a-form-item>

        <a-form-item>
          <a-button type="primary" html-type="submit">登录</a-button>
        </a-form-item>
      </a-form>
    </a-modal>
  </a-layout-header>
</template>

<script setup lang="ts">
import Logo from "@/assets/logo.png";
import { UserOutlined } from "@ant-design/icons-vue";
import { reactive, ref } from "vue";
import router from '@/router';

const clickMenu = ({ key }: { key: string }) => {
  router.push(key);
};

const selectedKeys =ref([])

const visible = ref(false);
const openLoginForm = () => (visible.value = true);

const value = ref<string>("");

interface FormState {
  username: string;
  password: string;
  remember: boolean;
}

const formState = reactive<FormState>({
  username: "",
  password: "",
  remember: true,
});
const onFinish = (values: any) => {
  console.log("Success:", values);
};

const onFinishFailed = (errorInfo: any) => {
  console.log("Failed:", errorInfo);
};
</script>

<style scoped lang="scss">

</style>
