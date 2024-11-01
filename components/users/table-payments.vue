<script setup lang="ts">
import {reactive} from "vue";
import {useListPayments} from "~/hooks/payments";
import {formatCurrency, formatDate} from "../../libs/format";

const route = useRoute();

const tablePaymentsUIState = reactive({
  itemsPerPage: 5,
  serverItems: [],
  isLoading: false,
  totalItems: 0,
});

const loadItems = async () => {
  tablePaymentsUIState.isLoading = true;
  try {
    const {data} = await useListPayments({
      userId: route.params.id,
    })
    tablePaymentsUIState.serverItems = data.value?.data || [];
  } finally {
    tablePaymentsUIState.isLoading = false;
  }
};

const getColor = (value: string) => {
  switch (value) {
    case "PENDING":
      return "bg-yellow-400";
    case "APPROVED":
      return "bg-green-400";
    case "DECLINED":
      return "bg-red-400";
    case "VOIDED":
      return "bg-red-400";
    case "ERROR":
      return "bg-red-400";
    default:
      return "bg-black"; // Valor por defecto
  }
}

const getMaskValue = (value: string) => {
  switch (value) {
    case "PENDING":
      return "Pendiente";
    case "APPROVED":
      return "Aprobado";
    case "DECLINED":
      return "Declinado";
    case "VOIDED":
      return "Declinado";
    case "ERROR":
      return "Error";
    default:
      return "Error"; // Valor por defecto
  }
}
</script>

<template>
  <loading :isLoading="tablePaymentsUIState.isLoading"/>
  <v-data-table-server
      v-model:items-per-page="tablePaymentsUIState.itemsPerPage"
      :headers="[
      { title: 'Transaccion', key: 'payment', align: 'start' },
      { title: 'Evento', key: 'events', align: 'start' },
    ]"
      :items="tablePaymentsUIState.serverItems"
      :items-length="tablePaymentsUIState.totalItems"
      :loading="tablePaymentsUIState.isLoading"
      item-value="name"
      @update:options="loadItems"
  >
    <template v-slot:item.events="{ value }">
      <div v-if="value" class="grid py-3">
        <span class="font-bold">{{ value.name }}</span>
        <span>{{ value.location }}</span>
        <span>{{ formatDate(new Date(value.datetime_start)) }}</span>
      </div>
    </template>
    <template v-slot:item.payment="{ value }">
      <div v-if="value" class="grid py-3">
        <span :class="getColor(value.status) + ' ' +'px-3 py-1.5 rounded-lg w-fit'">{{
            getMaskValue(value.status)
          }}</span>
        <span>${{ formatCurrency(value.value / 100, 'es-ES', 'COP') }}</span>
        <span>{{ value.name }}</span>
      </div>
    </template>
  </v-data-table-server>
</template>