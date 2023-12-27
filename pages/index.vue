<template>
  <div class="container my-4">
    <div class="row">
      <div class="col-md-12">
        <textarea
          class="form-control"
          :class="{ 'bg-danger': isInputBlocked }"
          v-model="inputText"
          placeholder="ここにテキストを入力"
        ></textarea>
        <button class="btn btn-primary my-2" @click="startShakyo">
          shakyo開始
        </button>
        <button class="btn btn-secondary my-2" @click="clearText">
          クリア
        </button>
        <!-- クリアボタンの追加 -->
      </div>
    </div>
    <div v-if="showShakyo" class="alert-container">
      <div v-if="isTypo" class="alert alert-danger alert-fade-out">Miss!</div>
      <div v-if="isCompleted" class="alert alert-success">Complete!</div>
      <!-- その他の要素 -->
    </div>
    <div v-if="showShakyo">
      <div class="row">
        <div class="col-md-6">
          <div v-if="showSample" class="card">
            <div class="card-body" v-html="formattedSampleText"></div>
          </div>
          <button class="btn btn-secondary my-2" @click="toggleSample">
            見本を隠す/表示する
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, computed } from "vue";
import NuxtStorage from "nuxt-storage";

// nuxt-storageを使用して状態を永続化
const inputText = ref(NuxtStorage.localStorage.getData("inputText") || "");
const sampleText = ref(
  NuxtStorage.localStorage.getData("sampleText") ||
    "ここにサンプルテキストを設定",
);
const isInputBlocked = ref(
  NuxtStorage.localStorage.getData("isInputBlocked") || false,
);
const showShakyo = ref(
  NuxtStorage.localStorage.getData("showShakyo") !== null
    ? NuxtStorage.localStorage.getData("showShakyo")
    : false,
);
const showSample = ref(
  NuxtStorage.localStorage.getData("showSample") !== null
    ? NuxtStorage.localStorage.getData("showSample")
    : true,
);
const isTypo = ref(NuxtStorage.localStorage.getData("isTypo") || false);
const isCompleted = ref(
  NuxtStorage.localStorage.getData("isCompleted") || false,
);

watch(showShakyo, (newVal) => {
  NuxtStorage.localStorage.setData("showShakyo", newVal);
});
// showSampleの状態を監視してlocalStorageに保存
watch(showSample, (newVal) => {
  NuxtStorage.localStorage.setData("showSample", newVal);
});

// ユーザーの入力を監視してlocalStorageに保存
watch(inputText, (newVal) => {
  NuxtStorage.localStorage.setData("inputText", newVal);
});
watch(sampleText, (newVal) => {
  NuxtStorage.localStorage.setData("sampleText", newVal);
});

const formattedSampleText = computed(() => {
  return sampleText.value.replace(/\n/g, "<br>");
});
// shakyo開始処理
const startShakyo = () => {
  showShakyo.value = true;
  sampleText.value = inputText.value;
  inputText.value = "";
  isInputBlocked.value = false;
  isCompleted.value = false; // ここでisCompletedもリセットする
  NuxtStorage.localStorage.setData("showShakyo", true);
  NuxtStorage.localStorage.removeData("isCompleted");
};

const clearText = () => {
  inputText.value = "";
  isInputBlocked.value = false;
  isCompleted.value = false;
  isTypo.value = false;
  showShakyo.value = false; // これもリセットする
  NuxtStorage.localStorage.removeData("inputText");
  NuxtStorage.localStorage.removeData("isInputBlocked");
  NuxtStorage.localStorage.removeData("isCompleted");
  NuxtStorage.localStorage.removeData("isTypo");
  NuxtStorage.localStorage.removeData("showShakyo");
};

let typoTimeout = null;

const checkInput = () => {
  if (showShakyo.value) {
    if (inputText.value !== sampleText.value.slice(0, inputText.value.length)) {
      inputText.value = inputText.value.slice(0, -1);
      isInputBlocked.value = true;

      // 前のタイムアウトをクリア
      if (typoTimeout) {
        clearTimeout(typoTimeout);
        isTypo.value = false; // フィードバックをリセット
      }

      // 新しいタイムアウトを設定
      typoTimeout = setTimeout(() => {
        isTypo.value = false;
        typoTimeout = null;
      }, 2000);

      // フィードバックを表示
      isTypo.value = true;
    } else {
      isInputBlocked.value = false;
      if (inputText.value === sampleText.value) {
        isCompleted.value = true; // 全部入力完了時
        isTypo.value = false;
      }
    }
  }
};

// ユーザーの入力を監視
watch(inputText, checkInput);
</script>

<style scoped>
@keyframes fadeOut {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}

.alert-fade-out {
  animation: fadeOut 2s ease-out;
}
.alert-container {
  height: 100px; /* 高さを確保 */
  line-height: 50px; /* テキストを中央に配置 */
}
/* その他のスタイル */
</style>
