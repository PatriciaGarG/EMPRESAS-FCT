
<!--Here we give form to the table of dashboard-->
<script setup lang="ts">
  import { defineProps } from 'vue';
  import type { CompanyWithCycles } from '../../../types/company';

  const props = defineProps<{
    companyData: CompanyWithCycles[];
  }>();
</script>

<template>
  <div">
    <div
      class="border-2 border-primary h-[920px] w-[75%] mb-[1px] mr-[1px] mt-[250px] ml-[25%] space-y-3 shadow-md z-2"
    >
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-primary text-white text-left uppercase tracking-wider font-bond text-2xs">
          <tr>
            <th class="px-6 py-3 text-left">Nombre</th>
            <th class="px-6 py-3 text-left">CIF</th>
            <th class="px-6 py-3 text-left">Dirección</th>
            <th class="px-6 py-3 text-left">Contacto</th>
            <th class="px-6 py-3 text-left">Estado</th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr
            v-for="(companyItem, index) in props.companyData"
            :key="index"
            class="hover:bg-gray-100"
          >
            <td class="px-6 py-4 whitespace-nowrap">
              <router-link
                :to="`/company/${companyItem.id}`"
                class="text-blue-600 hover:underline"
              >
                {{ companyItem.name }}
              </router-link>
            </td>
            <td class="px-6 py-4">{{ companyItem.cif }}</td>
            <td class="px-6 py-4">
              {{ companyItem.address || 'Sin dirección' }}
            </td>
            <td class="px-6 py-4">
              {{ companyItem.email }}<br />
              {{ companyItem.phone }}
            </td>
            <td class="px-6 py-4">
              <span
                :class="
                  companyItem.active
                    ? 'text-green-600 font-semibold'
                    : 'text-red-500 font-semibold'
                "
              >
                {{ companyItem.active ? 'Disponible' : 'No disponible' }}
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
