<script setup lang="ts">
  import { provide } from 'vue';
  import { useAlumn } from '../composables/useAlumn';
  import AlumnDashboard from '../components/dashboard/alumn-dashboard/AlumnDashboard.vue';
  import HeaderDashboard from '../components/common/HeaderDashboard.vue';

  const { alumn, getAlumn } = useAlumn();

  // Proporcionar la referencia reactiva
  provide('alumn', alumn);

  // Cargar los datos inmediatamente
  getAlumn();
</script>

<template>
  <HeaderDashboard />
  <body class="fixed w-full h-full bg-gray-light">
    <AlumnDashboard />
  </body>
</template>
