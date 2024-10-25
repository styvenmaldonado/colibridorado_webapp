<script setup  lang="ts">
import { toast } from 'vue3-toastify';
import { client } from '~/libs/AmplifyDataClient';
import { format } from "date-fns";


const route = useRoute();

const { data: event, status } = await useAsyncData('getUser', async () => {
  const { data } = await client.models.Events.get({id: route.params.id?.toString() || ""})
  return data
})


const deleteEvent = async () => {
    const { errors } = await client.models.Events.delete({
        id: route.params?.id.toString() || ""
    })
    if (!errors) {
    toast("Evento Eliminado con Exito!", {
      "theme": "colored",
      "type": "success",
      "dangerouslyHTMLString": true
    })
    await navigateTo({
      path: "/events"
    })
  } else {
    toast("Error al eliminar Evento, Intenta Nuevamente!", {
      "theme": "colored",
      "type": "error",
      "dangerouslyHTMLString": true
    })
  }
}

const tab = ref("users")
const dialog = ref(false)

</script>
<template>
    <div class="w-full h-full p-8 overflow-y-scroll">
        <div class="py-8">
            <button @click="navigateTo('/events')" class="w-10 my-5"><v-icon size="large">mdi-arrow-left</v-icon></button>
            <div class="flex items-center pb-8">
                <div class="grid text-lg">
                    <h1 class="text-4xl font-bold p">{{ event?.name }}</h1>
                    <span>{{ event?.type }}</span>
                    <span>{{ event?.location}}</span>
                    <span>{{ format(new Date(event?.datetime_start || ""),"d 'de' MMMM yyyy - hh:mm aaaa") }} - {{ format(new Date(event?.datetime_end || ""),"d 'de' MMMM yyyy - hh:mm aaaa") }}</span>
                </div>
                <div class="ml-auto flex gap-3">
                    <button @click="navigateTo('/events/edit?id=' + route.params.id?.toString())"
                        class="px-5 font-bold rounded-lg flex gap-2 items-center py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white">
                        <v-icon>mdi-pencil</v-icon>
                        <span>Editar Evento</span>
                    </button>
                    <div class="text-center">
                        <button @click="dialog = true"
                            class="px-5 font-bold rounded-lg flex gap-2 items-center py-3 bg-gradient-to-r from-red-500 to-red-600 text-white">
                            <v-icon>mdi-delete</v-icon>
                            <span>Eliminar Evento</span>
                        </button>

                        <v-dialog v-model="dialog"  class="flex">
                           <div class="bg-white w-2/6 h-auto m-auto gap-6 rounded-lg shadow-lg flex flex-col p-8 ">
                                <span class="flex gap-4 items-center text-red-600 py-2">
                                    <v-icon size="x-large">mdi mdi-alert</v-icon>
                                    <span class="text-3xl text-black font-bold">Eliminar Evento</span>
                                </span>
                                <div class="border border-gray-200"></div>
                                <span>¿Estas seguro que quieres eliminar de la base de datos el registro del evento <span class="font-bold">{{  event?.name}}?</span></span>
                                <div class="border border-gray-200"></div>
                                <div class="flex gap-3">
                                    <button @click="dialog = false" class="ml-auto bg-gray-200 text-black px-6 py-4 rounded-lg">Cancel</button>
                                    <button @click="deleteEvent" class="bg-red-600 text-white px-6 py-4 rounded-lg">Eliminar</button>
                                </div>
                           </div>
                        </v-dialog>
                    </div>

                </div>
            </div>
            <v-tabs v-model="tab" bg-color="white" slider-color="deep-purple-darken-4" color="deep-purple-darken-4">
                <v-tab :value="interviews">Asistentes</v-tab>
                <v-tab :value="payments">Pagos</v-tab>
            </v-tabs>
            <v-tabs-window v-model="tab">
                <v-tabs-window-item value="interviews">
                    <users-tab></users-tab>
                </v-tabs-window-item>
                <v-tabs-window-item value="payments">
                    <table-payments-events />
                </v-tabs-window-item>
            </v-tabs-window>
        </div>
    </div>
</template>