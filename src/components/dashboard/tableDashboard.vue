<script lang="ts" setup>
  import { ref } from 'vue';
  import { getAlumn } from '../services/AlumnService';
  import type { Alumn } from '../../types/alumn.d.ts';
  import type { Ref } from 'vue';
  import { onMounted } from 'vue';

  const alumnData: Ref<Alumn[] | null> = ref([]);

  const getAlumnData = async () => {
    try {
      const response = await getAlumn();
      alumnData.value = response;
      console.log('Alumn data fetched successfully:', alumnData.value);
    } catch (error) {
      console.error('Error fetching alumn data:', error);
    }
  };
  onMounted(() => {
    getAlumnData();
  });
</script>
<template>
  <form class="flex flex-col items-center justify-center h-screen bg-gray-100">
    <div
      class="border-2 border-blue-950 w-full h-full mt-[250px] ml-[25%] space-y-3 shadow-md bg-white"
    >
      <table class="min-w-full divide-y divide-gray-200">
        <thead
          class="bg-blue-950 text-white text-left uppercase tracking-wider font-bond text-2xs"
        >
          <tr>
            <th scope="col" class="px-6 py-3">Nombre</th>
            <th scope="col" class="px-6 py-3">DNI</th>
            <th scope="col" class="px-6 py-3">Contacto</th>
            <th scope="col" class="px-6 py-3">Empresa</th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr v-for="(alumno, index) in alumnData" :key="index">
            <td class="px-6 py-4 whitespace-nowrap">
              {{ alumno.first_name }} {{ alumno.last_name_1 }}
              {{ alumno.last_name_2 }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap">{{ alumno.dni }}</td>
            <td class="px-6 py-4 whitespace-nowrap">
              {{ alumno.email }} <br />
              {{ alumno.phone }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              {{ alumno.company?.name || 'Sin empresa' }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </form>
</template>
