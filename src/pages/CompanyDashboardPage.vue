<script setup lang="ts">
  import { provide, onMounted } from 'vue';
  import { useCompany } from '../composables/useCompany';
  import headerDashboard from '../components/common/HeaderDashboard.vue';
  import tableCompanyDashboard from '../components/dashboard/company-dashboard/tableCompanyDashboard.vue';

  //Coger la info de las comañias de la DB
  const { company, getCompany } = useCompany();

  onMounted(() => {
    getCompany();
  });

  //Proporcionar la info a los hijos y nietos...
  provide('company', company);
</script>

<template>
  <body class="flex flex-col h-screen w-screen bg-gray-light">
    <headerDashboard />
    <tableCompanyDashboard />
  </body>
</template>
