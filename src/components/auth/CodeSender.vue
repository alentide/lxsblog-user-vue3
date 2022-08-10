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
import { computed, reactive, ref, toRef } from "vue";
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
    //用于测试的代码，避免真的发邮件。
    // sendCoder.toSendingState()
    // return Promise.resolve()

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

const useCountDown = (key:string,length: number) => {
  let change: (time: number) => any = () => {};
  let end = () => {};
  const timeId = useStorage(key,0)
  const start = useStorage(key+'_start',length);

  const stop = () => {
    clearInterval(timeId.value);
    timeId.value = 0;
    start.value = length
  };
  const run = () => {
    if (timeId.value) {
      stop() 
    }

    timeId.value = window.setInterval(() => {
      start.value = start.value-1;
      if (start.value <= 0) {
        stop();
        end();
      } else {
        change(start.value);
      }
    }, 1000);
  };
  const onChange = (fn: (time:number) => void) => (change = fn);
  const onEnd = (fn: () => void) => (end = fn);
  return reactive({
    onChange,
    onEnd,
    run,
    stop,
    timeId,
  })
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
  const countDown =  useCountDown('code_count_down',60)
  if(countDown.timeId){
    toSendingState()
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
  const sendCode = () => getCurrentState().sendCode();

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

  const countDown = useCountDown('code_count_down',60);
  countDown.onChange((time: number) => {
    text.value = `${time}秒后可重新发送`;
    console.log("time", time);
  });
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
