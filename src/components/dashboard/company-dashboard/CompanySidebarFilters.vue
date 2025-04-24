<script setup lang="ts">
  import { ref } from 'vue';
  import MultiSelect from './MultiSelect.vue';

  const emit = defineEmits<{
    (e: 'filterSearch', value: string): void;
    (e: 'filterStatus', value: boolean | ''): void;
    (e: 'filterModality', value: string): void;
    (e: 'filterCycle', value: string[]): void;
    (e: 'filterProvince', value: string): void;
  }>();

  const { modalities, cycles, provinces } = defineProps<{
    modalities: { id: string; name: string }[];
    cycles: { id: string; name: string }[];
    provinces: { id: string; name: string }[];
  }>();

  const searchTerm = ref('');
  const selectedStatus = ref<boolean | ''>('');
  const selectedModality = ref('');
  const selectedCycles = ref<string[]>([]);
  const selectedProvince = ref('');
</script>

<template>
  <aside
    class="w-64 min-h-screen bg-white border-r shadow p-4 flex flex-col gap-4"
  >
    <h2 class="text-lg font-semibold">Filtros</h2>

    <div>
      <label for="search" class="block text-sm font-medium text-gray-700 mb-1"
        >Buscar</label
      >
      <input
        id="search"
        v-model="searchTerm"
        type="text"
        placeholder="Nombre, CIF, dirección, contacto..."
        class="w-full border border-gray-300 rounded px-3 py-1 text-sm"
        @input="() => emit('filterSearch', searchTerm)"
      />
    </div>

    <div>
      <label
        for="status-select"
        class="block text-sm font-medium text-gray-700 mb-1"
        >Estado</label
      >
      <select
        id="status-select"
        v-model="selectedStatus"
        class="w-full border border-gray-300 rounded px-3 py-1 text-sm"
        @change="() => emit('filterStatus', selectedStatus)"
      >
        <option value="">Todos</option>
        <option :value="true">Disponible</option>
        <option :value="false">No disponible</option>
      </select>
    </div>

    <div>
      <label
        for="modality-select"
        class="block text-sm font-medium text-gray-700 mb-1"
        >Modalidad</label
      >
      <select
        id="modality-select"
        v-model="selectedModality"
        class="w-full border border-gray-300 rounded px-3 py-1 text-sm"
        @change="() => emit('filterModality', selectedModality)"
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
      <MultiSelect
        :options="cycles"
        label="Ciclos"
        placeholder="Todas"
        @update:modelValue="(val) => emit('filterCycle', val)"
      />
    </div>

    <div>
      <label
        for="province-select"
        class="block text-sm font-medium text-gray-700 mb-1"
        >Provincia</label
      >
      <select
        id="province-select"
        v-model="selectedProvince"
        class="w-full border border-gray-300 rounded px-3 py-1 text-sm"
        @change="() => emit('filterProvince', selectedProvince)"
      >
        <option value="">Todas</option>
        <option
          v-for="province in provinces"
          :key="province.id"
          :value="province.id"
        >
          {{ province.name }}
        </option>
      </select>
    </div>
  </aside>
</template>
