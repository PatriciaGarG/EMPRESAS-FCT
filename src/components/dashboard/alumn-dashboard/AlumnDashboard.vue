<script setup lang="ts">
  import { inject, computed, ref, type Ref } from 'vue';
  import type { Alumn } from '../../../types/alumn.d.ts';
  import AlumnSidebarFilters from './AlumnSidebarFilters.vue';
  import tableDashboard from './tableDashboard.vue';

  const alumnData = inject<Ref<Alumn[]>>('alumnData')!;

  const selectedCompany = ref('');
  const selectedModality = ref('');
  const selectedCycle = ref('');
  const selectedCenter = ref('');
  const searchTerm = ref('');

  function update(target: any, value: string) {
    target.value = value;
  }

  const companies = computed(() => {
    return alumnData.value
      .map((a) => a.company_name)
      .filter((name): name is string => !!name)
      .map((name) => ({ id: name, name }));
  });

  const modalities = computed(() => {
    return [
      ...new Set(alumnData.value.map((a) => a.modality_id).filter(Boolean)),
    ].map((id) => ({ id, name: id }));
  });

  const cycles = computed(() => {
    return [
      ...new Set(alumnData.value.map((a) => a.cycle_id).filter(Boolean)),
    ].map((id) => ({ id, name: id }));
  });

  const centers = computed(() => {
    return [
      ...new Set(
        alumnData.value.map((a) => a.enrollment_center).filter(Boolean)
      ),
    ].map((id) => ({ id, name: id }));
  });

  const filteredAlumns = computed(() => {
    return alumnData.value.filter((alumn) => {
      const matchCompany =
        selectedCompany.value === '' ||
        alumn.company_name === selectedCompany.value;
      const matchModality =
        selectedModality.value === '' ||
        alumn.modality_id === selectedModality.value;
      const matchCycle =
        selectedCycle.value === '' || alumn.cycle_id === selectedCycle.value;
      const matchCenter =
        selectedCenter.value === '' ||
        alumn.enrollment_center === selectedCenter.value;
      const matchSearch =
        searchTerm.value === '' ||
        alumn.name.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
        alumn.email.toLowerCase().includes(searchTerm.value.toLowerCase());

      return (
        matchCompany &&
        matchModality &&
        matchCycle &&
        matchCenter &&
        matchSearch
      );
    });
  });
</script>

<template>
  <div class="flex min-h-screen">
    <AlumnSidebarFilters
      :companies="companies"
      :modalities="modalities"
      :cycles="cycles"
      :centers="centers"
      @filterCompany="(val) => update(selectedCompany, val)"
      @filterModality="(val) => update(selectedModality, val)"
      @filterCycle="(val) => update(selectedCycle, val)"
      @filterCenter="(val) => update(selectedCenter, val)"
      @filterSearch="(val) => update(searchTerm, val)"
    />

    <div class="flex-1 p-4 overflow-auto">
      <tableDashboard :alumnData="filteredAlumns" />
    </div>
  </div>
</template>
