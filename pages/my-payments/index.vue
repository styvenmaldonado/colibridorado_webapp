<script setup lang="ts">
//definePageMeta({ middleware: "auth", auth: { guestRedirectTo: "/login" } })
import ButtonNavigation from '~/layouts/ButtonNavigation.vue';
const { signIn, signOut, session, status, cookies, getProviders } = useAuth()

</script>
<template>
  <div class="flex flex-col w-screen h-screen">
    <div class="fixed bottom-0 left-0">
      <ButtonNavigation />
    </div>
    <div class="h-44 lg:h-60 relative">
      <div class="absolute w-full h-full flex">
        <div class="flex w-28 h-28 lg:w-36 lg:h-36 rounded-full shadow-lg m-auto bg-white">
          <img class="m-auto h-24 w-24 lg:w-32 lg:h-32 object-cover" src="/logo.webp" />
        </div>
      </div>
      <img class="h-full w-full object-fill" src="/background.webp" />
    </div>
    <div
      class="bg-white pt-10 lg:pt-0 lg:m-auto lg:w-3/6 flex flex-col lg:rounded-lg lg:shadow-lg lg:border lg:border-gray-300">
      <div class="px-5 lg:w-11/12 lg:py-8 mx-auto " style="width: -webkit-fill-available;">
        <div class="text-lg pt-6">
          <span class="font-bold"></span> <span class="font-bold text-violet-950">Mis Pagos</span>
          <p>Revisa del detalle de los pagos realizados.
          </p>
        </div>
      </div>
      
      <div class="py-4 flex flex-col gap-5 px-5">
        <button @click="navigateTo('/my-payments/form')" type="submit"
                class="w-full py-4 text-white font-bold bg-gradient-to-r from-fuchsia-900 to-violet-950 rounded-lg">+ Subir Comprobante</button>
        <div class="p-5 rounded-lg border border-gray-400 flex flex-col">
          <v-icon size="x-large">mdi-credit-card-outline</v-icon>
          <span class="text-green-600 font-bold">+ $60,000 COP</span>
          <span class="text-blue-700 underline" >Cermonia 1, El Rosal</span>
          <span>12/09/2024 - 10:47 PM</span>
          <span>Tarjeta de Credito</span>
          <span>Id - 14354-32144</span>
        </div>
        <div class="p-5 rounded-lg border border-gray-400 flex flex-col">
          <v-icon size="x-large">mdi-credit-card-outline</v-icon>
          <span class="text-green-600 font-bold">+ $130,000 COP</span>
          <span class="text-blue-700 underline" >Cermonia 2, El Rosal</span>
          <span>12/09/2024 - 10:47 PM</span>
          <span>Tarjeta de Credito</span>
          <span>Id - 14354-32144</span>
        </div>
        <div class="p-5 rounded-lg border border-gray-400 flex flex-col">
          <v-icon size="x-large">mdi-credit-card-outline</v-icon>
          <span class="text-green-600 font-bold">+ $260,000 COP</span>
          <span class="text-blue-700 underline">Cermonia 3, El Rosal</span>
          <span>12/09/2024 - 10:47 PM</span>
          <span>Efectivo</span>
          <span>Id - 14354-32144</span>
        </div>
      </div>
      

      <div class="pt-24"></div>
    </div>
    <button-nav :items="[
      {
        title: 'Inicio', route: '/', icon: 'mdi-home-outline'
      },
      {
        title: 'Mis Eventos', route: '/my-events', icon: 'mdi-calendar-blank-multiple'
      },
      {
        title: 'Pagos', route: '/my-payments', icon: 'mdi-credit-card-outline', active: true
      },
      {
        title: 'Mi Perfil', route: '/my-profile', icon: 'mdi-account-circle'
      }
    ]" />
  </div>
</template>
