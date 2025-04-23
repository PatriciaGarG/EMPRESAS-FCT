<script setup lang="ts">
  import { provide, onMounted } from 'vue';
  import { useCompany } from '../composables/useCompany';
  import headerDashboard from '../components/common/HeaderDashboard.vue';
  import CompanyDashboard from '../components/dashboard/company-dashboard/CompanyDashboard.vue';

  const { company, getCompany } = useCompany();

  onMounted(() => {
    getCompany();
  });

  provide('company', company);
</script>

<template>
  <body class="flex flex-col h-screen w-screen bg-gray-light">
    <headerDashboard />
    <CompanyDashboard />
  </body>
</template>
