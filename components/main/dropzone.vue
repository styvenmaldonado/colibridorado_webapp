<script setup lang="ts">
import { useDropzone } from "vue3-dropzone";
import type { FileRejectReason } from "vue3-dropzone";
import { v4 as uuidv4 } from "uuid";
import { MimeTypeToExtention } from "~/libs/MimeType";

const emits = defineEmits(["submit"]);

const files: Ref<File[]> = ref([]);
const loading: Ref<boolean> = ref(false);
const runtimeConfig = useRuntimeConfig();

const { getRootProps, getInputProps, ...rest } = useDropzone({ onDrop });
function onDrop(acceptFiles: File[], rejectReasons: FileRejectReason[]) {
  files.value = [...files.value, ...acceptFiles];
}

const view = (file: File) => {
  return URL.createObjectURL(file);
};

async function convertToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
}

const uploadFiles = async () => {
  loading.value = true;
  const photos: string[] = files.value.map((file, index) => {
    const id: string = `media/${uuidv4()}.${MimeTypeToExtention(file.type)}`;
    convertToBase64(file).then((base64) => {
      fetch("/api/s3", {
        body: JSON.stringify({
          id,
          base64,
          'Content-Type': file.type
        }),
        method: "POST",
      });
    });
    return id;
  });
  emits("submit", photos);
  loading.value = false;
};
</script>
<template>
  <div
    v-if="loading"
    style="z-index: 9999"
    class="fixed w-screen h-screen bg-gray-600 opacity-45 flex"
  >
    <div class="m-auto">
      <v-progress-circular indeterminate :size="76"></v-progress-circular>
    </div>
  </div>
  <div>
    <div class="grid grid-cols-2 gap-4 my-4">
      <div class="relative" v-for="(file, index) in files" :key="index">
        <img
          class="w-full h-96 object-cover rounded-lg border-2 border-gray-200"
          :src="view(file)"
        />
        <div class="absolute right-0 top-0 p-4">
          <button
            @click="() => (files = files.filter((c, i) => i !== index))"
            class="flex h-12 w-12 rounded-full bg-black border-gray-400 shadow-xl"
          >
            <v-icon class="m-auto text-white">mdi-close</v-icon>
          </button>
        </div>
      </div>
    </div>

    <div
      class="bg-slate-100 rounded-lg p-12 border-dashed border-2 border-sky-500"
      v-bind="getRootProps()"
    >
      <input v-bind="getInputProps()" />
      <div>
        <v-icon size="large">mdi-cloud-upload-outline</v-icon>
        <p>
          Arrastre y suelte algunos archivos aquí, o haga clic para seleccionar
          archivos
        </p>
      </div>
    </div>
    <button
      v-if="files.length"
      @click="uploadFiles"
      class="bg-blue-600 text-white w-full py-3 rounded-lg my-4"
    >
      Enviar
    </button>
  </div>
</template>
