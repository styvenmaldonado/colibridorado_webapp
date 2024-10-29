<script setup lang="ts">
definePageMeta({ middleware: "authentication" });

import { updatePassword } from "aws-amplify/auth";
import { toast } from "vue3-toastify";
import type { SubmitEventPromise } from "vuetify";
import ButtonNavigation from "~/layouts/ButtonNavigation.vue";
import "vue3-toastify/dist/index.css";

const loading = ref(false);

const password = reactive({
  oldPassword: "",
  newPassword: "",
  newPasswordRepeat: "",
});

const submit = async (event: SubmitEventPromise) => {
  try {
    loading.value = true;
    const { valid } = await event;
    if (!valid) return;
    await updatePassword({
      oldPassword: password.oldPassword,
      newPassword: password.newPasswordRepeat,
    });
    toast("Contraseña Actualizada con Exito!", {
      theme: "colored",
      type: "success",
      position: "top-center",
      autoClose: false,
      dangerouslyHTMLString: true,
    });
    navigateTo("/");
  } catch (error) {
    loading.value = false;
    console.log(error);
    toast("Contraseña Antigüa Incorrecta!", {
      theme: "colored",
      type: "error",
      position: "top-center",
      autoClose: false,
      dangerouslyHTMLString: true,
    });
    password.newPassword = "";
    password.newPasswordRepeat = "";
    password.oldPassword = "";
  }
};
</script>
<template>
  <loading :isLoading="loading" />
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
            >Cambiar mi contraseña</span
          >
          <p>Actualiza tu informacion y gestiona tu perfil</p>
        </div>
        <v-form @submit.prevent="submit">
          <div class="flex flex-col pt-6">
            <v-text-field
              :rules="[() => !!password.oldPassword || 'Campo requerido']"
              required
              prepend-inner-icon="mdi-lock"
              variant="outlined"
              v-model="password.oldPassword"
              label="Constraseña Antigua"
              type="password"
            ></v-text-field>
            <v-text-field
              :rules="[
                () =>
                  password.newPassword.length > 5 ||
                  'Longitud mínima 6 caracteres',
              ]"
              required
              prepend-inner-icon="mdi-lock"
              variant="outlined"
              v-model="password.newPassword"
              label="Constraseña Nueva"
              type="password"
            ></v-text-field>
            <v-text-field
              :rules="[
                () =>
                  password.newPassword == password.newPasswordRepeat ||
                  'Contraseña no coincide',
              ]"
              required
              prepend-inner-icon="mdi-lock"
              variant="outlined"
              v-model="password.newPasswordRepeat"
              label="Repite tu contraseña"
              type="password"
            ></v-text-field>
            <button
              type="submit"
              color="surface-variant"
              text="Submit"
              variant="tonal"
              class="bg-gradient-to-r from-fuchsia-900 to-violet-950 text-white font-bold py-4 w-full rounded-lg"
            >
              Enviar
            </button>
          </div>
        </v-form>
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
