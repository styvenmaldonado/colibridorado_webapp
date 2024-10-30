<script setup lang="ts">
definePageMeta({ middleware: "authentication" });

import type { SubmitEventPromise } from "vuetify";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
import { useUserInfo } from "~/hooks/users";
import { usePaymentOrchestrator } from "~/hooks/payments";

const { data: user } = await useUserInfo();
const step = ref(1);
const isLoading = ref(false);
const route = useRoute();

const medicalPreincription = ref({
  referBy: "",
  preinscriptions: "",
  medicine: "",
});

const eventUserUIState = reactive({
  rol: JSON.parse(user.value?.rol?.toString() || ""),
  suggestions: "",
  aditional_info: "",
  transport_description: "",
  needs_transport: false,
  available_seats: false,
  available_seats_number: 0,
  rolSelected: undefined,
});

const nextStep = async (event: SubmitEventPromise) => {
  const { valid } = await event;
  if (!valid) return;
  step.value++;
};

const submit = async () => {
  try {  
    isLoading.value = true;
    const { data, error } = await usePaymentOrchestrator({
      eventId: route.params.id.toString(),
      needs_transport: eventUserUIState.needs_transport,
      available_seats: eventUserUIState.available_seats,
      available_seats_number: eventUserUIState.available_seats_number,
      userId: user.value?.id || "",
      medicalPreincription: JSON.stringify(medicalPreincription.value),
      rol: JSON.stringify(eventUserUIState.rolSelected),
    });
    if(!error.value) {
      window.location.href = `${data.value?.res};` 
    }
    toast("Error, Intenta Nuevamente!", {
      theme: "colored",
      type: "error",
      dangerouslyHTMLString: true,
    });
  
  } catch (error) {
    toast("Error, Intenta Nuevamente!", {
      theme: "colored",
      type: "error",
      dangerouslyHTMLString: true,
    });
  }
};

const next = async () => {};
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
        <h1 class="text-2xl text-violet-950 font-black">
          Resueno y me quiero inscribir
        </h1>
        <span>Diligencia los datos e inscríbete</span>

        <v-stepper
          alt-labels
          v-model="step"
          :items="['Indicaciones Medicas', 'Transporte', 'Pago']"
          hide-actions
          flat
        >
          <template v-slot:item.1>
            <v-form @submit.prevent="nextStep" class="pt-4 flex flex-col">
              <p class="font-bold">Rol</p>
              <v-autocomplete
              :rules="[
                  () => !!eventUserUIState.rolSelected || 'Campo requerido',
                ]"
                variant="outlined"
                required
                v-model="eventUserUIState.rolSelected"
                :items="eventUserUIState.rol"
              >
                <template v-slot:chip="{ props, item }">
                  <v-chip v-bind="props" :text="item.raw?.name"></v-chip>
                </template>

                <template v-slot:item="{ props, item }">
                  <v-list-item
                    v-bind="props"
                    :title="item.raw.name"
                  ></v-list-item>
                </template>
              </v-autocomplete>
              <p class="font-bold">
                ¿Has sido referido/a por alguien?¿Quién? Esa persona es tu
                terapeuta?
              </p>
              <v-text-field
                :rules="[
                  () => !!medicalPreincription.referBy || 'Campo requerido',
                ]"
                required
                variant="outlined"
                v-model="medicalPreincription.referBy"
              ></v-text-field>
              <p class="font-bold">
                Actualmente presentas alguna condición especial de salud?
              </p>
              <p>
                Renales, cardiacas, epilepsia, diagnostico psiquiátrico,
                embarazo,lactancia, otra ¿Cuál? (Esto será tenido en cuenta para
                tu admisión a la ceremonia)
              </p>
              <v-text-field
                :rules="[
                  () =>
                    !!medicalPreincription.preinscriptions || 'Campo requerido',
                ]"
                required
                variant="outlined"
                v-model="medicalPreincription.preinscriptions"
              ></v-text-field>
              <p class="font-bold">
                Actualmente tomas algún medicamento? ¿Cuál? Con qué regularidad?
              </p>
              <v-text-field
                :rules="[
                  () => !!medicalPreincription.medicine || 'Campo requerido',
                ]"
                required
                variant="outlined"
                v-model="medicalPreincription.medicine"
              ></v-text-field>
              <button
                type="submit"
                class="w-full py-4 text-white font-bold bg-gradient-to-r from-fuchsia-900 to-violet-950 rounded-lg"
              >
                Siguiente
              </button>
            </v-form>
          </template>
          <template v-slot:item.2>
            <v-form @submit.prevent="" class="pt-4 flex flex-col">
              <p class="font-bold">¿Necesita transporte?</p>
              <v-checkbox
                v-model="eventUserUIState.needs_transport"
              ></v-checkbox>

              <p class="font-bold">
                ¿Tienes disponibilidad de Cupos de Transporte?
              </p>
              <v-checkbox
                v-model="eventUserUIState.available_seats"
              ></v-checkbox>
              <p class="font-bold">No. Asientos disponibles</p>
              <v-text-field
                :rules="[
                  () =>
                    !!eventUserUIState.available_seats_number ||
                    'Campo requerido',
                ]"
                required
                type="number"
                variant="outlined"
                v-model="eventUserUIState.available_seats_number"
                label=""
              ></v-text-field>

              <button
                type="submit"
                @click="step++"
                class="w-full py-4 text-white font-bold bg-gradient-to-r from-fuchsia-900 to-violet-950 rounded-lg"
              >
                Siguiente
              </button>
            </v-form>
          </template>
          <template v-slot:item.3>
            <v-form @submit.prevent="submit" class="pt-4 flex flex-col gap-6">
              <p>Reliza tu pago en 3 simples pago</p>
              <div class="flex flex-col gap-2">
                <div
                  class="bg-violet-950 rounded-full h-12 w-12 text-white font-bold flex"
                >
                  <span class="m-auto">1</span>
                </div>
                <p>Realizar el Abono Virtual para separar tu cupo</p>
              </div>

              <div class="flex flex-col gap-2">
                <div
                  class="bg-violet-950 rounded-full h-12 w-12 text-white font-bold flex"
                >
                  <span class="m-auto">2</span>
                </div>
                <p>Agenda día, hora y asiste a la Ceremonia.</p>
              </div>

              <div class="flex flex-col gap-2">
                <div
                  class="bg-violet-950 rounded-full h-12 w-12 text-white font-bold flex"
                >
                  <span class="m-auto">3</span>
                </div>
                <p>
                  Termina de Pagar. Lleva el saldo del valor de la Ceremonia en
                  efectivo.
                </p>
              </div>

              <button
                type="submit"
                @click="next"
                class="w-full py-4 text-white font-bold bg-gradient-to-r from-fuchsia-900 to-violet-950 rounded-lg"
              >
                Realizar Pago
              </button>
            </v-form>
          </template>
        </v-stepper>
      </div>
    </div>
  </div>
</template>
