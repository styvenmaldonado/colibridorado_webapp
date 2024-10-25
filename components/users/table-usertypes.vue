<script lang="ts">
import type { deleteUser } from "aws-amplify/auth";
import { toast } from "vue3-toastify";
import { client } from "~/libs/AmplifyDataClient";



export default {
  data: () => ({
    itemsPerPage: 5,
    serverItems: [],
    loading: true,
    totalItems: 0,
    dialog: false,
  }),
  methods: {
    async loadItems() {
      const { data } = await client.models.UsersTypes.list();
      // @ts-ignore: serverItems never[]
      this.serverItems.push(...data);
      this.loading = false;
    },
    async deleteUser(value: number) {
      const router = useRouter()
   
      const { errors } = await client.models.UsersTypes.delete({
        id: value.toString(),
      });
      this.dialog = false;
      if (!errors) {
        toast("Tipo de Usuario Eliminado con Exito!", {
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
    },
  },
};
</script>
<template>
  <v-data-table-server
    v-model:items-per-page="itemsPerPage"
    :headers="[
      {
        title: 'Tipo Usuario',
        align: 'start',
        sortable: false,
        key: 'name',
      },
      {
        align: 'end',
        sortable: false,
        key: 'id',
      },
    ]"
    :items="serverItems"
    :items-length="totalItems"
    :loading="loading"
    item-value="name"
    @update:options="loadItems"
  >
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
              >Eliminar Tipo de Usuario</span
            >
          </span>
          <div class="border border-gray-200"></div>
          <span
            >¿Estas seguro que quieres eliminar de la base de datos el tipo de
            usuario?</span
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
              @click="deleteUser(value)"
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
