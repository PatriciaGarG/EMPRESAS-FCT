<script setup lang="ts">
  import type { Alumn } from '../../../types/alumn';
  import { computed } from 'vue';

  // Definimos los props y los hacemos required
  const props = defineProps<{
    alumnData: Alumn[];
  }>();

  // Creamos una referencia directa a los datos
  const alumn = computed(() => props.alumnData);
</script>

<template>
  <div>
    <div
      class="border-2 border-blue-950 w-full h-full mt-[250px] ml-[25%] space-y-3 shadow-md bg-white"
    >
      <table class="min-w-full divide-y divide-gray-200">
        <thead
          class="bg-blue-950 text-white text-left uppercase tracking-wider font-bold text-2xs"
        >
          <tr>
            <th scope="col" class="px-6 py-3">Nombre</th>
            <th scope="col" class="px-6 py-3">DNI</th>
            <th scope="col" class="px-6 py-3">Contacto</th>
            <th scope="col" class="px-6 py-3">Empresa</th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr v-for="alumno in alumn" :key="alumno.id">
            <td class="px-6 py-4 whitespace-nowrap">
              <router-link :to="`/alumn/${alumno.id}`">
                {{ alumno.name }}
              </router-link>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">{{ alumno.dni }}</td>
            <td class="px-6 py-4 whitespace-nowrap">
              {{ alumno.email }} <br />
              {{ alumno.phone }}
            </td>
            <td id="company_id" class="px-6 py-4 whitespace-nowrap">
              {{ alumno.company_name || 'Sin empresa' }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
