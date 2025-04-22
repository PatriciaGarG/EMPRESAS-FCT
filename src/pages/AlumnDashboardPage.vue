<script setup lang="ts">
  import { provide, ref, onMounted } from 'vue';
  import { useAlumn } from '../composables/useAlumn';
  import AlumnDashboard from '../components/dashboard/alumn-dashboard/AlumnDashboard.vue';
  import headerDashboard from '../components/dashboard/headerDashboard.vue';

  const alumnData = ref([])

  

  provide('alumnData', alumnData);
</script>

<template>
  <headerDashboard />
  <AlumnDashboard />
</template>
