<script setup lang="ts">
  import { provide, onMounted } from 'vue';
  import { useAlumn } from '../composables/useAlumn';
  import AlumnDashboard from '../components/dashboard/alumn-dashboard/AlumnDashboard.vue';
  import headerDashboard from '../components/dashboard/headerDashboard.vue';

  const { alumn, getAlumn } = useAlumn();

  // Proporcionar la referencia reactiva
  provide('alumn', alumn);

  // Cargar los datos inmediatamente
  getAlumn();
</script>

<template>
  <headerDashboard />
  <body class="fixed w-full h-full bg-gray-light">
    <AlumnDashboard />
  </body>
</template>
