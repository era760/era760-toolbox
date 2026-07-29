<script setup lang="ts">
import BaseButton from "../components/BaseButton.vue";
import { returnPage } from "../utils/navigation.ts";
import { generateUUID } from "../utils/uuid.ts";
import { ref, computed } from "vue";

interface Version {
  major: number;
  minor: number;
  revision: number;
}

interface ManifestData {
  packType: "BP" | "RP";
  name: string;
  description: string;
  version: Version;
  minEngineVersion: Version;
  headerUUID: string;
  moduleUUID: string;
}

const manifestData = ref<ManifestData>({
  packType: "BP",
  name: "",
  description: "",
  version: {
    major: 1,
    minor: 0,
    revision: 0,
  },
  minEngineVersion: {
    major: 1,
    minor: 21,
    revision: 0,
  },
  headerUUID: generateUUID(),
  moduleUUID: generateUUID(),
});

const changePackType = () => {
  manifestData.value.packType = manifestData.value.packType === "BP" ? "RP" : "BP";
};

const regenerateUUID = () => {
  manifestData.value.headerUUID = generateUUID();
  manifestData.value.moduleUUID = generateUUID();
};

const isValidVersion = (v: Version) => {
  return (
    typeof v.major === "number" &&
    typeof v.minor === "number" &&
    typeof v.revision === "number" &&
    Number.isInteger(v.major) &&
    Number.isInteger(v.minor) &&
    Number.isInteger(v.revision) &&
    v.major >= 0 &&
    v.minor >= 0 &&
    v.revision >= 0
  );
};

const formatVersion = (v: Version) => {
  return isValidVersion(v) ? `${v.major}.${v.minor}.${v.revision}` : "（入力中...）";
};

const isVersionValid = computed(() => isValidVersion(manifestData.value.version));

const isMEVersionValid = computed(() => isValidVersion(manifestData.value.minEngineVersion));

const versionText = computed(() => formatVersion(manifestData.value.version));

const minEngineVersionText = computed(() => formatVersion(manifestData.value.minEngineVersion));

const canGenerateManifest = computed(() => {
  return (
    isVersionValid.value &&
    isMEVersionValid.value &&
    manifestData.value.headerUUID !== "" &&
    manifestData.value.moduleUUID !== "" &&
    manifestData.value.name.trim() !== "" &&
    manifestData.value.description.trim() !== ""
  );
});

// --- Manifest Generator ---

// --- Helper Functions ---

const getVersionArray = (v: Version): number[] => {
  return [
    typeof v.major === "number" && Number.isInteger(v.major) && v.major >= 0 ? v.major : 0,
    typeof v.minor === "number" && Number.isInteger(v.minor) && v.minor >= 0 ? v.minor : 0,
    typeof v.revision === "number" && Number.isInteger(v.revision) && v.revision >= 0 ? v.revision : 0,
  ];
};

const generateHeader = () => {
  const data = manifestData.value;
  return {
    name: data.name,
    description: data.description,
    version: getVersionArray(data.version),
    uuid: data.headerUUID,
    min_engine_version: getVersionArray(data.minEngineVersion),
  };
};

const generateModule = () => {
  const data = manifestData.value;

  return {
    type: data.packType === "BP" ? "data" : "resources",
    description: data.packType === "BP" ? "behavior module" : "resource module",
    version: getVersionArray(data.version),
    uuid: data.moduleUUID,
  };
};

// Helper Functions end

const generateManifest = () => {
  return {
    format_version: 2,
    header: generateHeader(),
    modules: [generateModule()],
  };
};

const generatedManifest = computed(() => {
  return JSON.stringify(generateManifest(), null, 2);
});

// Manifest Generator End

const copyJSON = async () => {
  try {
    await navigator.clipboard.writeText(generatedManifest.value);
  } catch (e) {
    console.error(e);
  }
};
</script>

<template>
  <div class="flex flex-col items-center justify-center p-6 relative min-h-screen w-full">
    <BaseButton class="absolute top-4 left-4 w-24" @click="returnPage"> 戻る </BaseButton>

    <h1 class="text-2xl font-bold mt-4">Manifest Generator(Beta)</h1>

    <p class="text-zinc-400 mt-2 mb-6">Manifest.jsonを生成します。Beta版です。</p>

    <div class="flex flex-col gap-8 w-full max-w-md">
      <!-- Pack Type -->
      <div>
        <p class="mb-2">現在のパックタイプ：{{ manifestData.packType }}</p>

        <BaseButton @click="changePackType"> パックタイプの変更 </BaseButton>
      </div>

      <div>
        <p class="mb-2">現在のアドオンの名前：{{ manifestData.name }}</p>
        <input
          type="text"
          v-model="manifestData.name"
          class="w-full px-4 py-2 bg-gray-800 text-white rounded-lg border border-gray-700 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors" />

        <p class="mb-2">現在のアドオンの説明：{{ manifestData.description }}</p>
        <input
          type="text"
          v-model="manifestData.description"
          class="w-full px-4 py-2 bg-gray-800 text-white rounded-lg border border-gray-700 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors" />
      </div>

      <!-- Version -->
      <div class="flex flex-col gap-2">
        <p>現在のパックバージョン：{{ versionText }}</p>

        <p v-if="!isVersionValid" class="text-yellow-400 text-sm">
          Versionを入力してください
          <router-link to="/faq/manifest" class="underline hover:text-yellow-300 transition-colors">
            なぜこれが表示されるのですか？
          </router-link>
        </p>

        <div class="flex gap-2">
          <input
            v-model.number="manifestData.version.major"
            type="number"
            min="0"
            step="1"
            placeholder="major"
            class="w-full rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-2 text-center outline-none focus:border-zinc-500" />

          <input
            v-model.number="manifestData.version.minor"
            type="number"
            min="0"
            step="1"
            placeholder="minor"
            class="w-full rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-2 text-center outline-none focus:border-zinc-500" />

          <input
            v-model.number="manifestData.version.revision"
            type="number"
            min="0"
            step="1"
            placeholder="revision"
            class="w-full rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-2 text-center outline-none focus:border-zinc-500" />
        </div>
      </div>

      <!-- Min Engine Version -->
      <div class="flex flex-col gap-2">
        <p>
          現在の最小要求バージョン：
          {{ minEngineVersionText }}
        </p>

        <p v-if="!isMEVersionValid" class="text-yellow-400 text-sm">minEngineVersionを入力してください</p>

        <div class="flex gap-2">
          <input
            v-model.number="manifestData.minEngineVersion.major"
            type="number"
            min="0"
            step="1"
            placeholder="major"
            class="w-full rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-2 text-center outline-none focus:border-zinc-500" />

          <input
            v-model.number="manifestData.minEngineVersion.minor"
            type="number"
            min="0"
            step="1"
            placeholder="minor"
            class="w-full rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-2 text-center outline-none focus:border-zinc-500" />

          <input
            v-model.number="manifestData.minEngineVersion.revision"
            type="number"
            min="0"
            step="1"
            placeholder="revision"
            class="w-full rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-2 text-center outline-none focus:border-zinc-500" />
        </div>
      </div>

      <!-- UUID -->
      <div class="flex flex-col gap-2">
        <p class="break-all text-sm text-zinc-400">
          HeaderUUID:
          {{ manifestData.headerUUID }}
        </p>

        <p class="break-all text-sm text-zinc-400">
          ModuleUUID:
          {{ manifestData.moduleUUID }}
        </p>

        <BaseButton @click="regenerateUUID"> UUIDを再生成 </BaseButton>
      </div>

      <!-- Status -->
      <div class="rounded-lg border border-zinc-700 p-4 text-sm">
        <p>
          Manifest生成：
          <span :class="canGenerateManifest ? 'text-green-400' : 'text-red-400'">
            {{ canGenerateManifest ? "生成可能" : "入力待ち" }}
          </span>
        </p>
      </div>
      <pre class="bg-zinc-900 rounded-lg p-4 overflow-auto text-sm"
        >{{ generatedManifest }}
</pre
      >
      <BaseButton @click="copyJSON"> JSONコピー </BaseButton>
    </div>
  </div>
</template>
