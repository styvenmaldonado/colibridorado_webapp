<script setup lang="ts">
import { Amplify } from "aws-amplify";
import outputs from "../../amplify_outputs.json";
import { signUp } from "aws-amplify/auth";
import { client } from "~/libs/AmplifyDataClient";
import { toast } from "vue3-toastify";
import 'vue3-toastify/dist/index.css';


Amplify.configure(outputs);
const route = useRoute();

const { data: user, error } = await useAsyncData('users', async () => {
    const { data } = await client.models.Users.get({ id: route.params?.id.toString() || "" })
    return data
})


const t_doc = ref([
    "CC - Cédula de Ciudadanía",
    "CE - Cédula de extranjería",
    "PA - Pasaporte",
    "TI - Tarjeta de Identidad",
    "CD - Carnet Diplomático",
    "PEP - Permiso Especial de Permanencia",
  ],
) 

const data = ref({
  givenName: user.value?.given_name,
  familyName:  user.value?.family_name,
  tipo_documento: user.value?.numero_documento,
  numero_documento: user.value?.numero_documento,
  birthdate: user.value?.birthdate,
  address: user.value?.address,
  email: user.value?.email,
  phone_number: user.value?.phone_number,
});


const interview = ref({
  isVerified: false,
  description: ''
})

const submit = async () => {
  const { errors } = await client.models.Interviews.create({
    interviewsId: "",
    userId: route.params?.id.toString() || "",
    isVerified: interview.value.isVerified,
    description: interview.value.description
  })
  if (!errors) {
    toast("Entrevista Creada con Exito!", {
      "theme": "colored",
      "type": "success",
      "dangerouslyHTMLString": true
    })
    await navigateTo({
      path: "/users/detail/" + route.params?.id.toString() || ""
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
  <div class="w-full h-full p-8 overflow-y-scroll flex">
    <div class="w-9/12 mx-auto">
      <div class="flex items-center pt-8">
        <div class="flex flex-col gap-3">
          <button @click="" class="w-12">
            <v-icon size="large">mdi-arrow-left</v-icon>
          </button>
          <h1 class="text-4xl font-bold">Nueva Entrevista</h1>
        </div>
      </div>
      <div class="py-8">
        <v-form  @submit.prevent="submit" class="pt-4 flex flex-col gap-4">
          <div>
            <h4 class="font-bold text-2xl pb-4">Información personal</h4>
            <div class="grid lg:grid-cols-2 gap-x-4">
              <v-text-field
                :rules="[() => !!data.givenName || 'Campo requerido']"
                required
                variant="outlined"
                v-model="data.givenName"
                disabled
                label="Nombres"
              ></v-text-field>
              <v-text-field
                :rules="[() => !!data.familyName || 'Campo requerido']"
                required
                variant="outlined"
                v-model="data.familyName"
                disabled
                label="Apellidos"
              ></v-text-field>
              <v-select
                variant="outlined"
                label="Tipo Documento"
                v-model="data.tipo_documento"
                disabled
                :items="t_doc"
              ></v-select>
              <v-text-field
                :rules="[() => !!data.numero_documento || 'Campo requerido']"
                required
                variant="outlined"
                v-model="data.numero_documento"
                disabled
                label=" Número de documento"
              ></v-text-field>
              <v-text-field
                :rules="[() => !!data.birthdate || 'Campo requerido']"
                required
                variant="outlined"
                v-model="data.birthdate"
                label="Fecha de Nacimiento"
                disabled
                type="date"
              ></v-text-field>
              <v-text-field
                :rules="[() => !!data.address || 'Campo requerido']"
                required
                variant="outlined"
                v-model="data.address"
                disabled
                label="Dirección"
              ></v-text-field>
              <v-text-field
                :rules="[() => !!data.phone_number || 'Campo requerido']"
                required
                prepend-inner-icon="mdi-phone-in-talk"
                variant="outlined"
                v-model="data.phone_number"
                disabled
                label="Teléfono"
                type="tel"
              ></v-text-field>
              <v-text-field
                :rules="[() => !!data.email || 'Campo requerido']"
                required
                prepend-inner-icon="mdi-email"
                variant="outlined"
                v-model="data.email"
                label="Email"
                disabled
                type="email"
              ></v-text-field>
            </div>
          </div>
          <div>
            <h4 class="font-bold text-2xl pb-4">Hallazgos</h4>
            <div class="">
              <div class="flex gap-2">
                <v-checkbox v-model="interview.isVerified" label="Admitido"></v-checkbox>
               
              </div>

              <v-textarea v-model="interview.description" label="Descripcion" variant="outlined"></v-textarea>
            </div>
          </div>

          <button
            type="submit"
            class="w-full py-4 text-white font-bold bg-gradient-to-r from-fuchsia-900 to-violet-950 rounded-lg"
          >
            Guardar
          </button>
        </v-form>
      </div>
    </div>
  </div>
</template>
