<script setup lang="ts">
import BaseButton from "../../components/BaseButton.vue";
import { returnPage } from "../../utils/navigation.ts";
</script>

<template>
  <div class="flex flex-col items-center justify-center p-6 relative min-h-screen w-full">
    <BaseButton class="absolute top-4 left-4 w-24" @click="returnPage">戻る</BaseButton>

    <h1>WIPページ</h1>
    <p>開発中です。</p>
  </div>
</template>
