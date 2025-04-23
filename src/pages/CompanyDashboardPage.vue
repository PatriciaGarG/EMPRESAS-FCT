<script setup lang="ts">
  import { provide, onMounted } from 'vue';
  import { useCompany } from '../composables/useCompany';
  import tableCompanyDashboard from '../components/dashboard/company-dashboard/tableCompanyDashboard.vue';
  import AddCompanyButton from '../components/dashboard/company-dashboard/AddCompanyButton.vue';
  import HeaderDashboard from '../components/common/HeaderDashboard.vue';

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
    <AddCompanyButton/>
    <tableCompanyDashboard />
  </body>
</template>
