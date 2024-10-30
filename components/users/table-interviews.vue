<script setup lang="ts">
import { format } from "date-fns";
import { toast } from "vue3-toastify";
import { useDeleteInterview, useListInterview } from "~/hooks/interviews";

const itemsPerPage = 50;
const serverItems = ref();
const isLoading = ref(false);
const totalItems = ref();
const dialog = ref(false);

const loadItems = async () => {
  isLoading.value = true;
  const route = useRoute();
  const { data } = await useListInterview(route.params.id.toString() || "");
  //@ts-ignore
  serverItems.value = data.value?.data;
  isLoading.value = false;
};

const deleteInterview = async (value: number) => {
  const { error } = await useDeleteInterview(value.toString());
  dialog.value = false;
  if (!error.value) {
    toast("Registro de Entrevista Eliminado con Exito!", {
      theme: "colored",
      type: "success",
      dangerouslyHTMLString: true,
    });
  } else {
    toast("Error, Intenta Nuevamente!", {
      theme: "colored",
      type: "error",
      dangerouslyHTMLString: true,
    });
  }
};
</script>
<template>

  <v-data-table-server
    v-model:items-per-page="itemsPerPage"
    :headers="[
      {
        title: 'Estado',
        align: 'start',
        sortable: false,
        key: 'isVerified',
      },

      { title: 'Descripción', key: 'description', align: 'center' },
      { title: 'Fecha', key: 'createdAt', align: 'end' },
      { key: 'id', align: 'end' },
    ]"
    :items="serverItems"
    :items-length="totalItems"
    :loading="isloading"
    item-value="name"
    @update:options="loadItems"
  >
    <template v-slot:item.isVerified="{ value }">
      <p>{{ value ? "Admitido" : "No Admitido" }}</p>
    </template>
    <template v-slot:item.description="{ value }">
      <p class="py-4">{{ value }}</p>
    </template>
    <template v-slot:item.createdAt="{ value }">
      <p>
        {{ format(new Date(value || ""), "d 'de' MMMM yyyy - hh:mm aaaa") }}
      </p>
    </template>
    <template v-slot:item.id="{ value }">
      <button @click="dialog = true" class="text-red-600">
        <v-icon size="large">mdi-close-circle</v-icon>
      </button>
      <v-dialog v-model="dialog" class="flex">
        <div
          class="bg-white w-2/6 h-auto m-auto gap-6 rounded-lg shadow-lg flex flex-col p-8"
        >
          <span class="flex gap-4 items-center text-red-600 py-2">
            <v-icon size="x-large">mdi mdi-alert</v-icon>
            <span class="text-3xl text-black font-bold"
              >Eliminar Registro de Entrevista</span
            >
          </span>
          <div class="border border-gray-200"></div>
          <span
            >¿Estas seguro que quieres eliminar de la base de datos el registro
            de entrevista?</span
          >
          <div class="border border-gray-200"></div>
          <div class="flex gap-3">
            <button
              @click="dialog = false"
              class="ml-auto bg-gray-200 text-black px-6 py-4 rounded-lg"
            >
              Cancel
            </button>
            <button
              @click="deleteInterview(value)"
              class="bg-red-600 text-white px-6 py-4 rounded-lg"
            >
              Eliminar
            </button>
          </div>
        </div>
      </v-dialog>
    </template>
  </v-data-table-server>
</template>

{
