<script setup lang="ts">
const route = useRoute()


</script>
<template>
    <div class="pb-4">
        <div class="flex items-center pt-8">
            <div>
                <h1 class="text-4xl font-bold">Entrevistas</h1>
            </div>
            <div class="ml-auto">
                <button @click="navigateTo('/users/createInterview/'+ route.params?.id)"
                    class="px-5 font-bold rounded-lg py-3 bg-gradient-to-r from-fuchsia-900 to-violet-950 text-white">+
                    Nueva Entrevista</button>
            </div>
        </div>
    </div>
    <table-interviews/>
</template>