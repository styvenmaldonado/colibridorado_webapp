<script setup lang="ts">
definePageMeta({ middleware: "guest" });

import { Amplify } from "aws-amplify";
import outputs from "../amplify_outputs.json";
import { signUp } from "aws-amplify/auth";

import "flag-icons/css/flag-icons.min.css";
import "v-phone-input/dist/v-phone-input.css";
import { VPhoneInput } from "v-phone-input";

import type { SubmitEventPromise } from "vuetify";
import { getCountryDataList } from "countries-list";

import { useCreateUser } from "~/hooks/users";
import { useListUserTypes } from "~/hooks/userTypes";
import { toast } from "vue3-toastify";

Amplify.configure(outputs);

const isLoading = ref(false);

const state = ref({
  list_countries: getCountryDataList().map((c) => c.name),
  t_doc: [
    "CC - Cédula de Ciudadanía",
    "CE - Cédula de extranjería",
    "PA - Pasaporte",
    "TI - Tarjeta de Identidad",
    "CD - Carnet Diplomático",
    "PEP - Permiso Especial de Permanencia",
  ],
  step: 1,
  items: ["Información personal", "Email y Contraseña"],
  givenName: "",
  familyName: "",
  tipo_documento: "",
  numero_documento: "",
  birthdate: "",
  address: "",
  email: "",
  phone: "",
  city: "",
  country: "",
  password: "",
  confirmPassword: "",
});

const step2 = async (event: SubmitEventPromise) => {
  const { valid } = await event;
  valid && state.value.step++;
};

const onSubmit = async (event: SubmitEventPromise) => {
  try {
    const { valid } = await event;
    if (!valid) return;
    isLoading.value = true;
    const { userId, isSignUpComplete, nextStep } = await signUp({
      username: state.value.email,
      password: state.value.password,
      options: {
        userAttributes: {
          phone_number: state.value.phone, // E.164 number convention
          given_name: state.value.givenName,
          family_name: state.value.familyName,
          birthdate: state.value.birthdate,
          address: state.value.address,
          "custom:tipo_documento": state.value.tipo_documento,
          "custom:numero_documento": state.value.numero_documento,
        },
      },
    });
    const { data: userTypeList } = await useListUserTypes();

    await useCreateUser({
      id: userId || "",
      userId: userId || "",
      phone_number: state.value.phone, // E.164 number convention
      given_name: state.value.givenName,
      family_name: state.value.familyName,
      birthdate: state.value.birthdate,
      address: state.value.address,
      city: state.value.city,
      country: state.value.country,
      tipo_documento: state.value.tipo_documento,
      numero_documento: state.value.numero_documento,
      email: state.value.email,
      rol: JSON.stringify([
        userTypeList.value?.data.find((p) => p.isDefault == true),
      ]),
    });
    await navigateTo({ path: "/login" });
    //await navigateTo({ path: "/OTP", query: { email: state.value.email } });
  } catch (error) {
    isLoading.value = false;
    toast("Error, Intenta Nuevamente!", {
      theme: "colored",
      type: "error",
      dangerouslyHTMLString: true,
    })
  }
};
</script>
<template>
  <loading :isLoading="isLoading" />
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
        <h1 class="text-2xl text-violet-950 font-black">Crea tu cuenta</h1>
        <span
          >Crea tu cuenta en 2 pasos. Llena estos datos sólo una vez y ya
          quedarás registrad@ en la plataforma.</span
        >
        <v-stepper
          alt-labels
          v-model="state.step"
          :items="state.items"
          hide-actions
          flat
        >
          <template v-slot:item.1>
            <v-form
              fast-fail
              @submit.prevent="step2"
              class="pt-4 flex flex-col"
            >
              <v-text-field
                :rules="[() => !!state.givenName || 'Campo requerido']"
                required
                variant="outlined"
                v-model="state.givenName"
                label="Nombres"
              ></v-text-field>
              <v-text-field
                :rules="[() => !!state.familyName || 'Campo requerido']"
                required
                variant="outlined"
                v-model="state.familyName"
                label="Apellidos"
              ></v-text-field>
              <v-select
                :rules="[() => !!state.t_doc || 'Campo requerido']"
                variant="outlined"
                label="Tipo Documento"
                v-model="state.tipo_documento"
                :items="state.t_doc"
                required
              ></v-select>
              <v-text-field
                :rules="[() => !!state.numero_documento || 'Campo requerido']"
                required
                variant="outlined"
                v-model="state.numero_documento"
                label="Número de documento"
              ></v-text-field>
              <v-text-field
                :rules="[() => !!state.birthdate || 'Campo requerido']"
                required
                variant="outlined"
                v-model="state.birthdate"
                label="Fecha de Nacimiento"
                type="date"
              ></v-text-field>
              <v-phone-input
                :prefer-countries="['CO', 'MX', 'AR', 'PE', 'EC', 'US', 'VE']"
                v-model="state.phone"
                variant="outlined"
                country-label="Indicativo"
                label="Teléfono"
                country-icon-mode="svg"
              />
              <v-text-field
                :rules="[() => !!state.address || 'Campo requerido']"
                required
                variant="outlined"
                v-model="state.address"
                label="Dirección"
              ></v-text-field>
              <v-text-field
                :rules="[() => !!state.city || 'Campo requerido']"
                required
                variant="outlined"
                v-model="state.city"
                label="Ciudad / Municipio"
              ></v-text-field>
              <v-autocomplete
                :rules="[() => !!state.country || 'Campo requerido']"
                v-model="state.country"
                label="Pais"
                variant="outlined"
                :items="state.list_countries"
              ></v-autocomplete>
              <button
                type="submit"
                class="w-full py-4 text-white font-bold bg-gradient-to-r from-fuchsia-900 to-violet-950 rounded-lg"
              >
                Siguiente
              </button>
            </v-form>
          </template>
          <template v-slot:item.2>
            <v-form @submit.prevent="onSubmit" class="pt-4 flex flex-col gap-3">
              <v-text-field
                :rules="[() => !!state.email || 'Campo requerido']"
                required
                prepend-inner-icon="mdi-email"
                variant="outlined"
                v-model="state.email"
                label="Email"
                type="email"
              ></v-text-field>
              <v-text-field
                :rules="[
                  () =>
                    state.password.length > 5 || 'Longitud mínima 6 caracteres',
                ]"
                required
                prepend-inner-icon="mdi-lock"
                variant="outlined"
                v-model="state.password"
                label="Contraseña"
                type="password"
              ></v-text-field>
              <v-text-field
                :rules="[
                  () =>
                    state.password == state.confirmPassword ||
                    'Contraseña no coincide',
                ]"
                required
                prepend-inner-icon="mdi-lock"
                variant="outlined"
                v-model="state.confirmPassword"
                label="Confirma Contraseña"
                type="password"
              ></v-text-field>
              <button
                type="submit"
                class="w-full py-4 text-white font-bold bg-gradient-to-r from-fuchsia-900 to-violet-950 rounded-lg"
              >
                Crear Cuenta
              </button>
            </v-form>
          </template>
        </v-stepper>
      </div>
    </div>
  </div>
</template>
