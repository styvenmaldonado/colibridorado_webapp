<script setup lang="ts" >
import { useListEvents } from "~/hooks/events";

const route = useRoute();

const model = reactive({
  itemsPerPage: 5,
  serverItems: [],
  loading: false,
  totalItems: 0,
});

const loadItems = async () => {
  const { data } = await useListEvents({ q: undefined });
  // @ts-ignore
  model.serverItems = data.value?.data;
}

const handleClick = async (e: PointerEvent, row: any) => {
  const { id } = model.serverItems[row?.index || 0];
  await navigateTo(`/events/detail/${id}`);
};

watch(
  () => route.query,
  async (value) => {
    model.loading = true;
    const { data } = await useListEvents(value);
    //@ts-ignore
    model.serverItems = data.value?.data;
    model.loading = false;
  }
);

</script>
<template>
  <v-data-table-server
    v-model:items-per-page="model.itemsPerPage"
    :headers="[
      {
        title: 'Evento y/o Ceremonia',
        align: 'start',
        sortable: false,
        key: 'name',
      },

      { title: 'Tipo', key: 'type', align: 'end' },
      { title: 'Ubicación', key: 'location', align: 'end' },
      { title: 'Fecha', key: 'datetime_start', align: 'end' },
    ]"
    :items="model.serverItems"
    :items-length="model.totalItems"
    :loading="model.loading"
    item-value="name"
    @update:options="loadItems"
    @click:row="handleClick"
  ></v-data-table-server>
</template>
