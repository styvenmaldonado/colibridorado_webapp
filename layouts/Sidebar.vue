<script lang="ts">
import { signOut } from 'aws-amplify/auth';

export default {
  methods: {
    async onclick(){

      const a = await signOut();
      console.log(a)
      await navigateTo({
         path: "/login",
      })
    }
  },
  data() {
    return {
        routes: [
        {
          name: "Usuarios",
          icon: "mdi-account",
          route: "/users",
        },
        {
          name: "Retiros y Ceremonias",
          icon: "mdi-calendar",
          route: "/events",
        },
        {
          name: "Pagos",
          icon: "mdi-credit-card-outline",
          route: "/payments",
        },
      ],
    }
  },
}

</script>

<template>
        <div class="w-96 bg-white shadow-lg h-full bg-gradient-to-r from-fuchsia-900 to-violet-950">
            <div class="flex flex-col gap-5 p-6 h-full">
              <div class="w-full flex">
                <div class="bg-white  h-40 w-40 rounded-full shadow-lg flex mb-8 m-auto">
                  <img class="h-full p-3 object-cover mx-auto" src="/logo.webp" />
                </div>
              </div>
              <div v-for="(r, index) in routes" :key="index">
                <NuxtLink :to="r.route">
                  <div class="flex gap-5 text-white font-bold hover:text-blue-900">
                    <span>
                      <div>
                        <v-icon>{{ r.icon }}</v-icon>
                      </div>
                    </span>
                    <span>{{ r.name }}</span>
                  </div>
                </NuxtLink>
              </div>
              <div class="mt-auto">
                <button @click="onclick">
                  <div class="flex gap-5 text-white font-bold hover:text-blue-900">
                    <span>
                      <div>
                        <v-icon>mdi-power</v-icon>
                      </div>
                    </span>
                    <span>Cerrar sesión</span>
                  </div>
                </button>
              </div>
            </div>
        </div>
</template>
