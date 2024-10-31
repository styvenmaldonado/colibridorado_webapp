<script setup lang="ts">
import { useListEventUsers } from "~/hooks/eventsUsers";
import { ref, reactive } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();

const tableUserEventUIState = reactive({
  itemsPerPage: 5,
  serverItems: [],
  isLoading: false,
  totalItems: 0,
});

const loadItems = async () => {
  tableUserEventUIState.isLoading = true;
  try {
    const { data } = await useListEventUsers({
      eventId: route.params.id.toString(),
    });
    tableUserEventUIState.serverItems = data.value?.data || [];
  } finally {
    tableUserEventUIState.isLoading = false;
  }
};

loadItems();
</script>

<template>
  <loading :isLoading="tableUserEventUIState.isLoading" />
  <v-data-table-server
      v-model:items-per-page="tableUserEventUIState.itemsPerPage"
      :headers="[
      { title: 'Nombre', key: 'users', align: 'start' },
      { title: '¿Necesita Transporte?', key: 'needs_transport', align: 'center' },
      { title: 'Asientos Disponibles', key: 'available_seats_number', align: 'start' },
      { title: 'Preinscripciones', key: 'medicalPreincription', align: 'start' },
    ]"
      :items="tableUserEventUIState.serverItems"
      :items-length="tableUserEventUIState.totalItems"
      :loading="tableUserEventUIState.isLoading"
      item-value="name"
      @update:options="loadItems"
  >
    <template v-slot:item.users="{ value }">
      <div class="grid py-3">
        <span class="font-bold uppercase">{{ value.family_name }} {{ value.given_name }}</span>
        <span>{{ value.email }}</span>
        <span>{{ value.phone_number }}</span>
        <span>{{ JSON.parse(value.rol)[0].name }}</span>
      </div>
    </template>
    <template v-slot:item.needs_transport="{ value }">
      <span>{{ value ? 'Sí' : 'No' }}</span>
    </template>
    <template v-slot:item.available_seats_number="{ value }">
      <span>{{ value }}</span>
    </template>
    <template v-slot:item.medicalPreincription="{ value }">
      <div class="flex flex-col">
        <span><span class="font-bold">Medicamento: </span>{{ JSON.parse(value).medicine }}</span>
        <span><span class="font-bold">Referido por: </span>{{ JSON.parse(value).referBy }}</span>
        <span><span class="font-bold">Condiciones Médicas: </span>{{ JSON.parse(value).preinscriptions }}</span>
      </div>
    </template>
  </v-data-table-server>
</template>