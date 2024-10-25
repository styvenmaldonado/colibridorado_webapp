<script lang="ts">
import { client } from "../../libs/AmplifyDataClient";

export default {
  data: () => ({
    itemsPerPage: 5,
    serverItems: [],
    loading: true,
    totalItems: 0,
  }),
  methods: {
    async loadItems() {
      const { data } = await client.models.Users.list();
      // @ts-ignore: serverItems never[]
      this.serverItems.push(...data)
      this.loading = false;
    },
    async handleClick(e: PointerEvent, row: any) {
      const { id } = this.serverItems[row?.index || 0]
      await navigateTo(`/users/detail/${id}`)
    }
  },
}


</script>
<template>
  <v-data-table-server v-model:items-per-page="itemsPerPage" :headers="[
    {
      title: 'Nombres',
      align: 'start',
      sortable: false,
      key: 'given_name',
    },
    {
      title: 'Apellidos',
      align: 'start',
      sortable: false,
      key: 'family_name',
    },
    { title: 'Tipo Documento', key: 'tipo_documento', align: 'end' },
    { title: 'Numero Documento', key: 'numero_documento', align: 'end' },
    { title: 'Telefono', key: 'phone_number', align: 'end' },
    { title: 'Email', key: 'email', align: 'end' },
  ]" loading-text="Cargando... Por favor espere!" :items="serverItems" :items-length="totalItems" :loading="loading"
    item-value="name" @update:options="loadItems" @click:row="handleClick"></v-data-table-server>
</template>