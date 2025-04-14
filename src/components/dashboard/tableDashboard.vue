<script lang="ts" setup>
  import { reactive } from 'vue';
  import { getAlumn } from '../services/AlumnService';
  import type { Alumn, AlumnDB } from '../../types/alumn.d.ts';
  import { onMounted } from 'vue';

  const alumnData = reactive([]) as Alumn[];

  const getAlumnData = async () => {
    try {
      const data = await getAlumn();

      if (data) {
        const alumnDataDB = data as unknown as AlumnDB[];

        alumnDataDB.forEach((alumnDB) => {

          // Añadir el nuevo alumno a alumnData
          alumnData.push({
            id: alumnDB.id,
            name: `${alumnDB.first_name} ${alumnDB.last_name_1} ${alumnDB.last_name_2}`.trim(),
            dni: alumnDB.dni,
            phone: alumnDB.phone,
            company_name:
              alumnDB.internship
                ? alumnDB.internship[0].company_id?.name
                : null,
            email: alumnDB.email,
            enrollment_center: alumnDB.enrollment_center,
            modality_id: alumnDB.modality_id,
            cycle_id: alumnDB.cycle_id,
            province_id: alumnDB.province_id,
            status: alumnDB.status,
          });
        });

        console.log(alumnData);
        console.log('Alumn data fetched successfully:', alumnDataDB);
      }
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
              {{ alumno.name }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap">{{ alumno.dni }}</td>
            <td class="px-6 py-4 whitespace-nowrap">
              {{ alumno.email }} <br />
              {{ alumno.phone }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              {{ alumno.company_name || 'Sin empresa' }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </form>
</template>
