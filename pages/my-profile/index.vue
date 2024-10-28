<script setup lang="ts">
definePageMeta({ middleware: "auth", auth: { guestRedirectTo: "/login" } });
import { signOut } from "aws-amplify/auth";
import ButtonNavigation from "~/layouts/ButtonNavigation.vue";

import { Amplify } from "aws-amplify";
import outputs from "../../amplify_outputs.json";

Amplify.configure(outputs);

const logOut = async () => {
  await signOut();
  navigateTo("/login");
};

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
        <div class="text-lg pt-6">
          <span class="font-bold"></span>
          <span class="font-bold text-violet-950 space-x-1 space-x-"
            >Mi perfil</span
          >
          <p>Actualiza tu informacion y gestiona tu perfil</p>
        </div>
        <div class="flex flex-col pt-6">
          <a
            href="/my-profile/password"
            class="py-4 flex gap-3 border-t border-gray-200"
          >
            <v-icon>mdi-lock</v-icon>
            <span>Cambiar Contraseña</span>
          </a>
          <a class="py-4 flex gap-3 border-t border-gray-200">
            <v-icon>mdi-update</v-icon>
            <span>Actualizar información</span>
          </a>
          <button @click="logOut">
            <a class="py-4 flex gap-3 border-t border-gray-200">
              <v-icon>mdi-power</v-icon>
              <span>Cerrar la sesión</span>
            </a>
          </button>
        </div>
      </div>
      <div class="pt-24"></div>
    </div>
    <button-nav
      :items="[
        {
          title: 'Inicio',
          route: '/',
          icon: 'mdi-home-outline',
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
          active: true,
        },
      ]"
    />
  </div>
</template>
