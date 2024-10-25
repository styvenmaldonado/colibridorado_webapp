<script lang="ts">
import { client } from '~/libs/AmplifyDataClient';

export default {
  data: () => ({
    itemsPerPage: 5,
    serverItems: [],
    loading: false,
    totalItems: 0,
  }),
  methods: {
    async loadItems() {
      const route = useRoute()
      const { data } = await client.models.EventsUser.list({
        filter: {
          eventId: {
            eq: route.params.id.toString() || ""
          }
        }
      })
      // @ts-ignore
      this.serverItems = data;
    },
  },
}
</script>
<template>
  <v-data-table-server v-model:items-per-page="itemsPerPage" :headers="[
    { title: 'Nombre', key: 'name', align: 'start' },
    { title: 'Estado', key: 'status', align: 'center' },
    { title: 'Fecha', key: 'datetime', align: 'start' },
    { title: 'Valor', key: 'value', align: 'start' },
  ]" :items="serverItems" :items-length="totalItems" :loading="loading" item-value="name"
    @update:options="loadItems"></v-data-table-server>
</template>