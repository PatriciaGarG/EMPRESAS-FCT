<script lang="ts" setup>
  import { inject, ref, watch } from 'vue';
  import type { AlumnData, CurrentCompany } from '../../types/alumnData';
  import { useStatusColor } from '../../composables/useCommon';

  const currentCompany = inject('currentCompanyData') as CurrentCompany;

  const alumnData = inject('alumnData') as AlumnData;

  // Variable para manejar el color
  const statusColor = ref('bg-gray-500');

  const { colorByStatusResult } = useStatusColor(currentCompany.result);
  statusColor.value = colorByStatusResult.value;

  watch(
    () => currentCompany.result,
    (newStatus) => {
      if (newStatus) {
        const { colorByStatusResult } = useStatusColor(newStatus);
        statusColor.value = colorByStatusResult.value;
      }
    }
  );
</script>
<template>
  <h1 class="text-2xl font-bold text-gray-800">🏢 Empresa actual</h1>
  <ul class="text-gray-700 space-y-2 mt-3">
    <li>
      <div class="flex items-center cursor-pointer">
        <img
          src="../../assets/external-link-icon.png"
          alt="icono de enlace externo"
          width="15"
          class="h-fit inline mr-3"
        />
        <strong class="underline truncate">{{ currentCompany.company }}</strong>
      </div>
    </li>
    <li><strong>Ciclo:</strong> {{ currentCompany.cycle }}</li>
    <li><strong>Fecha de inicio:</strong> {{ currentCompany.start_date }}</li>
    <li><strong>Fecha fin:</strong> {{ currentCompany.end_date }}</li>
    <li>
      <strong>Resultado:</strong>
      <span
        class="ml-2 px-3 py-1 text-sm font-semibold text-white rounded-full"
        :class="statusColor"
        >{{
          currentCompany.result
            ? currentCompany.result.charAt(0).toUpperCase() +
              currentCompany.result.slice(1)
            : 'NULL'
        }}</span
      >
    </li>
  </ul>
</template>
