<script setup lang="ts">
definePageMeta({ middleware: "authentication" });
import { format } from "date-fns";
import { ref, watchEffect } from "vue";
import { useListEvents } from "~/hooks/events";
import { useUserInfo } from "~/hooks/users";

// Define los tipos de datos esperados para el usuario y los eventos
interface User {
  given_name: string;
  permissions?: boolean;
}

interface Event {
  id: string;
  name: string;
  datetime_start: string;
  location: string;
  type: string;
  photos: string[];
}

// Variables reactivas con tipos definidos
const userData = ref<User | null>(null);
const eventList = ref<{ data: Event[] } | null>(null);
const isLoading = ref(true); // Indicador de carga

// Función asíncrona para cargar los datos del usuario
const fetchUserData = async () => {
  const { data } = await useUserInfo();
  userData.value = data;
};

// Función asíncrona para cargar los datos de eventos
const fetchEventList = async () => {
  const { data } = await useListEvents({ q: undefined });
  eventList.value = data;
};

// Ejecuta las funciones para cargar datos sin bloquear el renderizado inicial
watchEffect(async () => {
  isLoading.value = true;
  await Promise.all([fetchUserData(), fetchEventList()]);
  isLoading.value = false; // Cambia a false cuando los datos se hayan cargado
});
</script>

<template>
  <!-- Componente de Carga -->
  <loading :isLoading="isLoading" />

  <div v-if="!isLoading" class="flex flex-col w-screen h-screen">
    <div class="h-44 lg:h-60 relative">
      <div class="absolute w-full h-full flex">
        <div class="flex w-28 h-28 lg:w-36 lg:h-36 rounded-full shadow-lg m-auto bg-white">
          <img class="m-auto h-24 w-24 lg:w-32 lg:h-32 object-cover" src="/logo.webp" />
        </div>
      </div>
      <img class="h-full w-full object-fill" src="/background.webp" />
    </div>

    <div class="bg-white pt-10 lg:pt-0 lg:m-auto lg:w-3/6 flex flex-col lg:rounded-lg lg:shadow-lg lg:border lg:border-gray-300">
      <div class="px-5 lg:w-11/12 lg:py-8 mx-auto" style="width: 100%; box-sizing: border-box;">

        <!-- Welcome Message -->
        <div class="text-lg">
          <span class="font-bold">
            Bienllegad@ <span class="font-bold text-violet-950 capitalize">{{ userData?.value?.given_name || "Cargando..." }} 🥳</span>
          </span>
          <p>
            a la Familia Colibrí Dorado, un espacio de sanación desde la frecuencia cuántica del amor. Gracias por unirte a esta tribu de Amor y consciencia en movimiento.
          </p>
        </div>



        <!-- Events Section -->
        <div class="text-lg pt-6">
          <span class="font-bold"></span>
          <span class="font-bold text-violet-950">Ceremonias y Retiros</span>
          <p>
            Conoce las próximas Ceremonias y Retiros. Estás invitad@ a encontrarte con lo profundo de tu Ser en cada espacio.
          </p>
        </div>
      </div>

      
      <!-- Mensaje de que no hay eventos disponibles -->
      <div v-if="!eventList?.value?.data || eventList.value.data.length === 0"
           class="px-4 py-12 bg-blue-100 mx-5 my-6 flex gap-3 items-center rounded-lg">
        <v-icon class="text-blue-500">mdi-information</v-icon>
        <p>No hay Eventos Disponibles</p>
      </div>
      <!-- Ceremonies List -->
      <div v-if="eventList?.value?.data?.some(event => event.type === 'Ceremonia')">
        <div class="text-lg pt-8 px-5">
          <span class="font-bold text-violet-950">Ceremonia</span>
        </div>
        <div class="overflow-hidden">
          <div v-for="(event, index) in eventList.value.data.filter(event => event.type === 'Ceremonia')" :key="index" class="flex overflow-x-auto gap-4 pl-4">
            <a :href="'/event/' + event.id" class="card py-4 w-60 flex-shrink-0">
              <div class="h-32 w-full">
                <img class="w-full h-full rounded-lg object-fit" :src="'https://d334a63s5wk7yh.cloudfront.net/'+ event.photos[0]" loading="lazy" />
              </div>
              <div class="grid pt-2">
                <span class="font-bold">{{ event.name }}</span>
                <span>{{ format(new Date(event.datetime_start || ""), "d 'de' MMMM yyyy - hh:mm aaaa") }}</span>
                <span>{{ event.location }}</span>
              </div>
            </a>
          </div>
        </div>
      </div>

      <!-- Retreats List -->
      <div v-if="eventList?.value?.data?.some(event => event.type === 'Retiro')">
        <div class="text-lg pt-8 px-5">
          <span class="font-bold text-violet-950">Retiros</span>
        </div>
        <div class="overflow-hidden">
          <div v-for="(event, index) in eventList.value.data.filter(event => event.type === 'Retiro')" :key="index" class="flex overflow-x-auto gap-4 pl-4">
            <a :href="'/event/' + event.id" class="card py-4 w-60 flex-shrink-0">
              <div class="h-32 w-full">
                <img class="w-full h-full rounded-lg object-fit" :src="'https://d334a63s5wk7yh.cloudfront.net/'+ event.photos[0]" loading="lazy" />
              </div>
              <div class="grid pt-2">
                <span class="font-bold">{{ event.name }}</span>
                <span>{{ format(new Date(event.datetime_start || ""), "d 'de' MMMM yyyy - hh:mm aaaa") }}</span>
                <span>{{ event.location }}</span>
              </div>
            </a>
          </div>
        </div>
      </div>

      <div class="pt-24"></div>
    </div>

    <!-- Navigation Button -->
    <button-nav
        :items="[
        { title: 'Inicio', route: '', icon: 'mdi-home-outline', active: true },
        { title: 'Mis Eventos', route: '/my-events', icon: 'mdi-calendar-blank-multiple' },
        { title: 'Pagos', route: '/my-payments', icon: 'mdi-credit-card-outline' },
        { title: 'Mi Perfil', route: '/my-profile', icon: 'mdi-account-circle' },
        { title: 'Admin', route: '/users', icon: 'mdi-monitor-dashboard', isHidden: !userData?.value?.permissions }
      ]"
    />
  </div>
</template>

