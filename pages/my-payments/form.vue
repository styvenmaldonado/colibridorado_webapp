<script setup lang="ts">
//definePageMeta({ middleware: "auth", auth: { guestRedirectTo: "/login" } });
import type { SubmitEventPromise } from "vuetify";
import ButtonNavigation from "~/layouts/ButtonNavigation.vue";
const { signIn, signOut, session, status, cookies, getProviders } = useAuth();

const submit = async (event: SubmitEventPromise) => {
  const { valid } = await event;
  if(!valid) return
}

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
          <span class="font-bold text-violet-950">Sube tu Pago</span>
          <p>Carga la Información y el Comprobante de tu pago.</p>
        </div>
      </div>

      <v-form  @submit.prevent="submit" class="mt-4 flex flex-col gap-4 p-6">
        <div>
  
          <div class="">
            <v-text-field
              required
              variant="outlined"
              label="Fecha de Pago"
              type="date"
            ></v-text-field>
            <v-select
              variant="outlined"
              label="Ceremonia y/o Retiro"
              :items="['Ceremonia 1', 'Ceremonia 2', 'Ceremonia 3', 'Retiro 4']"
            ></v-select>
            <v-text-field
              model-value="100"
              prefix="$"
              variant="outlined"
              label="Monto"
            ></v-text-field>
            <v-select
              variant="outlined"
              label="Metodo de Pago"
              :items="['Efectivo', 'Transferencia']"
            ></v-select>
            <v-file-input
              clearable
              label="Comprobante de Pago (Opcional)"
              variant="outlined"
            ></v-file-input>
            <v-textarea label="Observaciones" variant="outlined"></v-textarea>
          </div>
        </div>

        <button
          type="submit"
          class="w-full py-4 text-white font-bold bg-gradient-to-r from-fuchsia-900 to-violet-950 rounded-lg"
        >
          Enviar
        </button>
      </v-form>
    </div>
  </div>
</template>
