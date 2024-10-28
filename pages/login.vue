<script setup lang="ts">
definePageMeta({ middleware: "guest" });
import { Amplify } from "aws-amplify";
import outputs from "../amplify_outputs.json";
Amplify.configure(outputs);

import { signIn, signOut } from "aws-amplify/auth";
import { ref } from "vue";
import "vue3-toastify/dist/index.css";

const credentials = ref({
  username: "",
  password: "",
});

const state = ref("");
const isLoading = ref(false);
const show1 = ref(false);
const onSubmit = async () => {
  try {
    isLoading.value = true;
    await signOut();
    await signIn({
      username: credentials.value.username,
      password: credentials.value.password,
    });
    await navigateTo("/");
  } catch (error) {
    console.log(error);
    state.value = "error";
    credentials.value.password = "";
  }
};
</script>

<template>
  <loading :isLoading="isLoading"/>
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
      class="bg-white pt-10 lg:pt-0 lg:m-auto lg:w-3/6 flex lg:rounded-lg lg:shadow-lg lg:border lg:border-gray-300"
    >
      <div class="px-5 lg:w-11/12 lg:py-8 mx-auto">
        <h1 class="text-2xl text-violet-950 font-black">Iniciar Sesion</h1>
        <span
          >Bienllegad@ a la Familia Colibrí Dorado, un espacio de sanación desde
          la frecuencia cuántica del amor.
        </span>
        <v-form @submit.prevent="onSubmit" class="pt-4 flex flex-col gap-y-2">
          <v-text-field
            :rules="[() => !!credentials.username || 'Campo requerido']"
            required
            prepend-inner-icon="mdi-email"
            variant="outlined"
            v-model="credentials.username"
            label="Email"
            type="email"
          ></v-text-field>
          <v-text-field
            :rules="[() => !!credentials.password || 'Campo requerido']"
            required
            persistent-hint
            :append-inner-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
            @click:append-inner="show1 = !show1"
            :type="show1 ? 'text' : 'password'"
            prepend-inner-icon="mdi-lock-outline"
            variant="outlined"
            v-model="credentials.password"
            label="Contraseña"
          ></v-text-field>
          <div
            v-if="state == 'error'"
            class="text-red-600 flex gap-2 p-4 bg-red-50 rounded-lg border-2 border-red-700"
          >
            <div><v-icon>mdi-alert-circle</v-icon></div>
            <span>Usuario y/o contraseña invalidos</span>
          </div>
          <div class="flex mb-6">
            <NuxtLink
              to="/forgot-password"
              class="text-fuchsia-900 ml-auto font-bold"
              >¿Olvidaste tu contraseña?
            </NuxtLink>
          </div>
          <button
            class="bg-gradient-to-r from-fuchsia-900 to-violet-950 text-white font-bold py-4 w-full rounded-lg"
          >
            Inicia el vuelo
          </button>
        </v-form>
      </div>
    </div>
    <div class="flex h-40">
      <div class="m-auto">
        ¿Aún no tienes cuenta?
        <NuxtLink class="text-fuchsia-900 font-bold" to="/registrate">
          Registrate</NuxtLink
        >
      </div>
    </div>
  </div>
</template>
