<template>
  <div>
    <button @click="descargarCSV">Descargar CSV</button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

// Definimos los datos
const datos = ref([
  { name: "Styven Maldonado", age: 17 },
  { name: "Otro Nombre", age: 25 },
  // Agrega más datos aquí si es necesario
]);

// Definimos las cabeceras personalizadas
const headers = {
  name: 'Nombre',
  age: 'Edad'
};

// Función genérica para convertir los datos en formato CSV
function convertirA_CSV<T extends Record<string, any>>(datos: T[], headers: Record<string, string>): string {
  if (datos.length === 0) {
    return '';
  }

  const cabeceras = Object.values(headers);
  const filas = datos.map(dato => Object.keys(headers).map(key => dato[key]));
  const csvContent = [cabeceras, ...filas]
      .map(e => e.join(","))
      .join("\n");

  return csvContent;
}

// Función para crear y descargar el archivo CSV
function descargarCSV() {
  const csvContent = convertirA_CSV(datos.value, headers);
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.setAttribute("href", url);
  link.setAttribute("download", "datos.csv");
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
</script>

<style scoped>
/* Puedes agregar estilos aquí si es necesario */
</style>