<script setup lang="ts">
  import { defineProps } from 'vue';
  import type { CompanyWithCycles } from '../../../types/company';

  const props = defineProps<{
    companyData: CompanyWithCycles[];
  }>();
</script>

<template>
  <div class="flex justify-center mt-[250px]">
    <div
      class="w-[75%] shadow-md border-2 border-primary rounded-lg overflow-hidden"
    >
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-primary text-white uppercase text-sm tracking-wider">
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
