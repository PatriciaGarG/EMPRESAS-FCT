<script setup lang="ts">
  import { provide, onMounted } from 'vue';
  import { useCompany } from '../composables/useCompany';
<<<<<<< HEAD
  import HeaderDashboard from '../components/common/HeaderDashboard.vue';
  import CompanyDashboard from '../components/dashboard/company-dashboard/CompanyDashboard.vue';
=======
  import tableCompanyDashboard from '../components/dashboard/company-dashboard/tableCompanyDashboard.vue';
  import HeaderDashboard from '../components/common/HeaderDashboard.vue';
>>>>>>> 7f46175626dc68614d742467db4dcd3a21d51ed3

  const { company, getCompany } = useCompany();

  onMounted(() => {
    getCompany();
  });

  //Proporcionar la info a los hijos y nietos...
  provide('company', company);
</script>

<template>
  <body class="flex flex-col h-screen w-screen bg-gray-light">
<<<<<<< HEAD
    <HeaderDashboard />
    <CompanyDashboard />
=======
    <headerDashboard />
    <AddCompanyButton/>
    <tableCompanyDashboard />
>>>>>>> 7f46175626dc68614d742467db4dcd3a21d51ed3
  </body>
</template>
