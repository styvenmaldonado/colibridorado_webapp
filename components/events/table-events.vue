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
      const { data } = await client.models.Events.list()
      // @ts-ignore
      this.serverItems = data
    },
    async handleClick(e: PointerEvent, row: any) {
      const { id } = this.serverItems[row?.index || 0]
      await navigateTo(`/events/detail/${id}`)
    }
  },
}
</script>
<template>
  <v-data-table-server v-model:items-per-page="itemsPerPage" :headers="[
    {
      title: 'Evento y/o Ceremonia',
      align: 'start',
      sortable: false,
      key: 'name',
    },

    { title: 'Tipo', key: 'type', align: 'end' },
    { title: 'Ubicación', key: 'location', align: 'end' },
    { title: 'Fecha', key: 'datetime_start', align: 'end' },
  ]" :items="serverItems" :items-length="totalItems" :loading="loading" item-value="name" @update:options="loadItems"
    @click:row="handleClick"></v-data-table-server>
</template>