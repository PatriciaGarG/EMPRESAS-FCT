<!--Here we give form to the table of dashboard-->
<script setup lang="ts">
  import type { Alumn } from '../../../types/alumn.d.ts';

  const props = defineProps<{
    alumnData: Alumn[];
  }>();
</script>

<template>
  <router-link to="/"><button>Insertar alumn@</button></router-link>
  <!--Here we give form to the table and call dates saved in data base-->
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
          <tr v-for="(alumno, index) in props.alumnData" :key="index">
            <td class="px-6 py-4 whitespace-nowrap">
              <router-link to="/alumnos/id"> {{ alumno.name }} </router-link>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">{{ alumno.dni }}</td>
            <td class="px-6 py-4 whitespace-nowrap">
              {{ alumno.email }} <br />
              {{ alumno.phone }}
            </td>
            <td id="company_id" class="px-6 py-4 whitespace-nowrap">
              <router-link to="/empresa/id">
                {{ alumno.company_name || 'Sin empresa' }}
              </router-link>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </form>
</template>
