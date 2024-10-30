<script setup lang="ts">
const tab = ref("users")
import { debounce } from "lodash";
const model = reactive({
  q: "",
});

const router = useRouter();
watch(
  model,
  debounce((value) => {
    const p = new URLSearchParams(value).toString();
    router.push("?" + p);
  }, 1000)
);

</script>
<template>
    <div class="w-full h-full p-8 overflow-y-scroll">
        <div class="py-8">
            <div>
                <div class="flex items-center pt-8">
                    <div>
                        <h1 class="text-4xl font-bold">Ceremonias y eventos</h1>
                    </div>
                    <div class="ml-auto">
                        <button @click="navigateTo('/events/create')"
                            class="px-5 font-bold rounded-lg py-3 bg-gradient-to-r from-fuchsia-900 to-violet-950 text-white">+
                            Nueva Ceremonia o evento</button>
                    </div>
                </div>
            </div>
            <div class="py-4 flex gap-2">
                <v-text-field v-model="model.q" variant="outlined" prepend-inner-icon="mdi-magnify" label="Buscar Nombre o Lugar"></v-text-field>
            </div>
            <table-events></table-events>
        </div>
    </div>
</template>