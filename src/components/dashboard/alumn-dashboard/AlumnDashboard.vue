<script setup lang="ts">
  import { inject, computed, ref, onMounted } from 'vue';
  import type { Alumn } from '../../../types/alumn.d.ts';
  import AlumnSidebarFilters from './AlumnSidebarFilters.vue';
  import tableDashboard from './tableDashboard.vue';
  import { useAllCompanyData } from '../../../composables/useAllCompanyData';
  import { useSelectOptions } from '../../../composables/useSelectOptions';

  const alumnData = inject('alumn') as Alumn[];

  const selectedCompany = ref('');
  const selectedModality = ref('');
  const selectedCycle = ref('');
  const selectedProvince = ref('');
  const searchTerm = ref('');

  const { allCompanyOptions, getAllCompanyData } = useAllCompanyData();
  const { getSelectOptions, provincesData, cyclesData, modalitiesData } =
    useSelectOptions();

  onMounted(() => {
    getAllCompanyData();
    getSelectOptions();
  });

  const updateFilter = (type: string, value: string) => {
    switch (type) {
      case 'company':
        selectedCompany.value = value;
        break;
      case 'modality':
        selectedModality.value = value;
        break;
      case 'cycle':
        selectedCycle.value = value;
        break;
      case 'province':
        selectedProvince.value = value;
        break;
      case 'search':
        searchTerm.value = value;
        break;
    }
  };

  const companies = computed(() => [
    { id: 'null', name: 'Sin empresa' },
    ...allCompanyOptions.value.map((a) => ({ id: a.id, name: a.name })),
  ]);

  const modalities = computed(() =>
    modalitiesData.value
      .filter((a) => a.value && a.label)
      .map((a) => ({ id: a.value, name: a.label }))
  );

  const cycles = computed(() =>
    cyclesData.value
      .filter((a) => a.value && a.label)
      .map((a) => ({ id: a.value, name: a.label }))
  );

  const provinces = computed(() =>
    provincesData.value
      .filter((a) => a.value && a.label)
      .map((a) => ({ id: a.value, name: a.label }))
  );

  const filteredAlumns = computed(() => {
    const normalizedSearch = searchTerm.value.toLowerCase().trim();

    return alumnData.filter((alumn) => {
      const matchCompany =
        !selectedCompany.value ||
        (selectedCompany.value === 'null' && !alumn.company_id) ||
        alumn.company_id === selectedCompany.value;
      const matchModality =
        !selectedModality.value || alumn.modality_id === selectedModality.value;
      const matchCycle =
        !selectedCycle.value || alumn.cycle_id === selectedCycle.value;
      const matchProvince =
        !selectedProvince.value || alumn.province_id === selectedProvince.value;
      const matchSearch =
        !normalizedSearch ||
        alumn.name?.toLowerCase().includes(normalizedSearch) ||
        alumn.email?.toLowerCase().includes(normalizedSearch) ||
        alumn.dni?.toLowerCase().includes(normalizedSearch) ||
        alumn.phone?.toLowerCase().includes(normalizedSearch) ||
        alumn.company_name?.toLowerCase().includes(normalizedSearch);

      return (
        matchCompany &&
        matchModality &&
        matchCycle &&
        matchProvince &&
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
      :provinces="provinces"
      @filterCompany="(val) => updateFilter('company', val)"
      @filterModality="(val) => updateFilter('modality', val)"
      @filterCycle="(val) => updateFilter('cycle', val)"
      @filterProvince="(val) => updateFilter('province', val)"
      @filterSearch="(val) => updateFilter('search', val)"
    />

    <div class="flex-1 p-4 overflow-auto">
      <tableDashboard :alumnData="filteredAlumns" />
    </div>
  </div>
</template>
