<script setup lang="ts">
const openGitHub = () => {
  window.open("https://github.com/era760/era760-toolbox", "_blank");
};
</script>

<template>
  <div class="container">
    <h1>era760's ToolBox</h1>
    <p>Minecraft Bedrock Add-on開発を、もっと簡単に。</p>
    <p>動作確認済み環境：Windows 11 Edge 151.0.4129.15</p>
    <RouterLink class="btn uuid_gens" to="/uuid">UUID Generator(Beta)</RouterLink>
    <button class="btn item_gens">Item JSON Generator(WIP)</button>
    <button class="btn manifest_gens">Manifest Generator(WIP)</button>
    <button class="btn github" @click="openGitHub">GitHub</button>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
}

p {
  font-weight: 550;
}

.btn {
  width: 320px;
  background-color: #333;
  border-radius: 6px;
  box-shadow: 0px 3px 20px rgba(255, 255, 255, 0.2);
  color: #ffffff;
  display: block;
  font-size: 14px;
  text-align: center;
  text-decoration: none;
  margin: 10px auto;
  padding: 10px 0;
  cursor: pointer;
  transition:
    transform 0.1s,
    box-shadow 0.1s;
  font-weight: 600;
  letter-spacing: 0.5px;
  font-family: system-ui;
  border: none;
}

.github {
  background-color: #423f3f;
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
