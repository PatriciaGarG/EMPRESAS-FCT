<script setup lang="ts">
  import { inject, computed, ref, onMounted } from 'vue';
  import type { CompanyWithCycles } from '../../../types/company';
  import CompanySidebarFilters from './CompanySidebarFilters.vue';
  import tableCompanyDashboard from './tableCompanyDashboard.vue';
  import { useSelectOptions } from '../../../composables/useSelectOptions';

  const company = inject('company') as CompanyWithCycles[];

  const selectedModality = ref('');
  const selectedCycle = ref('');
  const selectedProvince = ref('');
  const selectedStatus = ref<boolean | ''>('');
  const searchTerm = ref('');

  const { getSelectOptions, provincesData, cyclesData, modalitiesData } =
    useSelectOptions();

  onMounted(() => {
    getSelectOptions();
  });

  const updateFilter = (type: string, value: any) => {
    switch (type) {
      case 'modality':
        selectedModality.value = value;
        break;
      case 'cycle':
        selectedCycle.value = value;
        break;
      case 'province':
        selectedProvince.value = value;
        break;
      case 'status':
        selectedStatus.value = value;
        break;
      case 'search':
        searchTerm.value = value;
        break;
    }
  };

  const modalities = computed(() =>
    modalitiesData.value.map((a) => ({ id: a.value, name: a.label }))
  );

  const cycles = computed(() =>
    cyclesData.value.map((a) => ({ id: a.value, name: a.label }))
  );

  const provinces = computed(() =>
    provincesData.value.map((a) => ({ id: a.value, name: a.label }))
  );

  const filteredCompanies = computed(() => {
    const normalizedSearch = searchTerm.value.toLowerCase().trim();

    return company.filter((c) => {
      const matchModality =
        !selectedModality.value || c.modality_id === selectedModality.value;

      const matchCycle =
        !selectedCycle.value ||
        c.cycles.some((cycle) => {
          console.log('🌀 Empresa:', c.name);
          console.log(
            '   → Ciclos:',
            c.cycles.map((c) => c.id)
          );
          console.log('   → Comparando:', cycle.id, 'con', selectedCycle.value);
          return cycle.id === selectedCycle.value;
        });

      const matchProvince =
        !selectedProvince.value || c.province_id === selectedProvince.value;

      const matchStatus =
        selectedStatus.value === '' || c.active === selectedStatus.value;

      const matchSearch =
        !normalizedSearch ||
        [c.name, c.cif, c.address, c.phone, c.email]
          .filter(Boolean)
          .some((field) => field.toLowerCase().includes(normalizedSearch));

      return (
        matchModality &&
        matchCycle &&
        matchProvince &&
        matchStatus &&
        matchSearch
      );
    });
  });
</script>

<template>
  <div class="relative flex min-h-full">
    <CompanySidebarFilters
      :modalities="modalities"
      :cycles="cycles"
      :provinces="provinces"
      @filterModality="updateFilter('modality', $event)"
      @filterCycle="updateFilter('cycle', $event)"
      @filterProvince="updateFilter('province', $event)"
      @filterStatus="updateFilter('status', $event)"
      @filterSearch="updateFilter('search', $event)"
    />

    <div class="flex-1 p-4 overflow-auto">
      <tableCompanyDashboard :companyData="filteredCompanies" />
    </div>
  </div>
</template>
