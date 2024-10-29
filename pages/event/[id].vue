<script setup lang="ts">
definePageMeta({ middleware: "authentication" });

import { format } from "date-fns";
import { useGetEvent } from "~/hooks/events";


const route = useRoute();
const { data: event, status } = await useGetEvent(route.params.id?.toString() || "",)
</script>
<template>
  <div class="w-screen">
    <div class="h-fit relative">
      <v-carousel height="25rem" :show-arrows="false">
        <v-carousel-item
          v-for="(photo, index) in event?.photos" :key="index"
          :src="`https://d334a63s5wk7yh.cloudfront.net/` + photo?.toString()"
          cover
        ></v-carousel-item>
      </v-carousel>
    </div>
    <div class="px-5 py-8 flex flex-col gap-y-4">
      <span
        class="px-3 py-2 w-fit rounded-lg font-bold bg-gradient-to-r from-fuchsia-900 to-violet-950 text-white"
        >{{ event?.type }}</span
      >
      <h1 class="text-2xl font-bold">{{ event?.name }}</h1>
      <div class="flex gap-3">
        <v-icon class="text-violet-950">mdi-calendar-multiple</v-icon>
        <span>{{ format(new Date(event?.datetime_start || ""),"d 'de' MMMM yyyy - hh:mm aaaa") }} - {{ format(new Date(event?.datetime_end || ""),"d 'de' MMMM yyyy - hh:mm aaaa") }} </span>
      </div>
      <div class="flex gap-3">
        <v-icon class="text-violet-950">mdi-map-marker-multiple</v-icon>
        <span>{{ event?.location }}</span>
      </div>
      <p>{{ event?.description }}</p>
      <div v-if="event?.cancelPolicy">
        <h3 class="text-violet-950 font-bold">Politica de Cancelacion</h3>
        <p>{{ event?.cancelPolicy }}</p>
      </div>
    </div>
    <div class="absolute top-0 left-0">
      <button @click="navigateTo(`/`)" class="h-14 w-14 rounded-full bg-white flex m-4">
        <v-icon class="m-auto">mdi-arrow-left</v-icon>
      </button>
    </div>
    <div class="pt-24"></div>
    <div class="fixed bottom-0 left-0 w-full">
      <button
        @click="navigateTo('/register-event/' + route.params.id?.toString())"
        class="w-full py-6 bg-gradient-to-r text-white font-bold text-lg from-fuchsia-900 to-violet-950"
      >
        Resueno y me quiero inscribir
      </button>
    </div>
  </div>
</template>
