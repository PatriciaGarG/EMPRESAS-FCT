<script setup lang="ts">
  import { provide, onMounted } from 'vue';
  import { useAlumn } from '../composables/useAlumn';
  import AlumnDashboard from '../components/dashboard/alumn-dashboard/AlumnDashboard.vue';
  import headerDashboard from '../components/dashboard/headerDashboard.vue';

  //Coger la info de los alumnos de la DB
  const { alumn, getAlumn } = useAlumn();

  onMounted(() => {
    getAlumn();
  });

  //Proporcionar la info a los hijos y nietos...
  provide('alumn', alumn);
</script>

<template>
  <headerDashboard />
  <AlumnDashboard />
  <addAlumnButton></addAlumnButton>
</template>
