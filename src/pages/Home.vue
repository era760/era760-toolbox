<script setup lang="ts">
import BaseButton from "../components/BaseButton.vue";

const openGitHub = () => {
  window.open("https://github.com/era760/era760-toolbox", "_blank");
};
</script>

<template>
  <div class="flex flex-col items-center gap-3">
    <h1 class="text-3xl font-bold">era760's ToolBox</h1>
    <p class="font-medium">Minecraftアドオン開発を、もっと簡単に。</p>
    <p class="font-medium text-sm text-zinc-400">動作確認済み環境：Windows 11 151.0.4129.15</p>

    <div class="flex flex-col gap-8 mt-2">
      <RouterLink to="/uuid" class="w-80">
        <BaseButton class="w-full">UUID Generator(Beta)</BaseButton>
      </RouterLink>

      <BaseButton class="w-80">Item JSON Generator(WIP)</BaseButton>
      <BaseButton class="w-80">Manifest Generator(WIP)</BaseButton>
      <BaseButton class="w-80">and more!</BaseButton>

      <BaseButton class="w-80 bg-[#423f3f]! hover:!bg[#4d4a4a]" @click="openGitHub"> GitHub </BaseButton>
    </div>
  </div>
</template>
