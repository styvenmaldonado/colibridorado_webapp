<script setup lang="ts">
import 'flag-icons/css/flag-icons.min.css';
import 'v-phone-input/dist/v-phone-input.css';
import { VPhoneInput } from 'v-phone-input';
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";


import { getCountryDataList } from 'countries-list';
import { client } from '~/libs/AmplifyDataClient';
import { v4 as uuidv4 } from 'uuid';
import type { SubmitEventPromise } from 'vuetify';


const { data: usersTypes, status } = await useAsyncData('usersTypes', async () => {
  const { data } = await client.models.UsersTypes.list()
  return data
})

const list_countries = getCountryDataList().map(c => c.name)
const t_doc = [
  'CC - Cédula de Ciudadanía',
  'CE - Cédula de extranjería',
  'PA - Pasaporte',
  'TI - Tarjeta de Identidad',
  'CD - Carnet Diplomático',
  'PEP - Permiso Especial de Permanencia'
]

const data = ref({
  userTypesList: usersTypes.value?.map(c => c.name),
  givenName: "",
  familyName: "",
  tipo_documento: "",
  numero_documento: "",
  birthdate: "",
  address: "",
  email: "",
  phone: "",
  password: "",
  confirmPassword: "",
  city: "",
  country: "",
  rol: "",
  userType: []
})


const submit = async (event: SubmitEventPromise) => {
  const { valid } = await event;
  if (!valid) return
  const id = uuidv4()
  const { errors } = await client.models.Users.create({
    id: id,
    userId: id,
    phone_number: data.value.phone, // E.164 number convention
    given_name: data.value.givenName,
    family_name: data.value.familyName,
    birthdate: data.value.birthdate,
    address: data.value.address,
    city: data.value.city,
    country: data.value.country,
    tipo_documento: data.value.tipo_documento,
    numero_documento: data.value.numero_documento,
    email: data.value.email,
    rol: data.value.rol
  })
  if (!errors) {
    toast("Usuario Creado con Exito!", {
      "theme": "colored",
      "type": "success",
      "dangerouslyHTMLString": true
    })
    await navigateTo({
      path: "/users"
    })
  } else {
    toast("Error, Intenta Nuevamente!", {
      "theme": "colored",
      "type": "error",
      "dangerouslyHTMLString": true
    })
  }
}

</script>
<template>
  <div v-if="status=='pending'" style="z-index:9999" class="fixed w-screen h-screen bg-gray-600 opacity-45 flex">
    <div class="m-auto"><v-progress-circular indeterminate :size="76"></v-progress-circular></div>
  </div>
  <div class="w-full h-full p-8 overflow-y-scroll flex">
    <div class="w-9/12 mx-auto">
      <div class="flex items-center pt-8 ">
        <div class="flex flex-col gap-3">
          <button @click="navigateTo('/users')" class="w-12"><v-icon size="large">mdi-arrow-left</v-icon></button>
          <h1 class="text-4xl font-bold">Nuevo Usuario</h1>
        </div>
      </div>
      <div class="py-8">
        <v-form z @submit.prevent="submit" class="pt-4 flex flex-col gap-4">
          <div>
            <h4 class="font-bold text-2xl pb-4">Información personal</h4>
            <div class="grid lg:grid-cols-2 gap-x-4">
              <v-text-field :rules="[() => !!data.givenName || 'Campo requerido']" required variant="outlined"
                v-model="data.givenName" label="Nombres"></v-text-field>
              <v-text-field :rules="[() => !!data.familyName || 'Campo requerido']" required variant="outlined"
                v-model="data.familyName" label="Apellidos"></v-text-field>
              <v-select variant="outlined" label="Tipo Documento" v-model="data.tipo_documento"
                :items="t_doc"></v-select>
              <v-text-field :rules="[() => !!data.numero_documento || 'Campo requerido']" required variant="outlined"
                v-model="data.numero_documento" label=" Número de documento"></v-text-field>
              <v-text-field :rules="[() => !!data.birthdate || 'Campo requerido']" required variant="outlined"
                v-model="data.birthdate" label="Fecha de Nacimiento" type="date"></v-text-field>
              <v-text-field :rules="[() => !!data.address || 'Campo requerido']" required variant="outlined"
                v-model="data.address" label="Dirección"></v-text-field>
              <v-text-field :rules="[() => !!data.city || 'Campo requerido']" required variant="outlined"
                v-model="data.city" label="Ciudad / Municipio"></v-text-field>
              <v-autocomplete :rules="[() => !!data.country || 'Campo requerido']" v-model="data.country" label="Pais"
                variant="outlined" :items="list_countries"></v-autocomplete>
              <v-phone-input :prefer-countries="['CO', 'MX', 'AR', 'PE', 'EC', 'US', 'VE']" v-model="data.phone"
                variant="outlined" country-label="Indicativo" label="Teléfono" country-icon-mode="svg" />
              <v-text-field :rules="[() => !!data.email || 'Campo requerido']" required prepend-inner-icon="mdi-email"
                variant="outlined" v-model="data.email" label="Email" type="email"></v-text-field>
            </div>
          </div>
          <div>
            <h4 class="font-bold text-2xl pb-4">Información adicional</h4>
            <div class="grid lg:grid-cols-2 gap-x-4">
              <v-select variant="outlined" label="Rol" v-model="data.rol" :items="['SUPER ADMIN', 'ADMIN']"></v-select>
              <v-select variant="outlined" multiple label="Tipo Usuario" v-model="data.userType"
                :items="data.userTypesList"></v-select>
            </div>
          </div>
          <button type="submit"
            class="w-full py-4 text-white font-bold bg-gradient-to-r from-fuchsia-900 to-violet-950 rounded-lg">Guardar</button>
        </v-form>
      </div>
    </div>
  </div>
</template>