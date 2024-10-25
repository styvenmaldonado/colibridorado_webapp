<script setup lang="ts">
const route = useRoute();

const { data, status, error, refresh, clear } = await useAsyncData(
  "transaction" + route.query.id,
  async () => {
    const res: any = await $fetch(
      "https://sandbox.wompi.co/v1/transactions/" + route.query.id
    );
    return res;
  }
);


console.log(data);
</script>
<template>
  <div class="flex flex-col w-screen h-screen">
    <div class="h-44 lg:h-60 relative">
      <div class="absolute w-full h-full flex">
        <div
          class="flex w-28 h-28 lg:w-36 lg:h-36 rounded-full shadow-lg m-auto bg-white"
        >
          <img
            class="m-auto h-24 w-24 lg:w-32 lg:h-32 object-cover"
            src="/logo.webp"
          />
        </div>
      </div>
      <img class="h-full w-full object-fill" src="/background.webp" />
    </div>
    <div
      class="bg-white pt-10 lg:pt-0 lg:m-auto lg:w-3/6 flex flex-col lg:rounded-lg lg:shadow-lg lg:border lg:border-gray-300"
    >
      <div class="px-5 w-full lg:w-11/12 lg:py-8">
        <div class="text-green-700 flex flex-col gap-2 items-center">
          <v-icon color="success" size="x-large">mdi-check-circle</v-icon>
          <h1 class="text-2xl font-black">Transaccion Exitosa!</h1>
        </div>
        <div
          class="mt-8 grid grid-col-1 gap-2 py-2 px-3 w-full bg-gray-200 rounded-lg"
        >
          <div class="flex flex-col">
            <span class="font-bold">ID</span>
            <span>{{ route.query.id }}</span>
          </div>
          <div class="flex flex-col">
            <span class="font-bold">Estado</span>
            <span>{{ data?.data?.status }}</span>
          </div>
          <div class="flex flex-col">
            <span class="font-bold">Valor</span>
            <span
              >{{ data?.data?.amount_in_cents }}
              {{ data?.data?.currency }}</span
            >
          </div>
          <div class="flex flex-col">
            <span class="font-bold">Fecha y Hora</span>
            <span>{{ data?.data?.finalized_at }}</span>
          </div>
          <div class="flex flex-col">
            <span class="font-bold">Medio de Pago</span>
            <span>{{ data?.data?.payment_method.type }}</span>
          </div>
          <spa>
            <span>{{ data?.data?.reference }}</span></spa
          >
        </div>
      </div>
      <div class="px-5 py-6">
        <button
          type="submit"
          @click="navigateTo('/schedule-interview')"
          class="w-full py-4 text-white font-bold bg-gradient-to-r from-fuchsia-900 to-violet-950 rounded-lg"
        >
          Finalizar
        </button>
      </div>
    </div>
  </div>
</template>
