<script setup lang="ts">
import { useListUser } from "~/hooks/users";

const route = useRoute();

const model = reactive({
  itemsPerPage: 5,
  serverItems: [],
  loading: true,
  totalItems: 0,
});

const loadItems = async () => {
  const { data } = await useListUser({ q: undefined });
  //@ts-ignore
  model.serverItems = data.value?.data;
  model.totalItems = data.value?.count || 0;
  model.loading = false;
};

const handleClick = async (e: PointerEvent, row: any) => {
  model.loading = true
  const { id } = model.serverItems[row?.index || 0];
  await navigateTo(`/users/detail/${id}`);
};

watch(
  () => route.query,
  async (value) => {
    model.loading = true;
    const { data } = await useListUser(value);
    //@ts-ignore
    model.serverItems = data.value?.data;
    model.loading = false;
  }
);
</script>
<template>
  <loading :is-loading="model.loading"/>
  <v-data-table-server
    v-model:items-per-page="model.itemsPerPage"
    :headers="[
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
    ]"
    loading-text="Cargando... Por favor espere!"
    :items="model.serverItems"
    :items-length="model.totalItems"
    :loading="model.loading"
    item-value="name"
    @update:options="loadItems"
    @click:row="handleClick"
  ></v-data-table-server>
</template>
