<script lang="ts" setup>
  //import { ref } from "vue";
  import headerDashboard from '../components/dashboard/headerDashboard.vue';
  import tableDashboard from '../components/dashboard/tableDashboard.vue';
  import addAlumnButton from '../components/dashboard/addAlumnButton.vue';
  import { onMounted, provide } from 'vue';
  import { useAlumn } from '../composables/useAlumn';

  //Coger la info de los alumnos de la DB
  const { alumn, getAlumn } = useAlumn();

  onMounted(() => {
    getAlumn();
  });

  //Proporcionar la info a los hijos y nietos...
  provide('alumn', alumn);
</script>

<template>
  <headerDashboard></headerDashboard>
  <addAlumnButton></addAlumnButton>
  <tableDashboard></tableDashboard>
</template>
