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
import { ref, watch } from "vue";

const inputText = ref("");
const sampleText = ref("ここにサンプルテキストを設定");
const isInputBlocked = ref(false);
const showShakyo = ref(false);
const showSample = ref(true);
const isTypo = ref(false);
const isCompleted = ref(false);

const formattedSampleText = computed(() => {
  return sampleText.value.replace(/\n/g, "<br>");
});
// shakyo開始処理
const startShakyo = () => {
  showShakyo.value = true;
  sampleText.value = inputText.value;
  inputText.value = ""; // shakyo開始時に入力フィールドをクリア
  isInputBlocked.value = false;
  isCompleted.value = false;
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
