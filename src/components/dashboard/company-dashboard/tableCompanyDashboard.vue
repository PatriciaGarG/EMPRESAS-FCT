<!--Here we give form to the table of dashboard-->
<script lang="ts" setup>
  import { inject } from 'vue';
  import type { Company } from '../../../types/company';

  const company = inject('company') as Company[];
</script>

<template>
  <!--Here we give form to the table and call dates saved in data base-->
  <div>
    <form
      class="flex flex-col items-center justify-center"
    >
      <div
        class="border-2 border-primary h-[920px] w-[75%] mb-[1px] mr-[1px] mt-[250px] ml-[25%] space-y-3 shadow-md z-2"
      >
        <table class="min-w-full divide-y divide-gray-200">
          <thead
            class="bg-primary text-white text-left uppercase tracking-wider font-bond text-2xs"
          >
            <tr>
              <th scope="col" class="px-6 py-3">Nombre</th>
              <th scope="col" class="px-6 py-3">CIF</th>
              <th scope="col" class="px-6 py-3">Dirección</th>
              <th scope="col" class="px-6 py-3">Estudiantes</th>
              <th scope="col" class="px-6 py-3">Contacto</th>
              <th scope="col" class="px-6 py-3">Estado</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="(companies, index) in company" :key="index">
              <td class="px-6 py-4 whitespace-nowrap">
                <router-link :to="`/company/${companies.id}`">
                  {{ companies.name }}
                </router-link>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">{{ companies.cif }}</td>
              <td class="px-6 py-4 whitespace-nowrap">
                {{ companies.address || 'Sin empresa' }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                {{ companies.student_count || 'Sin empresa' }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                {{ companies.email }} <br />
                {{ companies.phone }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                {{ companies.active ? 'Activo' : 'Inactivo' }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </form>
  </div>
</template>
