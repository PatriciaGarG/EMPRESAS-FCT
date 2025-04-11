<script lang="ts" setup>
  import { inject } from 'vue';

  const alumnData = inject('alumnData') as AlumnData;
</script>

<template>
  <section class="w-full border-2 rounded-2xl text-xl bg-white">
    <div
      class="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow"
    >
      <div class="flex items-center justify-between mb-4">
        <h2 class="text-2xl font-bold text-gray-800">
          👤 {{ alumnData.name }}
        </h2>
        <span
          class="px-3 py-1 text-sm font-semibold text-white bg-green-500 rounded-full"
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
    </div>
  </section>
</template>
