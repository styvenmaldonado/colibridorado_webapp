<script lang="ts">
export default {
    data: () => ({
        tab: "users"
    })
}
</script>
<template>
    <div class="w-full h-full p-8 overflow-y-scroll">
        <div class="py-8">
            <v-tabs 
            v-model="tab" 
            bg-color="white"
            slider-color="deep-purple-darken-4"
            color="deep-purple-darken-4"
            >
                <v-tab :value="users">Usuarios</v-tab>
                <v-tab :value="usersTypes">Tipos de Usuario</v-tab>
            </v-tabs>
            <v-tabs-window v-model="tab">
                <v-tabs-window-item value="users">
                    <users-tab/>
                </v-tabs-window-item>
                <v-tabs-window-item value="usersType">
                    <userstypes-tab/>
                </v-tabs-window-item>
            </v-tabs-window>
        </div>
    </div>
</template>