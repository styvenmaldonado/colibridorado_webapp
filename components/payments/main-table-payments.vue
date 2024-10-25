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
      const { data } = await client.models.EventsUser.list({});
    },
    getColor(q: string) {
      switch (q) {
        case "Pendiente":
          return "bg-yellow-500 rounded-lg text-white w-fit px-3";
          break;
        case "Aprobado":
          return "bg-green-600 rounded-lg text-white w-fit px-3";
          break;
        case "Rechazado":
          return "bg-red-600 rounded-lg text-white w-fit px-3";
          break;
      }
    },
  },
};
</script>

<template>
  <v-data-table-server
    v-model:items-per-page="itemsPerPage"
    :headers="[
      { title: 'Usuario', key: 'user', align: 'start' },
      { title: 'Evento y/o Ceremonia', key: 'event', align: 'start' },
      { title: 'Pago', key: 'payment', align: 'start' },
    ]"
    :items="serverItems"
    :items-length="totalItems"
    :loading="loading"
    item-value="name"
    @update:options="loadItems"
  >
    <template v-slot:item.user="{ value }">
      <div class="flex flex-col py-3">
        <span class="font-bold">{{ value.name }}</span>
        <span>{{ value.doc }}</span>
      </div>
    </template>
    <template v-slot:item.event="{ value }">
      <div class="flex flex-col py-3">
        <span>{{ value.name }}</span>
      </div>
    </template>
    <template v-slot:item.payment="{ value }">
      <div class="flex flex-col py-3">
        <span :class="getColor(value.status)">{{ value.status }}</span>
        <span>{{ value.value }}</span>
        <span>{{ value.datetime }}</span>
        <span>{{ value.payment_method }}</span>
      </div>
    </template>
  </v-data-table-server>
</template>
