<script setup lang="ts">
import { debounce } from "lodash";
import { useListUserTypes } from "~/hooks/userTypes";

const { data: userTypeList } = await useListUserTypes();

const model = reactive({
  q: "",
  userType: [],
});

const router = useRouter();
watch(
  model,
  debounce((value) => {
    const p = new URLSearchParams(value).toString();
    router.push("?" + p);
  }, 1000)
);
</script>
<template>
  <div>
    <div class="flex items-center pt-8">
      <div>
        <h1 class="text-4xl font-bold">Usuarios</h1>
      </div>
      <div class="ml-auto">
        <button
          @click="navigateTo('/users/create')"
          class="px-5 font-bold rounded-lg py-3 bg-gradient-to-r from-fuchsia-900 to-violet-950 text-white"
        >
          + Nuevo Usuario
        </button>
      </div>
    </div>
  </div>
  <div class="flex my-4"></div>
  <div class="py-4 flex gap-2">
    <v-text-field
      v-model="model.q"
      variant="outlined"
      prepend-inner-icon="mdi-magnify"
      label="Buscar"
    ></v-text-field>
    <v-select
      v-model="model.userType"
      label="Tipo Usuario"
      :items="userTypeList?.data"
      variant="outlined"
      item-value="id"
    >
    <template v-slot:chip="{ props, item }">
                <v-chip
                  v-bind="props"
                 
                  :text="item.raw.name"
                ></v-chip>
              </template>
      <template v-slot:item="{ props, item }">
        <v-list-item v-bind="props" :title="item.raw.name"></v-list-item>
      </template>
    </v-select>
    <button
      class="flex gap-2 text-sm bg-green-200 rounded-lg px-4 items-center h-14"
    >
      <v-icon>mdi-microsoft-excel</v-icon>
      <span>Descargar CSV</span>
    </button>
  </div>
  <table-users></table-users>
</template>
