<script lang="ts">
import { client } from "~/libs/AmplifyDataClient";

export default {
  data: () => ({
    itemsPerPage: 5,
    serverItems: [],
    loading: false,
    totalItems: 0,
  }),
  methods: {
    async loadItems() {
      const route = useRoute();
      const { data } = await client.models.EventsUser.list({
        filter: {
          userId: {
            eq: route.query.id?.toString() || "",
          },
        },
      });
      // @ts-ignore
      this.serverItems = data
    },
  },
};
</script>
<template>
  <v-data-table-server
    v-model:items-per-page="itemsPerPage"
    :headers="[
      { title: 'Evento', key: 'status', align: 'start' },
      { title: 'Pago', key: 'datetime', align: 'start' },
      { title: 'Fecha', key: 'value', align: 'end' },
    ]"
    :items="serverItems"
    :items-length="totalItems"
    :loading="loading"
    item-value="name"
    @update:options="loadItems"
  ></v-data-table-server>
</template>
