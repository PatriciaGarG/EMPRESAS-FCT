<script lang="ts" setup>
  import { inject, ref, watch } from 'vue';
  import type { AlumnData } from '../../types/alumnData';
  import { useStatusColor } from '../../composables/useCommon';

  const alumnData = inject('alumnData') as AlumnData;

  // Variable para manejar el color
  const statusColor = ref('bg-gray-500');

  // Observar los cambios en alumnData.status
  watch(
    () => alumnData.status,
    (newStatus) => {
      if (newStatus) {
        const { colorByStatusResult } = useStatusColor(newStatus);
        statusColor.value = colorByStatusResult.value;
      }
    }
  );
</script>

<template>
  <section
    class="p-6 w-full border-2 text-xl bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow"
  >
    <div class="flex items-center justify-between mb-4">
      <h2 class="text-2xl font-bold text-gray-800">👤 {{ alumnData.name }}</h2>
      <span
        class="px-3 py-1 text-sm font-semibold text-white not-first:rounded-full"
        :class="statusColor"
        >{{
          alumnData.status.charAt(0).toUpperCase() + alumnData.status.slice(1)
        }}</span
      >
    </div>

    <ul class="text-gray-700 space-y-2">
      <li><strong>DNI:</strong> {{ alumnData.dni }}</li>
      <li><strong>Email:</strong> {{ alumnData.email }}</li>
      <li><strong>Teléfono:</strong> {{ alumnData.phone }}</li>
      <li><strong>Centro:</strong> {{ alumnData.enrollment_center }}</li>
      <li><strong>Ciclo:</strong> {{ alumnData.cycle }}</li>
      <li><strong>Modalidad:</strong> {{ alumnData.modality }}</li>
      <li><strong>Provincia:</strong> {{ alumnData.province }}</li>
    </ul>
  </section>
</template>
