<script setup lang="ts">
  const emit = defineEmits<{
    (e: 'filterCompany', value: string): void;
    (e: 'filterModality', value: string): void;
    (e: 'filterCycle', value: string): void;
    (e: 'filterCenter', value: string): void;
    (e: 'filterSearch', value: string): void;
  }>();

  const { companies, modalities, cycles, centers } = defineProps<{
    companies: { id: string; name: string }[];
    modalities: { id: string; name: string }[];
    cycles: { id: string; name: string }[];
    centers: { id: string; name: string }[];
  }>();
</script>

<template>
  <aside
    class="w-64 min-h-screen bg-white border-r shadow p-4 flex flex-col gap-4"
  >
    <h2 class="text-lg font-semibold">Filtros</h2>

    <div>
      <label for="search" class="block text-sm font-medium text-gray-700 mb-1">
        Buscar
      </label>
      <input
        type="text"
        id="search"
        placeholder="Buscar por nombre o email"
        class="w-full border border-gray-300 rounded px-3 py-1 text-sm"
        @input="
          (e) => emit('filterSearch', (e.target as HTMLInputElement).value)
        "
      />
    </div>

    <div>
      <label
        for="company-select"
        class="block text-sm font-medium text-gray-700 mb-1"
      >
        Empresa
      </label>
      <select
        id="company-select"
        class="w-full border border-gray-300 rounded px-3 py-1 text-sm"
        @input="
          (e) => emit('filterCompany', (e.target as HTMLSelectElement).value)
        "
      >
        <option value="">Todas</option>
        <option
          v-for="company in companies"
          :key="company.id"
          :value="company.name"
        >
          {{ company.name }}
        </option>
      </select>
    </div>

    <div>
      <label
        for="modality-select"
        class="block text-sm font-medium text-gray-700 mb-1"
      >
        Modalidad
      </label>
      <select
        id="modality-select"
        class="w-full border border-gray-300 rounded px-3 py-1 text-sm"
        @input="
          (e) => emit('filterModality', (e.target as HTMLSelectElement).value)
        "
      >
        <option value="">Todas</option>
        <option
          v-for="modality in modalities"
          :key="modality.id"
          :value="modality.id"
        >
          {{ modality.name }}
        </option>
      </select>
    </div>

    <div>
      <label
        for="cycle-select"
        class="block text-sm font-medium text-gray-700 mb-1"
      >
        Ciclo
      </label>
      <select
        id="cycle-select"
        class="w-full border border-gray-300 rounded px-3 py-1 text-sm"
        @input="
          (e) => emit('filterCycle', (e.target as HTMLSelectElement).value)
        "
      >
        <option value="">Todos</option>
        <option v-for="cycle in cycles" :key="cycle.id" :value="cycle.id">
          {{ cycle.name }}
        </option>
      </select>
    </div>

    <div>
      <label
        for="center-select"
        class="block text-sm font-medium text-gray-700 mb-1"
      >
        Centro de trabajo
      </label>
      <select
        id="center-select"
        class="w-full border border-gray-300 rounded px-3 py-1 text-sm"
        @input="
          (e) => emit('filterCenter', (e.target as HTMLSelectElement).value)
        "
      >
        <option value="">Todos</option>
        <option v-for="center in centers" :key="center.id" :value="center.id">
          {{ center.name }}
        </option>
      </select>
    </div>
  </aside>
</template>
