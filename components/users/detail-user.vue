<script setup lang="ts">
import { client } from '~/libs/AmplifyDataClient';
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
import { useGetUser } from '~/hooks/users';

const route = useRoute()

const tab = ref("info")
const dialog = ref(false)


const { data, error } = await useGetUser(route.params?.id.toString() || "")

const deleteUser = async () => {
    const { errors } = await client.models.Users.delete({
        id: route.params?.id.toString() || ""
    })
    if (!errors) {
    toast("Usuario Eliminado con Exito!", {
      "theme": "colored",
      "type": "success",
      "dangerouslyHTMLString": true
    })
    await navigateTo({
      path: "/users"
    })
  } else {
    toast("Error al eliminar Usuario, Intenta Nuevamente!", {
      "theme": "colored",
      "type": "error",
      "dangerouslyHTMLString": true
    })
  }
}
</script>
<template>
    <div class="w-full h-full p-8 overflow-y-scroll">
        <div class="py-8">
            <button @click="navigateTo('/users')" class="w-10 my-5"><v-icon
                    size="large">mdi-arrow-left</v-icon></button>
            <div class="flex items-center pb-8">
                <div class="grid text-lg">
                    <h1 class="text-4xl font-bold p">{{ data?.family_name }} {{ data?.given_name }}</h1>
                    <span>{{ data?.tipo_documento }}</span>
                    <span>No. Documento {{ data?.numero_documento }}</span>
                    <span>29 Años</span>
                </div>
                <div class="ml-auto flex gap-3">
                    <button @click="navigateTo('/users/edit?id=' + data?.id)"
                        class="px-5 font-bold rounded-lg flex gap-2 items-center py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white">
                        <v-icon>mdi-pencil</v-icon>
                        <span>Editar Usuario</span>
                    </button>
                    <div class="text-center">
                        <button @click="dialog = true"
                            class="px-5 font-bold rounded-lg flex gap-2 items-center py-3 bg-gradient-to-r from-red-500 to-red-600 text-white">
                            <v-icon>mdi-delete</v-icon>
                            <span>Eliminar Usuario</span>
                        </button>

                        <v-dialog v-model="dialog"  class="flex">
                           <div class="bg-white w-2/6 h-auto m-auto gap-6 rounded-lg shadow-lg flex flex-col p-8 ">
                                <span class="flex gap-4 items-center text-red-600 py-2">
                                    <v-icon size="x-large">mdi mdi-alert</v-icon>
                                    <span class="text-3xl text-black font-bold">Eliminar Usuario</span>
                                </span>
                                <div class="border border-gray-200"></div>
                                <span>¿Estas seguro que quieres eliminar de la base de datos el registro del usuario  <span class="font-bold">{{ data?.given_name}} {{data?.family_name}}?</span></span>
                                <div class="border border-gray-200"></div>
                                <div class="flex gap-3">
                                    <button @click="dialog = false" class="ml-auto bg-gray-200 text-black px-6 py-4 rounded-lg">Cancel</button>
                                    <button @click="deleteUser" class="bg-red-600 text-white px-6 py-4 rounded-lg">Eliminar</button>
                                </div>
                           </div>
                        </v-dialog>
                    </div>

                </div>
            </div>
            <v-tabs v-model="tab" bg-color="white" slider-color="deep-purple-darken-4" color="deep-purple-darken-4">
                <v-tab :value="info">Información personal</v-tab>
                <v-tab :value="interviews">Entrevistas</v-tab>
                <v-tab :value="event">Ceremonias y Retiros</v-tab>
                <v-tab :value="payments">Pagos</v-tab>
            </v-tabs>
            <v-tabs-window v-model="tab">
                <v-tabs-window-item value="info">
                    <div class="p-12 bg-slate-50 rounded-lg mt-4">
                        <div class="grid grid-cols-2 gap-5 text-lg">
                            <div class="grid">
                                <span class="font-bold">Telefono</span>
                                <span>{{ data?.phone_number }}</span>
                            </div>
                            <div class="grid">
                                <span class="font-bold">Email</span>
                                <a href="mailto:micorreo@gmail.com">{{ data?.email }}</a>
                            </div>
                            <div class="grid">
                                <span class="font-bold">Direccion</span>
                                <span>{{ data?.address }}</span>
                            </div>
                            <div class="grid">
                                <span class="font-bold">Ciudad</span>
                                <span>{{ data?.city }}</span>
                            </div>
                            <div class="grid">
                                <span class="font-bold">Pais</span>
                                <span>{{ data?.country }}</span>
                            </div>
                            <div class="grid">
                                <span class="font-bold">Fecha de Nacimiento</span>
                                <span>{{ data?.birthdate }}</span>
                            </div>
                            <div class="grid">
                                <span class="font-bold">rol</span>
                                <span>{{ data?.permissions || "-" }}</span>
                            </div>
                            <div v-if="data?.rol" class="grid">
                                <span class="font-bold">Tipo de Usuario</span>
                                <div v-for="(r, index) in JSON.parse(data.rol.toString())" :key="index" class="grid gap-2">
                                    <span class="text-sm px-3 py-1.5 rounded-lg bg-slate-200 w-fit my-2">{{r?.name}}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </v-tabs-window-item>
                <v-tabs-window-item value="interviews">
                    <interviews-tab />
                </v-tabs-window-item>
                <v-tabs-window-item value="event">
                    <events-tab />
                </v-tabs-window-item>
                <v-tabs-window-item value="payments">
                    <payments-tab />
                </v-tabs-window-item>
            </v-tabs-window>
        </div>
    </div>
</template>