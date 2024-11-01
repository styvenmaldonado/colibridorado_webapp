<script setup lang="ts">
import {reactive} from "vue";
import {useListPayments} from "~/hooks/payments";
import {formatCurrency, formatDate} from "../../libs/format";


const route = useRoute();
const tablePaymentsEventsUIState = reactive({
  itemsPerPage: 5,
  serverItems: [],
  isLoading: false,
  totalItems: 0,
});

const loadItems = async () => {
  tablePaymentsEventsUIState.isLoading = true;
  try {
    const {data} = await useListPayments({
      eventId: route.params.id.toString(),
    })
    tablePaymentsEventsUIState.serverItems = data.value?.data || [];
  } finally {
    tablePaymentsEventsUIState.isLoading = false;
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
  <loading :isLoading="tablePaymentsEventsUIState.isLoading"/>
  <v-data-table-server
      v-model:items-per-page="tablePaymentsEventsUIState.itemsPerPage"
      :headers="[
      { title: 'Transaccion', key: 'payment', align: 'start' },
      { title: 'Usuario', key: 'users', align: 'start' },
    ]"
      :items="tablePaymentsEventsUIState.serverItems"
      :items-length="tablePaymentsEventsUIState.totalItems"
      :loading="tablePaymentsEventsUIState.isLoading"
      item-value="name"
      @update:options="loadItems"
  >
    <template v-slot:item.users="{ value }">
      <div class="grid py-3">
        <span class="font-bold uppercase">{{ value.family_name }} {{ value.given_name }}</span>
        <span>{{ value.email }}</span>
        <span>{{ value.phone_number }}</span>
        <span>{{ value.method }}</span>
        <span>{{ JSON.parse(value.rol)[0].name }}</span>
      </div>
    </template>
    <template v-slot:item.payment="{ value }">
      <div v-if="value" class="grid py-3">
        <span :class="getColor(value.status) + ' ' +'px-3 py-1.5 rounded-lg w-fit'">{{
            getMaskValue(value.status)
          }}</span>
        <span class="font-bold">+ ${{ formatCurrency(value.value / 100, 'es-ES', 'COP') }}</span>
        <span>{{ value.name }}</span>
      </div>
    </template>
  </v-data-table-server>
</template>