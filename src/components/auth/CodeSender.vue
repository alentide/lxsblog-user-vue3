<template>
  <a-button
    :disabled="codeSender.disabled"
    :loading="codeSender.loading"
    @click="codeSender.sendCode"
    >{{ codeSender.text }}</a-button
  >
</template>

<script setup lang="ts">
import { commonHttp } from "@/modules/http";
import { loadingMethod } from "@/modules/loading";
import { loadingHoc } from "@/modules/loading/loadingHoc";
import { useStorage } from "@vueuse/core";
import { time } from "console";
import { resolve } from "path";
import {
  computed,
  onBeforeUnmount,
  onMounted,
  reactive,
  ref,
  toRef,
  watch,
watchEffect,
} from "vue";
const props = defineProps<{
  email: string;
}>();

const enum CodeSenderState {
  Never,
  Sending,
  Again,
  Error,
}

const genSendCode = (sendCoder: {
  toSendingState: () => any;
  toSendErrorState: () => void;
}) => {
  return () => {
    // // 用于测试的代码，避免真的发邮件。
    // sendCoder.toSendingState();
    // return Promise.resolve();

    return commonHttp
      .post("email-code/send", {
        email: props.email,
      })
      .then(() => sendCoder.toSendingState())
      .catch(() => {
        sendCoder.toSendErrorState();
      });
  };
};

type StateNeed = {
  toSendingState: () => void;
  toSendErrorState: () => void;
  toSendAgainState: () => void;
  loading: boolean;
};

const useCountDown = (key: string, length: number) => {
  let change: (time: number) => any = () => {};
  let end = () => {};

  const startTime = useStorage(key + "_start_time", ref(0));
  const endTime = useStorage(key + "_end_time", 0);
  const timeId = useStorage(key + "_time_id", 0);
  const currentSecond = computed(() =>
    parseInt((endTime.value - startTime.value) / 1000 + "")
  );
  const isDone = computed(() => endTime.value <= startTime.value);
  const stop = () => {
    clearInterval(timeId.value);
    timeId.value = 0;
  };

  const run = async () => {
    if (timeId.value) {
      stop();
    }

    if (isDone.value) {
      startTime.value = Date.now();
      endTime.value = Date.now() + length * 1000;
    }
    timeId.value = window.setInterval(() => {
      startTime.value = startTime.value + 1000;
      if (isDone.value) {
        stop();
        end();
      } else {
        change(currentSecond.value);
      }
    }, 1000);
  };

  const onChange = (fn: (time: number) => void) => (change = fn);
  const onEnd = (fn: () => void) => (end = fn);
  return reactive({
    onChange,
    onEnd,
    run,
    stop,
    isDone,
    currentSecond,
  });
};

const useCodeSender = () => {
  const _state = ref(CodeSenderState.Never);
  const toSendingState = () => {
    _state.value = CodeSenderState.Sending;
  };
  const toSendErrorState = () => {
    _state.value = CodeSenderState.Error;
  };
  const toSendAgainState = () => {
    _state.value = CodeSenderState.Again;
  };

  /**
   * 同一时间验证码只能发送一次。
   */
  const countDown = useCountDown("code_count_down", 60);
  if (!countDown.isDone) {
    toSendingState();
  }

  const loading = ref(false);

  const result = reactive({
    toSendingState,
    toSendErrorState,
    toSendAgainState,
    loading,
  });
  function getCurrentState(): {
    text: string;
    loading: any;
    sendCode: (...args: any[]) => Promise<unknown>;
    disabled: boolean;
  } {
    switch (_state.value) {
      case CodeSenderState.Never:
        return neverSendStateCodeSender(result);
      case CodeSenderState.Sending:
        return SendingStateCodeSender(result);
      case CodeSenderState.Again:
        return SendAgainStateCodeSender(result);
      case CodeSenderState.Error:
        return SendErrorStateCodeSender(result);
    }
  }

  const state = computed(() => getCurrentState());

  const text = computed(() => state.value.text);
  const disabled = computed(() => state.value.disabled);
  const sendCode = () => state.value.sendCode();

  return reactive({
    toSendingState,
    toSendErrorState,
    toSendAgainState,
    loading,
    text,
    disabled,
    sendCode,
  });
};

const neverSendStateCodeSender = (sendCoder: StateNeed) => {
  const text = ref("发送验证码");
  const loading = toRef(sendCoder, "loading");
  const disabled = ref(false);

  const sendCode = loadingHoc(loading, genSendCode(sendCoder));

  return reactive({
    text,
    loading,
    sendCode,
    disabled,
  });
};

const SendingStateCodeSender = (sendCoder: StateNeed) => {
  const text = ref("60秒后可重新发送");
  const loading = toRef(sendCoder, "loading");
  const disabled = ref(true);

  const countDown = useCountDown("code_count_down", 60);
  watchEffect(() => {
    text.value = `${countDown.currentSecond}秒后可重新发送`;
  })
  countDown.onEnd(() => sendCoder.toSendAgainState());
  countDown.run();

  const sendCode = async () => {};
  return reactive({
    text,
    loading,
    sendCode,
    disabled,
  });
};

const SendAgainStateCodeSender = (sendCoder: StateNeed) => {
  const text = ref("重新发送");
  const loading = toRef(sendCoder, "loading");
  const disabled = ref(false);

  const sendCode = loadingHoc(loading, genSendCode(sendCoder));

  return reactive({
    text,
    loading,
    sendCode,
    disabled,
  });
};

const SendErrorStateCodeSender = (sendCoder: StateNeed) => {
  const text = ref("发送失败");
  const loading = toRef(sendCoder, "loading");
  const disabled = ref(false);

  const sendCode = loadingHoc(loading, genSendCode(sendCoder));

  return reactive({
    text,
    loading,
    sendCode,
    disabled,
  });
};

const codeSender = useCodeSender();
</script>

<style scoped></style>
