<script setup lang="ts">
  import { provide, onMounted } from 'vue';
  import { useAlumn } from '../composables/useAlumn';
  import AlumnDashboard from '../components/dashboard/alumn-dashboard/AlumnDashboard.vue';
  import headerDashboard from '../components/common/headerDashboard.vue';
  import AddAlumnButton from '../components/dashboard/alumn-dashboard/addAlumnButton.vue';

  const { alumn, getAlumn } = useAlumn();

  // Proporcionar la referencia reactiva
  provide('alumn', alumn);

  // Cargar los datos inmediatamente
  getAlumn();
</script>

<template>
  <body class="flex flex-col bg-gray-light relative">
    <headerDashboard />
    <AddAlumnButton />
    <AlumnDashboard />
  </body>
</template>
