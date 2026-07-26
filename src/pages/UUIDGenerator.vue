<script setup lang="ts">
const returnPage = () => {
  history.back();
};
</script>

<template>
  <button class="btn return" @click="returnPage">戻る</button>
  <p>テスト</p>
</template>

<style scoped>
.btn {
  background-color: #333;
  border-radius: 6px;
  box-shadow: 0px 3px 20px rgba(255, 255, 255, 0.2);
  color: #ffffff;
  display: block;
  font-size: 14px;
  text-align: center;
  text-decoration: none;
  padding: 10px 20px;
  cursor: pointer;
  transition:
    transform 0.1s,
    box-shadow 0.1s;
  font-weight: 600;
  letter-spacing: 0.5px;
  font-family: system-ui;
  border: none;
}

.btn:hover {
  background-color: #3d3d3d;
  box-shadow: 0px 3px 20px rgba(255, 255, 255, 0.3);
  transition: box-shadow 0.2s;
  transform: translateY(-2px);
}

.btn:active {
  transform: translateY(2px);
  box-shadow: 0 1px 0 rgba(0, 0, 0, 0.3);
}
</style>
