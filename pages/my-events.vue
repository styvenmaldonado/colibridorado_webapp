<script setup lang="ts">
definePageMeta({ middleware: "auth", auth: { guestRedirectTo: "/login" } })
import ButtonNavigation from '~/layouts/ButtonNavigation.vue';
import { client } from '~/libs/AmplifyDataClient';
import { format } from "date-fns";

const { user } = useAuth()

const { data: events, status,error } = await useAsyncData(
  "my-events",
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
        <div class="flex w-28 h-28 lg:w-36 lg:h-36 rounded-full shadow-lg m-auto bg-white">
          <img class="m-auto h-24 w-24 lg:w-32 lg:h-32 object-cover" src="/logo.webp" />
        </div>
      </div>
      <img class="h-full w-full object-fill" src="/background.webp" />
    </div>
    <div
      class="bg-white pt-10 lg:pt-0 lg:m-auto lg:w-3/6 flex flex-col lg:rounded-lg lg:shadow-lg lg:border lg:border-gray-300">
      <div class="px-5 lg:w-11/12 lg:py-8 mx-auto " style="width: -webkit-fill-available;">
      
        <div class="text-lg pt-6">
          <span class="font-bold"></span> <span class="font-bold text-violet-950">Mis Ceremonias y Retiros</span>
          <p>Conoce las próximas Ceremonias y Retiros en los que estas inscrito.
          </p>
        </div>
      </div>
   
      <div v-for="(event,index) in events" :key="index" class="px-5 py-6 flex flex-col">
        <a   :href="'/event/' + event.id" class="card py-4 w-full">
          <div class="h-60 w-full">
            <img class="w-full h-full rounded-lg object-fit"
              :src="'https://d334a63s5wk7yh.cloudfront.net/'+ event?.photos![0]"/>
          </div>
          <div class="grid pt-2">
            <span class="font-bold">{{ event.name }}</span>
            <span>{{ format(new Date(event?.datetime_start || ""),"d 'de' MMMM yyyy - hh:mm aaaa") }}</span>
            <span>{{ event.location }}</span>
          </div>
        </a>
      
      </div>
      <div class="pt-24"></div>
    </div>
    <button-nav :items="[
      {
        title: 'Inicio', route: '/', icon: 'mdi-home-outline'
      },
      {
        title: 'Mis Eventos', route: '/my-events', icon: 'mdi-calendar-blank-multiple', active: true
      },
      {
        title: 'Pagos', route: '/my-payments', icon: 'mdi-credit-card-outline'
      },
      {
        title: 'Mi Perfil', route: '/my-profile', icon: 'mdi-account-circle'
      }
    ]" />
  </div>
</template>
