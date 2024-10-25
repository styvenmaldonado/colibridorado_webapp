<script lang="ts">
export default {
  data: () => ({
    userTypes: [
      "Caminantes No Entrenad@s",
      "Caminantes Entrenad@s",
      "Caminantes Entrenamiento Especial",
      "Caminantes Administrativo",
      "Caminantes Logistica",
      "Caminantes Acostad@s",
    ],
  }),
  methods: {
    async goTo(route: string) {
      await navigateTo({ path: route });
    },
  },
};
</script>
<template>
  <div>
    <div class="flex items-center pt-8">
      <div>
        <h1 class="text-4xl font-bold">Usuarios</h1>
      </div>
      <div class="ml-auto">
        <button
          @click="goTo('/users/create')"
          class="px-5 font-bold rounded-lg py-3 bg-gradient-to-r from-fuchsia-900 to-violet-950 text-white"
        >
          + Nuevo Usuario
        </button>
      </div>
    </div>
  </div>
  <div class="flex my-4"></div>
  <div class="py-4 flex gap-2">
    <v-text-field
      variant="outlined"
      prepend-inner-icon="mdi-magnify"
      label="Buscar"
    ></v-text-field>
    <v-select
      label="Tipo Usuario"
      :items="userTypes"
      variant="outlined"
    ></v-select>
    <button
      class="flex gap-2 text-sm bg-green-200 rounded-lg px-4 items-center h-14"
    >
      <v-icon>mdi-microsoft-excel</v-icon>
      <span>Descargar CSV</span>
    </button>
  </div>
  <table-users></table-users>
</template>
