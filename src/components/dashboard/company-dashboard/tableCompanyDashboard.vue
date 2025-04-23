<script setup lang="ts">
  import type { CompanyWithCycles } from '../../../types/company';
  import { computed } from 'vue';

  const props = defineProps<{
    companyData: CompanyWithCycles[];
  }>();

  const companies = computed(() => props.companyData);
</script>

<template>
  <div>
    <div
      class="border-2 border-primary w-[75%] h-[920px] mt-[250px] ml-[25%] mb-[1px] mr-[1px] space-y-3 shadow-md z-2"
    >
      <table class="min-w-full divide-y divide-gray-200">
        <thead
          class="bg-primary text-white text-left uppercase tracking-wider font-bold text-2xs"
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
          <tr v-for="company in companies" :key="company.id">
            <td class="px-6 py-4 whitespace-nowrap">
              <router-link :to="`/company/${company.id}`">
                {{ company.name }}
              </router-link>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">{{ company.cif }}</td>
            <td class="px-6 py-4 whitespace-nowrap">
              {{ company.address || 'Sin dirección' }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              {{ company.student_count ?? 'No especificado' }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              {{ company.email }}<br />
              {{ company.phone }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              {{ company.active ? 'Disponible' : 'No disponible' }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
