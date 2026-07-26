<script setup lang="ts">
import BaseButton from "../components/BaseButton.vue";

const returnPage = () => {
  history.back();
};
</script>

<template>
  <div class="flex flex-col items-center justify-center p-6">
    <BaseButton @click="returnPage">戻る</BaseButton>
    <h1 class="text-2xl font-bold mt-4">UUID Generator(Beta)</h1>
    <p class="text-zinc-400 mt-2">UUIDを生成します。Beta版です。</p>
  </div>
</template>
