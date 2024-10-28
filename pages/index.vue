<script setup lang="ts">
definePageMeta({ middleware: "authentication" });
import ButtonNavigation from "~/layouts/ButtonNavigation.vue";
import { client } from "~/libs/AmplifyDataClient";
import { format } from "date-fns";

const { data: events, status,error } = await useAsyncData(
  "index",
  async () => {
    const { data } = await client.models.Events.list()
    return data;
  }
);
</script>
<template>
  <div class="flex flex-col w-screen h-screen">
    <div class="fixed bottom-0 left-0">
      <ButtonNavigation />
    </div>
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
      <div
        class="px-5 lg:w-11/12 lg:py-8 mx-auto"
        style="width: -webkit-fill-available"
      >
        <div class="text-lg">
          <span class="font-bold">Bienllegad@</span>
          <span class="font-bold text-violet-950">Cristian 🥳</span>
          <p>
            a la Familia Colibrí Dorado, un espacio de sanación desde la
            frecuencia cuántica del amor. Gracias por unirte a esta tribu de
            Amor y consciencia en movimiento.
          </p>
        </div>
        <div class="text-lg pt-6">
          <span class="font-bold"></span>
          <span class="font-bold text-violet-950">Ceremonias y Retiros</span>
          <p>
            Conoce las próximas Ceremonias y Retiros. Estás invitad@ a
            encontrarte con lo profundo de tu Ser en cada espacio.
          </p>
        </div>
      </div>
      <div v-if="events?.filter((p) => p.type == 'Ceremonia').length">        <div class="text-lg pt-8 px-5">
          <span class="font-bold text-violet-950">Ceremonia</span>
        </div>
        <div class="overflow-hidden">
          <div
            v-for="(event, index) in events?.filter(
              (p) => p.type == 'Ceremonia'
            )"
            :key="index"
            class="flex overflow-x-auto gap-4 pl-4"
          >
            <a
              :href="'/event/' + event.id"
              class="card py-4 w-60 flex-shrink-0"
            >
              <div class="h-32 w-full">
                <img
                  class="w-full h-full rounded-lg object-fit"
                  :src="'https://d334a63s5wk7yh.cloudfront.net/'+ event?.photos![0]"
                />
              </div>
              <div class="grid pt-2">
                <span class="font-bold">{{ event.name }}</span>
                <span>{{ format(new Date(event?.datetime_start || ""),"d 'de' MMMM yyyy - hh:mm aaaa") }}</span>
                <span>{{ event.location }}</span>
              </div>
            </a>
          </div>
        </div>
      </div>

      <div v-if="events?.filter((p) => p.type == 'Retiro').length">
        <div class="text-lg pt-8 px-5">
          <span class="font-bold text-violet-950">Retiros</span>
        </div>
        <div class="overflow-hidden">
          <div
            v-for="(event, index) in events?.filter((p) => p.type == 'Retiro')"
            :key="index"
            class="flex overflow-x-auto gap-4 pl-4"
          >
            <a
              :href="'/event/' + event.id"
              class="card py-4 w-60 flex-shrink-0"
            >
              <div class="h-32 w-full">
                <img
                  class="w-full h-full rounded-lg object-fit"
                  :src="'https://d334a63s5wk7yh.cloudfront.net/'+ event?.photos![0]"
                />
              </div>
              <div class="grid pt-2">
                <span class="font-bold">{{ event.name }}</span>
                <span>{{ format(new Date(event?.datetime_start || ""),"d 'de' MMMM yyyy - hh:mm aaaa") }}</span>
                <span>{{ event.location }}</span>
              </div>
            </a>
          </div>
        </div>
      </div>

      <div class="pt-24"></div>
    </div>
    <button-nav
      :items="[
        {
          title: 'Inicio',
          route: '',
          icon: 'mdi-home-outline',
          active: true,
        },
        {
          title: 'Mis Eventos',
          route: '/my-events',
          icon: 'mdi-calendar-blank-multiple',
        },
        {
          title: 'Pagos',
          route: '/my-payments',
          icon: 'mdi-credit-card-outline',
        },
        {
          title: 'Mi Perfil',
          route: '/my-profile',
          icon: 'mdi-account-circle',
        },
      ]"
    />
  </div>
</template>
