<script lang="ts">
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
import { client } from '~/libs/AmplifyDataClient';
import { v4 as uuidv4 } from 'uuid';
import type { SubmitEventPromise } from 'vuetify';




export default {
  data() {
    return {
      userTypesList: [
        'Caminantes No Entrenad@s',
        'Caminantes Entrenad@s',
        'Caminantes Entrenamiento Especial',
        'Caminantes Administrativo',
        'Caminantes Logistica',
        'Caminantes Acostad@s'
      ],
      id:uuidv4(),
      name: "",
    }
  },
  methods: {
    async goTo(route: string) {
      await navigateTo({ path: route })
    },
    async submit(event: SubmitEventPromise) {
      const { valid } = await event;
      if (!valid) return
      const id = uuidv4()
      const { errors } = await client.models.UsersTypes.create({
        id,
        userTypeId:id,
        name: this.name
      })
      if (!errors) {
        toast("Tipo Usuario Creado con Exito!", {
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
  }
}
</script>
<template>
  <div class="w-full h-full p-8 overflow-y-scroll flex">
    <div class="w-9/12 mx-auto">
      <div class="flex items-center pt-8 ">
        <div class="flex flex-col gap-3">
          <button @click="goTo('/users')" class="w-12"><v-icon size="large">mdi-arrow-left</v-icon></button>
          <h1 class="text-4xl font-bold">Nuevo Tipo de Usuario</h1>
        </div>
      </div>
      <div class="py-8">
        <v-form z @submit.prevent="submit" class="pt-4 flex flex-col gap-4">
          <div>
            <div class="grid">
              <v-text-field :rules="[() => !!name || 'Campo requerido']" required variant="outlined"
                v-model="name" label="Nombre"></v-text-field>
            </div>
          </div>
          <button type="submit"
            class="w-full py-4 text-white font-bold bg-gradient-to-r from-fuchsia-900 to-violet-950 rounded-lg">Guardar</button>
        </v-form>
      </div>
    </div>
  </div>
</template>