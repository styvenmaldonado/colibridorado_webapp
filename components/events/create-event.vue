<script setup lang="ts">
import { ref } from "vue";
import { v4 as uuidv4 } from "uuid";

//Types
import type { SubmitEventPromise } from "vuetify";
import type { EventInteface } from "~/inteface/EventInterface";

//Amplify
import { Amplify } from "aws-amplify";
import outputs from "../../amplify_outputs.json";

import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
import { useListUserTypes } from "~/hooks/userTypes";
import { useCreateEvent } from "~/hooks/events";

Amplify.configure(outputs);

const { data: usersTypes, status } = await useListUserTypes()

const step = ref(1);
const files = ref([]);
const loading = ref(false);
const data: EventInteface = reactive({
  photos: [],
  cost: usersTypes.value?.data.map((c) => ({
    id: c.id,
    userType: c.name,
    usd: 0,
    cop: 0,
    mxn: 0,
  })),
});

const cost_interview = ref({
  cop: 0,
  usd: 0,
  mxn: 0,
});

const instructions = ref({
  instructions: "",
  recommendations: "",
});

const nextStep = async (event: SubmitEventPromise) => {
  const { valid } = await event;
  if (!valid) return;
  step.value++;
};

const submitPhotos = async (photos: string[]) => {
  data.photos = photos;
  step.value++;
};

const submit = async () => {
  const id = uuidv4()
  const { error } = await useCreateEvent({
    id,
    eventId: id ,
    name: data.name,
    photos: data.photos,
    datetime_start: new Date(data?.datetime_start || "").toISOString(),
    datetime_end: new Date(data?.datetime_end || "").toISOString(),
    description: data.description,
    cancelPolicy: data.cancelPolicy,
    location: data.location,
    location_link: data.location_link,
    type: data.type,
    cost: JSON.stringify(data.cost),
    cost_interview: JSON.stringify(cost_interview.value),
    percent_advance_payment: data.percent_advance_payment,
    instruction:JSON.stringify(instructions.value)
  })
  if (!error.value) {
    toast("Evento Creado con Exito!", {
      theme: "colored",
      type: "success",
      dangerouslyHTMLString: true,
    });
    await navigateTo({
      path: "/events",
    });
  } else {
    toast("Error, Intenta Nuevamente!", {
      theme: "colored",
      type: "error",
      dangerouslyHTMLString: true,
    });
  }
};
</script>
<template>
  <div
    v-if="status == 'pending' || loading"
    style="z-index: 9999"
    class="fixed w-screen h-screen bg-gray-600 opacity-45 flex"
  >
    <div class="m-auto">
      <v-progress-circular indeterminate :size="76"></v-progress-circular>
    </div>
  </div>
  <div class="w-full h-full p-8 overflow-y-scroll flex">
    <div class="w-9/12 mx-auto">
      <div class="flex items-center pt-8">
        <div class="flex flex-col gap-3">
          <button @click="navigateTo('/events')" class="w-12">
            <v-icon size="large">mdi-arrow-left</v-icon>
          </button>
          <h1 class="text-4xl font-bold">Nuevo Evento o Ceremonia</h1>
        </div>
      </div>
      <div class="py-8">
        <v-stepper
          alt-labels
          v-model="step"
          :items="['Información Encuentro', 'Imagenes', 'Precios']"
          hide-actions
          flat
        >
          <template v-slot:item.1>
            <v-form @submit.prevent="nextStep" class="pt-4 flex flex-col gap-4">
              <div>
                <div class="grid lg:grid-cols-2 gap-x-4">
                  <v-text-field
                    v-model="data.datetime_start"
                    type="datetime-local"
                    :rules="[() => !!data.datetime_start || 'Campo requerido']"
                    required
                    variant="outlined"
                    label="Fecha y Hora de Inicio"
                  ></v-text-field>
                  <v-text-field
                    type="datetime-local"
                    :rules="[() => !!data.datetime_end || 'Campo requerido']"
                    required
                    variant="outlined"
                    v-model="data.datetime_end"
                    label="Fecha y Hora de Finalización"
                  ></v-text-field>
                </div>
              </div>
              <div>
                <v-select
                  variant="outlined"
                  label="Tipo Evento"
                  v-model="data.type"
                  :items="['Ceremonia', 'Retiro']"
                ></v-select>
                <v-text-field
                  :rules="[() => !!data.name || 'Campo requerido']"
                  required
                  variant="outlined"
                  v-model="data.name"
                  label="Nombre"
                ></v-text-field>
                <v-text-field
                  prepend-inner-icon="mdi-map-marker"
                  :rules="[() => !!data.location || 'Campo requerido']"
                  required
                  variant="outlined"
                  v-model="data.location"
                  label="Ubicación"
                ></v-text-field>
                <v-text-field
                  prepend-inner-icon="mdi-map-marker"
                  :rules="[() => !!data.location_link|| 'Campo requerido']"
                  required
                  variant="outlined"
                  v-model="data.location_link"
                  label="Link Google Maps"
                ></v-text-field>
                <v-textarea
                  v-model="data.description"
                  label="Descripción Retiro y/o Ceremonia"
                  variant="outlined"
                ></v-textarea>
                <v-textarea
                  v-model="data.cancelPolicy"
                  label="Políticas de cancelación"
                  variant="outlined"
                ></v-textarea>
                <div class="py-5 flex gap-2">
                  <v-icon>mdi-lock-plus-outline</v-icon>
                  <p class="font-bold">Información Privada</p>
                </div>
                <v-textarea
                  v-model="instructions.instructions"
                  label="Instrucción Retiro y/o Ceremonia"
                  variant="outlined"
                ></v-textarea>
                <v-textarea
                  v-model="instructions.recommendations"
                  label="Recomendación Retiro y/o Ceremonia"
                  variant="outlined"
                ></v-textarea>
              </div>
              <button
                type="submit"
                class="w-full py-4 text-white font-bold bg-gradient-to-r from-fuchsia-900 to-violet-950 rounded-lg"
              >
                Siguiente
              </button>
            </v-form>
          </template>
          <template v-slot:item.2>
            <div class="py-4">
              <dropzone @submit="submitPhotos" />
            </div>
            <button
              @click="step++"
              v-if="files.length"
              class="w-full py-4 text-white font-bold bg-gradient-to-r from-fuchsia-900 to-violet-950 rounded-lg"
            >
              Siguiente
            </button>
          </template>
          <template v-slot:item.3>
            <div
              class="flex gap-4 mt-8 border border-gray-200 rounded-lg px-4 py-4"
            >
              <v-text-field
                v-model="data.percent_advance_payment"
                required
                prefix="%"
                type="number"
                variant="outlined"
                label="Porcentaje Anticipo"
              ></v-text-field>
            </div>
            <div
              class="flex gap-4 mt-8 border border-gray-200 rounded-lg px-4 py-4"
            >
              <v-text-field
                v-model="cost_interview.cop"
                required
                prefix="$ COP"
                type="number"
                variant="outlined"
                label="Precio Entrevista"
              ></v-text-field>
              <v-text-field
                v-model="cost_interview.mxn"
                required
                prefix="$ MXN"
                type="number"
                variant="outlined"
                label="Precio Entrevista"
              ></v-text-field>
              <v-text-field
                v-model="cost_interview.usd"
                required
                prefix="$ USD"
                type="number"
                variant="outlined"
                label="Precio Entrevista"
              ></v-text-field>
            </div>

            <v-form @submit.prevent="submit" class="pt-4 flex flex-col gap-4">
              <div
                v-for="(c, index) in data.cost"
                class="border border-gray-200 rounded-lg px-4 py-4"
              >
                <div>
                  <v-text-field
                    :model-value="c.userType"
                    required
                    variant="outlined"
                    label="Tipo Usuario"
                  ></v-text-field>
                </div>
                <div class="grid lg:grid-cols-3 gap-x-4">
                  <v-text-field
                    v-model="c.cop"
                    type="number"
                    :rules="[() => !!c.cop || 'Campo requerido']"
                    required
                    model-
                    placeholder="100"
                    prefix="$ COP"
                    variant="outlined"
                    label="Peso Colombiano"
                  ></v-text-field>
                  <v-text-field
                    v-model="c.mxn"
                    type="number"
                    :rules="[() => !!c.mxn || 'Campo requerido']"
                    required
                    model-
                    placeholder="100"
                    prefix="$ MXN"
                    variant="outlined"
                    label="Peso Mexicano"
                  ></v-text-field>
                  <v-text-field
                    v-model="c.usd"
                    :rules="[() => !!c.usd || 'Campo requerido']"
                    required
                    model-
                    placeholder="100"
                    prefix="$ USD"
                    variant="outlined"
                    label="Dolar"
                  ></v-text-field>
                </div>
              </div>
              <button
                type="submit"
                class="w-full py-4 text-white font-bold bg-gradient-to-r from-fuchsia-900 to-violet-950 rounded-lg"
              >
                Finalizar
              </button>
            </v-form>
          </template>
        </v-stepper>
      </div>
    </div>
  </div>
</template>
