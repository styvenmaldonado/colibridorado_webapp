<script lang="ts">
export default {
    methods: {
    async goTo(route:string){
      await navigateTo({ path: route})
    }
  }
}
</script>
<template>
    <div class="pb-4">
        <div class="flex items-center pt-8">
            <div>
                <h1 class="text-4xl font-bold">Tipos de Usuario</h1>
            </div>
            <div class="ml-auto">
                <button @click="goTo('/users/createUserType')"
                    class="px-5 font-bold rounded-lg py-3 bg-gradient-to-r from-fuchsia-900 to-violet-950 text-white">+
                    Nuevo Tipo de Usuario</button>
            </div>
        </div>
    </div>
    <table-usertypes></table-usertypes>
</template>