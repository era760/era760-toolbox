<script setup lang="ts">
import { ref } from "vue";
import BaseButton from "../components/BaseButton.vue";
import { generateUUID } from "../utils/uuid";
import { returnPage } from "../utils/navigation.ts";

const currentUUID = ref<string>("");
const copied = ref<boolean>(false);

const handleGenerate = () => {
  currentUUID.value = generateUUID();
  copied.value = false;
};

const handleCopy = async () => {
  if (!currentUUID.value) return;

  try {
    await navigator.clipboard.writeText(currentUUID.value);

    copied.value = true;

    setTimeout(() => {
      copied.value = false;
    }, 2000);
  } catch (error) {
    console.error("コピーに失敗しました。", error);
  }
};
</script>

<template>
  <div class="flex flex-col items-center justify-center p-6 relative min-h-screen w-full">
    <BaseButton class="absolute top-4 left-4 w-24" @click="returnPage">戻る</BaseButton>

    <h1 class="text-2xl font-bold mt-4">UUID Generator(Beta)</h1>
    <p class="text-zinc-400 mt-2 mb-6">UUIDを生成します。Beta版です。</p>

    <div class="flex flex-col gap-8 w-full max-w-md">
      <input
        type="text"
        readonly
        :value="currentUUID"
        placeholder="ボタンを押して生成"
        class="bg-[#1a1a1a] p-3 rounded-md border border-[#333] text-green-400 font-mono text-sm text-center select-all focus:outline-none w-full" />
      <BaseButton class="w-full" @click="handleGenerate">UUIDを生成</BaseButton>

      <BaseButton
        class="w-full bg-zinc-700! hover:bg-zinc-600! disabled:opacity-50"
        @click="handleCopy"
        :disabled="!currentUUID">
        {{ copied ? "コピー完了！" : "コピー" }}
      </BaseButton>
    </div>
  </div>
</template>
