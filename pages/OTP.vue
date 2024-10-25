<script setup lang="ts">
definePageMeta({ middleware: "guest-only", auth: { authenticatedRedirectTo: "/" } })

import { confirmSignUp, resendSignUpCode } from 'aws-amplify/auth'
import { Amplify } from "aws-amplify";
import outputs from '../amplify_outputs.json';
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

Amplify.configure(outputs);

const router = useRoute()

const state = ref(
  {
    code: "",
    loading: false,
    error: false
  }
)

const resendCode = async () => {
  try {
    await resendSignUpCode({
    username: router.query?.email?.toString() || "",
  })
  } catch (error) {
    toast("Error al enviar código OTP, Intente mas tarde", {
      "theme": "colored",
      "type": "error",
      "position": "top-center",
      "autoClose": false,
      "dangerouslyHTMLString": true
    })
  }
  
}

const onclick = async () => {
  try {
    state.value.loading = true;
    const router = useRouter()
    const { isSignUpComplete, nextStep } = await confirmSignUp({
      username: router.currentRoute.value.query?.email?.toString() || "",
      confirmationCode: state.value.code
    })
    nextStep.signUpStep == "DONE" && await navigateTo("/");
  } catch (error) {
    toast("Código OTP Invalido", {
      "theme": "colored",
      "type": "error",
      "position": "top-center",
      "autoClose": false,
      "dangerouslyHTMLString": true
    })
    state.value.loading = false
    state.value.code = ""
  }
}

</script>

<template>
  <div class="flex flex-col w-screen h-screen">
    <div class="h-44 lg:h-60 relative">
      <div class="absolute w-full h-full flex">
        <div class="flex w-28 h-28 lg:w-36 lg:h-36 rounded-full shadow-lg m-auto bg-white">
          <img class="m-auto h-24 w-24 lg:w-32 lg:h-32 object-cover" src="/logo.webp" />
        </div>
      </div>
      <img class="h-full w-full object-fill" src="/background.webp" />
    </div>
    <div
      class="bg-white pt-10 lg:pt-0 lg:m-auto lg:w-3/6  flex lg:rounded-lg lg:shadow-lg lg:border lg:border-gray-300">
      <div class="px-5 lg:w-11/12 lg:py-8 mx-auto">
        <h1 class="text-2xl text-violet-950 font-black">Verificación OTP</h1>
        <span>Revisa la bandeja de entrada o de spam de tu correo electrónico <span
            class="text-blue-600 font-bold underline">{{ router.query?.email }}</span>. Te hemos enviado un correo con un código de seguridad,
          ingrésalo para crear tu cuenta</span>
        <div class="py-6">
          <v-otp-input :loading="state.loading" v-model="state.code" focus-all :length="6"></v-otp-input>
        </div>
        <div class="py-6 flex">
          <div class="m-auto flex gap-1">
            <span>¿No recibiste el código OTP?</span>
            <button @click="resendCode" class="text-blue-600 font-bold ">REENVIAR CÓDIGO</button>
          </div>
        </div>
        <button :disabled="state.code.length < 5" @click="onclick" color="surface-variant" text="Submit" variant="tonal"
          :class="state.code.length < 5 ? 'bg-gray-200 font-bold py-4 w-full rounded-lg text-gray-400' : 'bg-gradient-to-r from-fuchsia-900 to-violet-950 text-white font-bold py-4 w-full rounded-lg'">Enviar</button>
      </div>
    </div>
  </div>
</template>
